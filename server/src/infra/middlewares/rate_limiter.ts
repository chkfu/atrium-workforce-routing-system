/* 
    [REMARKS]

    - issue: found that redis store cause crash, fail to proceed when redis 
             client is closed
    - attempted: confirmed issue at RedisStore, causing err 'the client is closed'
                 Async-await connection also failed for race condition while init
                 (failed)
    - final solution:  implemented lazy initialisation

    - explanation:
        1. after redis connected, then init_rate_limiter will be triggered.
        2. limiter stores the rate-limit criteria as proposed (with redis store)
           this ensures redis store will only be set in later steps.
        3. reading express middlewares - routers, rate_restriction has been called
        4. refers to (a) and (b), let limiter to handle, or next if missing client
        
*/

import { Request, Response, NextFunction } from 'express';
import rate_limit, { RateLimitRequestHandler } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import redis from '../database/redis';
import AppError from '../../util/errors/AppError';
import loggers from '../loggers';

//  remarks: limiter to manage pending stage
let limiter: RateLimitRequestHandler | null = null;
const err_msg: string = '[SERVER] error: failed to support rate-limit.';

export const rate_restriction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //  (a) tell express keep going if limiter is missing
  //      prevent hanging connection, as redis keep reconnecting
  if (!limiter) {
    loggers.critical_logger.error(err_msg);
    return next(new AppError(503, err_msg)); // remarks: 503 for service temp not working
  }
  //  (b) return the limiter as response
  return limiter(req, res, next);
  // learnt: rate_limit is also a middleware function, require req, res, next
};

//  remarks: already trigger after redis is connected, at server.ts
export const init_rate_limiter = () => {
  limiter = rate_limit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    statusCode: 429, // remarks: 429 for too many requests
    message: { status: 'failed', message: err_msg },
    store: new RedisStore({
      sendCommand: (...args: string[]) => redis.sendCommand(args),
    }),
    standardHeaders: true,
    legacyHeaders: false,
  });
};
