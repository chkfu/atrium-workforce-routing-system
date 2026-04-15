import BaseController from './BaseController';
import { TSysUserBase, TSchemaBase } from '../util/types';
import SysUserService from '../services/SysUserService';
import AppError from '../util/errors/AppError';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { handle_async } from '../infra/middlewares/handle_async';

//  Controller class

class SysUserController extends BaseController<TSysUserBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSysUserBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new SysUserService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }

  //  Methods

  //  remarks: forbidden sending password column
  public get_record_batch = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      return next(
        new AppError(
          405, // remarks: 405 for existing methods but not support for requests
          `[${this.table.toUpperCase()}] error: disabled method for the request.`,
        ),
      );
    });

  //  remarks: forbidden sending password column
  public get_record_by_id = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      return next(
        new AppError(
          405, // remarks: 405 for existing methods but not support for requests
          `[${this.table.toUpperCase()}] error: disabled method for the request.`,
        ),
      );
    });

  //  remarks: password column requires further encrypted or hashed
  public create_record_batch = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      return next(
        new AppError(
          405, // remarks: 405 for existing methods but not support for requests
          `[${this.table.toUpperCase()}] error: disabled method for the request.`,
        ),
      );
    });

  //  remarks: forbidden updating password with batch details
  //           requires specific methods for password reset
  public update_record_details_batch = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      return next(
        new AppError(
          405, // remarks: 405 for existing methods but not support for requests
          `[${this.table.toUpperCase()}] error: disabled method for the request.`,
        ),
      );
    });
}

//  Export
export default SysUserController;
