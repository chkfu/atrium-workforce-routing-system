import { Request, Response, NextFunction } from 'express';
import AppError from '../util/error_control/AppError';
import loggers from '../infra/loggers';

//  Global error handler

function global_err_handler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  err.statusCode = Number(err.statusCode) || 500;
  err.status = String(err.status) || 'error';
  //  setup err header info
  loggers.app_logger.error(`[${err.statusCode}] ${err.message}`);
  res.status(err.statusCode).json({
    status: err.status,
    mesage: err.message,
  });
}

export default global_err_handler;
