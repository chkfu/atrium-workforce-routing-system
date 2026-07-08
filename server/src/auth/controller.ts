import BaseController from '../core/BaseController';
import { TUserBase, TSchemaBase } from '../util/types/schema_types';
import UserService from './service';
import { Request, Response, NextFunction } from 'express';
import { handle_async } from '../infra/middlewares/handle_async';
import { verify_token_jwt, extract_token_from_header, access_check_user_exist, access_check_password_changed } from './utils/handlers';
import loggers from '../infra/loggers';
import AuthError from '../util/errors/AuthError';

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
  public register_new_user() {
    return handle_async(
      async (req: Request, res: Response, next: NextFunction) => {
        const records = await (this.service as UserService).register_new_user(
          req.body,
        );
        res.status(200).json({
          status: 'success',
          data: {
            records,
          },
        });
      },
    );
  }

  //  remarks: user login
  //  POST  /api/v1/auth/login_user
  public login_user() {
    return handle_async(
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await (this.service as UserService).login_user(req.body);
        res.status(200).json({
          status: 'success',
          data: {
            result,
          },
        });
      },
    );
  }

  //  remarks: access control, middleware
  public access_control_token() {
    return handle_async(
      async (req: Request, res: Response, next: NextFunction) => {
        //  learnt: (1) get token from request header
        let token: string | null = extract_token_from_header(req);
        //  learnt: (2) validate token
        //  remarks: the decoded item refers to object of id, iat, and exp
        const decoded = await verify_token_jwt(token);
        //  leanrt: (3) check user and password update date
        //  (a) user validation
        const user = await access_check_user_exist(this.service as UserService, decoded);
        //  (b) password date check, prevent obsolete tokens get accessed
        access_check_password_changed(user, decoded);
        next();
      },
    );
  }
}

//  Export

export default UserController;
