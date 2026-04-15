import BaseRepository from './BaseRepository';
import ValueError from '../util/errors/ValueError';
import { TSchemaBase } from '../util/types';
import { RedisClientType } from 'redis';
import redis from '../infra/database/redis';

//  Service class

abstract class BaseService<T> {
  //  Attributes
  protected table: string;
  protected columns: Extract<keyof T, string>[]; // remarks: customised for spec types from tables
  protected primary_key: string;
  protected repository: BaseRepository<T>;
  protected redis: RedisClientType;

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof T, string>[],
    primary_key: string,
    repository: BaseRepository<T>,
  ) {
    this.table = table;
    this.columns = columns;
    this.primary_key = primary_key;
    this.repository = repository;
    this.redis = redis;
  }

  //  Methods

  //  0. Redis reusable cache methods

  public async set_cache(
    cached_key: string,
    cached_val: any,
    nx: boolean = false,
  ) {
    //  error handling
    if (
      cached_key === undefined ||
      cached_val === undefined ||
      cached_val == null
    ) {
      throw new ValueError(
        400,
        `[BaseService] unable to process cache with missing cached key or cached value.`,
      );
    }
    //  set cache
    const stringified: string = JSON.stringify(cached_val);
    const result = await this.redis.set(cached_key, stringified, {
      EX: 3600,
      NX: nx, // remarks: if true, prevent duplicate action for resource competition
    });
    return result;
  }

  public async del_cache(cached_key: string) {
    await this.redis.del(cached_key);
  }

  //  1.  GET methods

  //  GET /api/v1/{table_name}
  //  INPUT: null
  //  remarks: exception for empty checks, as empty is also the info for clients
  //  remarks: redis action - update value, if items not found
  public async get_record_batch() {
    //  cache calling details
    const cached_key: string = `${this.table}:all`;
    const cached_val: any = await this.redis.get(cached_key);
    if (cached_val != null) {
      return JSON.parse(cached_val);
    }
    //  error handling
    const result = await this.repository.get_record_batch(null, null);
    if (result === null || result === undefined)
      throw new ValueError(
        404,
        `[${this.table.toUpperCase()}] error: no record is found.`,
      );
    //  update cache
    await this.set_cache(cached_key, result);
    return result;
  }

  //  GET /api/v1/{table_name}/:id
  //  INPUT: id in req.params
  //  reamrks: redis action: update value, if items not found
  public get_record_by_id = async (id: string) => {
    //  remarks: this.primary_key is development setting, skip column validation
    //  remarks: in case of spec case as req.params['id'] is an array, normally string
    //  leanrt: express `params` always return string, but not affect in schema types

    //  cache calling details
    const cached_key: string = `${this.table}:${id}`;
    const cached_val: any = await this.redis.get(cached_key);
    if (cached_val) {
      return JSON.parse(cached_val);
    }
    //  error handling
    const result = await this.repository.get_record_by_id(id);
    if (result === null || result === undefined)
      throw new ValueError(
        404,
        `[${this.table.toUpperCase()}] error: no record is found.`,
      );
    //  update cache
    await this.set_cache(cached_key, result);
    return result;
  };

  //  2.  POST methods

  //  POST /api/v1/{table_name}
  //  INPUT: array of record objects
  //  remarks: redis action - remove outdated records, insert new records
  public create_record_batch = async (obj_arr: any) => {
    //  remarks: for batch insert, customised inserted values with new string
    //  learnt: prevent sql injection without inserting req.body directly.
    //  learnt: postgre `CREATE` runs in sequence, required Promise for handling batch items

    const result = await Promise.all(
      //  learnt: clear the type with unknown first, then exercise the omit type
      obj_arr.map(async (el: any) => {
        const new_item = Object.fromEntries(
          this.columns.map((key) => [key, el[key]]),
        ) as unknown as Omit<T, keyof TSchemaBase>;
        // reamrks: put the new string into service function to proceed
        return this.repository.create_record_single(new_item);
      }),
    );
    //  error handling
    if (result === null || result === undefined || result.length < 1) {
      throw new ValueError(
        404,
        `[${this.table.toUpperCase()}] error: no record is found.`,
      );
    }
    //  remove cache
    await this.del_cache(`${this.table}:all`);
    const ids = result.map((item) => item[this.primary_key]);
    await Promise.all(ids.map((id) => this.del_cache(`${this.table}:${id}`)));
    return result;
  };

  //  3.  PATCH methods

  //  PATCH  /api/v1/{table_name}
  //  INPUT: array of id strings, single input for each column update (enable null)
  //  remarks: redis action - remove outdated records
  public update_record_details_batch = async (
    req_body: Record<string, any>,
  ) => {
    //  remarks: deduplicate ids into an array
    const id_arr: string[] = Array.from(
      new Set(
        req_body._ids.map((id: string | string[]) =>
          typeof id === 'string' ? id : id[0],
        ),
      ),
    );
    //  learnt: get the update values; null means keep existing value
    const update_data = Object.fromEntries(
      //  remarks: enable leaving empty or null for unchanged, with sql `COALESCE`
      this.columns.map((key) => [key, req_body[key] ?? null]),
    );

    const result = await this.repository.update_record_details_batch(
      id_arr,
      update_data,
    );

    //  error handling
    if (result === null || result === undefined || result.length < 1) {
      throw new ValueError(
        404,
        `[${this.table.toUpperCase()}] error: no record is found.`,
      );
    }
    //  removed cache
    await this.del_cache(`${this.table}:all`);
    await Promise.all(
      id_arr.map((id) => this.del_cache(`${this.table}:${id}`)),
    );

    return result;
  };

  //  PATCH /api/v1/{table_name}/activation
  //  INPUT: array of records ids, is_active as boolean
  //  remarks: for recovery for inactive records for flexibility
  //  remarks: redis action - remove outdated records
  public update_record_active_batch = async (req_body: any) => {
    //  declarations
    const id_arr: string[] = req_body._ids.map((id: string | string[]) =>
      typeof id === 'string' ? id : id[0],
    );
    const id_set: Set<string> = new Set(id_arr);
    const is_active: boolean | null = req_body.is_active ?? null;
    //  error handling
    if (is_active == null) {
      throw new ValueError(
        400,
        `[${this.table.toUpperCase()}] error: invalid value input of req.body.is_active.`,
      );
    }
    // remarks: update is_active as true
    const result = await this.repository.update_record_active_batch(
      Array.from(id_set),
      is_active,
    );
    //  error handling
    if (result === null || result === undefined || result.length < 1) {
      throw new ValueError(
        404,
        `[${this.table.toUpperCase()}] error: no record is found.`,
      );
    }
    //  removed cache
    await this.del_cache(`${this.table}:all`);
    await Promise.all(
      Array.from(id_set).map((id) => this.del_cache(`${this.table}:${id}`)),
    );
    return result;
  };

  //  4.  DELETE methods

  //  DELETE  /api/v1/{table_name}
  //  INPUT: array of record ids
  //  remarks: for forceful delete [for system admin only]
  //  remarks: redis action - remove outdated records
  public remove_record_batch = async (id_arr: string[]) => {
    //  declarations
    const id_set: Set<string> = new Set(id_arr);
    //  remove cache
    await this.del_cache(`${this.table}:all`);
    await Promise.all(
      id_arr.map((id) => this.del_cache(`${this.table}:${id}`)),
    );
    //  error handling
    const result = await this.repository.remove_record_batch(
      Array.from(id_set),
    );
    if (result === null || result === undefined || result.length < 1) {
      throw new ValueError(
        404,
        `[${this.table.toUpperCase()}] error: no record is found.`,
      );
    }
    return result;
  };

  //  DELETE  /api/v1/{table_name}/empty
  //  INPUT: null
  //  remarks: return to empty table [for system admin only]
  //  remarks: redis action - remove outdated records
  public empty_record_all = async () => {
    //  remove cache
    const cached_key: string = `${this.table}:all`;
    await this.del_cache(cached_key);
    //  error handling
    const result = await this.repository.empty_record_all();
    if (result === null || result === undefined || result.length < 1) {
      throw new ValueError(
        404,
        `[${this.table.toUpperCase()}] error: no record is found.`,
      );
    }
  };
}
//  Export

export default BaseService;
