import BaseController from '../core/BaseController';
import { TUserBase, TSchemaBase } from '../util/types/schema_types';
import UserService from './service';
import { Request, Response, NextFunction } from 'express';
import { handle_async } from '../infra/middlewares/handle_async';


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

  //  remarks: user registration
  //  POST  /api/v1/auth/register_new_user
  public register_new_user (){
    return handle_async(async (req: Request, res: Response, next: NextFunction) => {
      const records = await (this.service as UserService).register_new_user(req.body);
      res.status(200).json({
        status: 'success',
        data: {
          records,
        },
      });
    });}
}

//  Export

export default UserController;
