/* 
  Remarks:

  REDIS use for fast in-memory storage, reducing cost of frequent and repeated 
  database queries with cache hits.

  Redis adopts adopts LRU / LFU, depends on the speicfic needs of the system.
*/

import path from 'path';
import dotenv from 'dotenv';
import { createClient, RedisClientType } from 'redis';
import logger from '../loggers';

dotenv.config({
  path: path.resolve(__dirname, '../../../process.env.example'),
  override: true,
});

//  Error handling
if (!process.env.REDIS_CONN || !process.env.REDIS_PW) {
  throw new Error(
    '[Redis] REDIS_CONN or REDIS_PW not set in environment variables',
  );
}

//  Setup redis connection
const redis: RedisClientType = createClient({
  url: `redis://default:${process.env.REDIS_PW}@${process.env.REDIS_CONN}`,
});

//  Chain methods
redis.on('error', (err: any) => {
  const err_msg: string = `[REDIS] errors: cache server connection failed.\n${err}`;
  logger.app_logger.warn(err_msg);
});

//  Export

export default redis;
