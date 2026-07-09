import BaseController from '../../../core/BaseController';
import { TUserBase, TSchemaBase } from '../../../util/types/schema_types';
import UserService from './service';
import AppError from '../../../util/errors/AppError';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { handle_async } from '../../../infra/middlewares/handle_async';
import loggers from '../../../infra/loggers';

//  Controller class

class UserController extends BaseController<TUserBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TUserBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new UserService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }

  //  Methods

  //  remarks: forbidden updating password with batch details
  //           requires specific methods for password reset
  public update_record_details_self = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      const result = await (this.service as UserService).update_record_self(req);
      res.status(200).json({
        status: 'success',
        result
      })
    });
}

//  Export
export default UserController;
