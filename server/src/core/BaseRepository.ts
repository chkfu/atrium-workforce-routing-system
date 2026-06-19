/*
  [DISCLAIMER]

  Base Repository serves as centralised management of SQL queries
  between different tables. 
  
  Additional repository scripts will only serve for specific requirements 
  for their affiliated table.
*/

import pool from '../infra/database/postgres';
import KeyError from '../util/errors/KeyError';
import ValueError from '../util/errors/ValueError';
import { TSchemaBase } from '../util/types/schema_types';

/*
  learnt: 
  1.  prevent sql injection / malicious access
  -  initialised table name and column types in private attributes
  -  adopted parameter quotes for client input
  -  column validation with error handling
  2.  prevent keyword / case conflicts
  -  adopted identifier quotes at query string
*/

//   CLASS

abstract class BaseRepository<T> {
  //  1.  Attributes
  protected table: string;
  protected columns: Extract<keyof (T & TSchemaBase), string>[];
  protected primary_key: string;

  //  2.  Constructor
  constructor(
    table: string,
    columns: Extract<keyof T, string>[],
    primary_key: string = '_id',
  ) {
    this.table = table;
    this.columns = columns;
    this.primary_key = primary_key;
  }

  //  3.  Methods

  //  3a.  GET methods

  //  remarks: GET count of records for pagination
  //  INPUT: null
  public async get_record_count(): Promise<number> {
    const result = await pool.query(`SELECT COUNT (*) FROM "${this.table}";`);
    return Number(result.rows[0].count);
  }

  //  remarks: GET batch records with sorting (first by is_active DESC, then by sort_col)
  //  INPUT: stringified for sort column, boolean for sort order
  public async get_record_batch(
    page_opts: Record<string, number> = { page_current: 1, page_limit: 20 },
    sort_opts: Record<string, any> = { sort_target: null, sort_order: true },
    filter_opts: Record<string, any> = {},
    filter_criteria: Record<string, Record<string, any>> = {},
  ) {
    //  error handling
    //  learnt: required to convert into recognise type for column name string
    //          _id can only being recognised as this.primary_key
    //          system columns (created_at, updated_at, is_active) are allowed by default
    const system_columns = ['created_at', 'updated_at', 'is_active'];
    if (
      sort_opts.sort_target !== null &&
      sort_opts.sort_target !== this.primary_key &&
      !this.columns.includes(
        sort_opts.sort_target as Extract<keyof T, string>,
      ) &&
      !system_columns.includes(sort_opts.sort_target)
    ) {
      throw new ValueError(
        400,
        `[${this.table.toUpperCase()}] error: the provided column ${sort_opts.sort_target} is not found.`,
      );
    }
    if (sort_opts.sort_target != null && sort_opts.sort_order == null) {
      throw new ValueError(
        400,
        `[${this.table.toUpperCase()}] error: sorted order is not provided.`,
      );
    }

    //  remarks: declarations (shared)
    let query_str = `SELECT * FROM "${this.table}"`;
    let parameter_count: number = 1;
    let query_str_list: string[] = [];
    const parameters: (string | number | boolean)[] = [];

    //  remarks: mapping with designated pagniation
    const total_count = await this.get_record_count();
    const total_pages = Math.ceil(total_count / page_opts.page_limit);

    //  1. manage filtering
    if (filter_opts !== null && Object.keys(filter_opts).length > 0) {
      Object.entries(filter_opts).forEach(([key, val]) => {
        //  learnt: reminded to ensure criteria matches with inserted filter_opts
        const criteria = filter_criteria[key];
        if (!criteria || val === null) return;

        //  1. similarity check
        if (criteria.type === 'like') {
          const condition: string[] = criteria.column.map((col: string) => {
            parameters.push(`%${val}%`);
            return `"${col}" ILIKE $${parameter_count++}`;
          });
          query_str_list.push(`(${condition.join(' OR ')})`);
        }

        //  2. matching check
        else if (criteria.type === 'equal') {
          const condition: string[] = (criteria.column as string[]).map(
            (col: string) => {
              parameters.push(val);
              return `"${col}" = $${parameter_count++}`;
            },
          );
          query_str_list.push(`(${condition.join(' OR ')})`);
        }

        //  3. range
        else if (criteria.type === 'larger_than') {
          const condition: string[] = (criteria.column as string[]).map(
            (col: string) => {
              parameters.push(val);
              return `"${col}" >= $${parameter_count++}`;
            },
          );
          query_str_list.push(`(${condition.join(' OR ')})`);
        } else if (criteria.type === 'smaller_than') {
          const condition: string[] = (criteria.column as string[]).map(
            (col: string) => {
              parameters.push(val);
              return `"${col}" <= $${parameter_count++}`;
            },
          );
          query_str_list.push(`(${condition.join(' OR ')})`);
        }
      });

      if (query_str_list.length > 0) {
        query_str += ` WHERE ${query_str_list.join(' AND ')}`;
      }
    }

    //  2. manage sorting
    let rank_order: string = sort_opts.sort_order ? 'ASC' : 'DESC';
    if (sort_opts.sort_target) {
      query_str += ` ORDER BY "is_active" DESC, "${sort_opts.sort_target}" ${rank_order}, "_id" ${rank_order}`;
    } else {
      query_str += ` ORDER BY "is_active" DESC, "_id" ${rank_order}`;
    }

    //  3. manage pagination
    //  remarks: default page and limit has been set at controller
    let page_offset = (page_opts.page_current - 1) * page_opts.page_limit;
    query_str += ` LIMIT ${page_opts.page_limit} OFFSET ${page_offset}`;
    query_str += ';';

    //  querying
    const result = await pool.query(query_str, parameters);
    return {
      total_count,
      total_pages,
      current_page: page_opts.page_current,
      data: result.rows ?? [],
    };
  }

  //  remarks: GET specific record(s) by single / multiple id
  //  INPUT: array of stringified id
  public get_record_by_id = async (id: string) => {
    //  form query stirng
    let query_str: string = `SELECT * FROM "${this.table}" WHERE "${this.primary_key}" = $1;`;
    //  querying
    const result = await pool.query(query_str, [id]);
    return result.rows[0];
  };

  //  3b.  CREATE methods

  //  remarks: CREATE multiple records with same values
  //  INPUT: mapped data with designated record types
  public create_record_single = async (data: Omit<T, keyof TSchemaBase>) => {
    //  validation: check valid input
    if (!data)
      throw new ValueError(
        400,
        `[${this.table}] error: failed to create new record with missing input details.`,
      );

    //  declaration
    const key_arr: string[] = Object.keys(data);

    //  validation: check duplicate key inputs
    key_arr.forEach((key: string) => {
      //  1. validate column
      if (!this.columns.includes(key as Extract<keyof T, string>)) {
        throw new KeyError(
          400,
          `[${this.table.toUpperCase()}] error: the provided column ${key} is not found.`,
        );
      }
    });
    //  building query string
    const columns = key_arr.map((key: string) => `"${key}"`).join(', ');
    const placeholders = key_arr
      .map((_, index: number) => `$${index + 1}`)
      .join(', ');
    const values = key_arr.map(
      (key: string) => (data as Record<string, any>)[key],
    );
    //  querying
    const query = `
    INSERT INTO "${this.table}"
    (${columns})
    VALUES (${placeholders})
    RETURNING *;
  `;
    const result = await pool.query(query, values);
    return result.rows[0];
  };

  //  3c.  UPDATE methods

  //  remarks: UPDATE details for single or multiple records
  //  INPUT: array of numeric ids, and updated details with corresponding types
  update_record_details_batch = async (id_arr: string[], data: any) => {
    //  validation
    //  building query string
    const key_arr: string[] = Object.keys(data);
    const val_arr: any[] = Object.values(data);
    const id_placeholder: string = id_arr
      .map((_, index: number) => `$${key_arr.length + 1 + index}`)
      .join(', ');
    //  validation: whitelist columns
    key_arr.forEach((key: string) => {
      if (!this.columns.includes(key as Extract<keyof T, string>)) {
        throw new KeyError(
          400,
          `[${this.table.toUpperCase()}] error: the provided column ${key} is not found.`,
        );
      }
    });
    //  querying
    const result = await pool.query(
      `
        UPDATE "${this.table}"
        SET
          ${key_arr
            .map(
              (key: string, index: number) =>
                `"${key}" = COALESCE($${index + 1}, "${key}")`,
            )
            .join(', ')},
          "updated_at" = CURRENT_TIMESTAMP
        WHERE ${this.primary_key} IN (${id_placeholder})
        RETURNING *;
      `,
      [...val_arr, ...id_arr],
    );
    return result.rows;
  };

  //  remarks: UPDATE is_active for single or multiple records
  //  INPUT: array of stringify id, boolean for is_active
  public update_record_active_batch = async (
    id_arr: string[],
    status: boolean,
  ) => {
    //  error handling
    if (!id_arr || status == null)
      throw new ValueError(
        400,
        `[${this.table.toUpperCase()}] error: failed to update without required information provided.`,
      );
    if (id_arr.length < 1)
      throw new ValueError(
        400,
        `[${this.table.toUpperCase()}] error: failed to update with missing id.`,
      );
    //  querying
    const placeholders = id_arr
      .map((_, index: number) => `$${index + 2}`)
      .join(', ');
    const result = await pool.query(
      `UPDATE "${this.table}"
        SET 
          is_active = $1, 
          updated_at = CURRENT_TIMESTAMP
        WHERE ${this.primary_key} IN (${placeholders})
        RETURNING *;`,
      [status, ...id_arr],
    );
    return result.rows.length === 1 ? result.rows[0] : result.rows;
  };

  //  3d.  DELETE methods

  //  remarks: DELETE multiple records by id
  //  INPUT: array of stringified id
  public remove_record_batch = async (id_arr: string[]) => {
    const placeholders = id_arr
      .map((_, index: number) => `$${index + 1}`)
      .join(', ');
    const result = await pool.query(
      `DELETE FROM "${this.table}" WHERE "${this.primary_key}" IN (${placeholders}) RETURNING *;`,
      id_arr,
    );
    return result.rows.length === 1 ? result.rows[0] : result.rows;
  };

  //  remarks: DELETE all records from table
  //  INPUT: null
  public empty_record_all = async () => {
    const result = await pool.query(`DELETE FROM "${this.table}" RETURNING *;`);
    return result.rows;
  };
}

//  Export

export default BaseRepository;
