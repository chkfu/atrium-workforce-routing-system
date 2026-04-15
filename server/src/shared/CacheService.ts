import { RedisClientType } from 'redis';
import redis from '../infra/database/redis';
import ValueError from '../util/errors/ValueError';

//  Cache service class

class CacheService {
  //  attribute
  private name: string = 'CacheService';
  private redis: RedisClientType = redis;
  private ttl: number;
  private timeout_base: number = 3600;
  private timeout_jitter: number = 0.1;

  //  constructor
  constructor() {
    this.ttl =
      this.timeout_base +
      Math.floor(this.timeout_base * this.timeout_jitter * Math.random());
  }

  //  1. redis supported methods

  public create_key(tb_name: string, id?: string) {
    tb_name = String(tb_name.trim().toLowerCase());
    id = id ? String(id.trim().toLowerCase()) : 'all';
    return `${tb_name}:${id}`;
  }

  public validate_key(key: string) {
    if (!key || key.trim() === '') {
      throw new ValueError(400, `[${this.name}] invalid cache key found.`);
    }
    return key.trim().toLocaleLowerCase();
  }

  //  2. cacahe access methods

  //  * GET
  public async get_cache(key: string) {
    this.validate_key(key);
    const val = await this.redis.get(key);
    return val ? JSON.parse(val) : null;
  }

  //  * SET
  public async set_cache(cached_key: string, cached_val: any) {
    //  error handling
    if (
      cached_key === undefined ||
      cached_val === undefined ||
      cached_val == null
    ) {
      throw new ValueError(
        400,
        `[${this.name}] failed to set cached with invalid key,`,
      );
    }
    cached_key = this.validate_key(cached_key);
    //  set cache
    const stringified: string = JSON.stringify(cached_val);
    const result = await this.redis.set(cached_key, stringified, {
      // learnt: random * 30 for the 10% jitters, prevent overloading
      // remarks: if true, prevent override, as outdated record will be deleted each post/patch
      EX: this.ttl,
    });
    return result;
  }

  //  * DELETE
  public async del_cache(cached_key: string) {
    cached_key = this.validate_key(cached_key);
    await this.redis.del(cached_key);
  }
}

//  Export

export default CacheService;
