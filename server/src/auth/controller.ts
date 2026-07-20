import BaseController from '../core/BaseController';
import { TUserBase, TSchemaBase } from '../util/types/schema_types';
import UserService from './service';
import { Request, Response, NextFunction } from 'express';
import { handle_async } from '../infra/middlewares/handle_async';
import {
  verify_token_jwt,
  extract_token_from_header,
  access_check_user_exist,
  access_check_password_changed,
  set_cookie_token,
  clear_cookie_token,
} from './utils/handlers';
import loggers from '../infra/loggers';
import AuthError from '../util/errors/AuthError';
import { enum_user_role } from '../util/enums';

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

  //  ==========    LOGIN / LOGOUT / SIGNUP    ==========

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
        set_cookie_token(res, result.token);
        res.status(200).json({
          status: 'success',
          message: 'Login successful.',
          token: result.token,
          role: result.user_role,
        });
      },
    );
  }

  //  remarks: user logout
  //  POST  /api/v1/auth/logout_user
  public logout_user() {
    return handle_async(
      async (req: Request, res: Response, next: NextFunction) => {
        clear_cookie_token(res);
        res.status(200).json({
          status: 'success',
          message: 'Logout successful.',
        });
      },
    );
  }

  //  ==========    PASSWORD MANAGEMENT    ==========

  //  remarks: update password with self-access point
  public update_password_self(){
    return handle_async(
      async (req: Request, res: Response, next: NextFunction) => {
        await (this.service as UserService).update_password_self(req)
        res.status(200).json({
          status: 'success',
          message: 'New password has been adopted.'
        })
      })
  }

  //  remarks:  opt-out procedure, sending out tokens to proceed
  public reset_password_opt_out() {
    return handle_async(
      async (req: Request, res: Response, next: NextFunction) => {
        await (this.service as UserService).reset_password_opt_out(req);
        //  remarks: network response
        res.status(200).json({
          status: 'success',
          message: 'Token sent. Pending for password reset.',
        });
      },
    );
  }



  //  remarks:  opt-in procedure, receiving new passwords to be set
  public reset_password_opt_in() {
    return handle_async(
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await (this.service as UserService).reset_password_opt_in(req);
        set_cookie_token(res, result.token);
         //  remarks: network response
        res.status(200).json({
          status: 'success',
          ...result,
        });
      },
    );
  }


  //  ==========    ACCESS MANAGEMENT    ==========

  //  remarks: access control, as middleware
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
        const user = await access_check_user_exist(
          this.service as UserService,
          decoded,
        );
        //  (b) password date check, prevent obsolete tokens get accessed
        access_check_password_changed(user, decoded);
        //  (4) assign to local
        //  remarks: return password will leave the trace as securoty concerns
        const { _password, _password_confirm, ...payload } = user;
        req.user = payload;
        next();
      },
    );
  }

  //  remarks: restrict access management, as middleware
  public access_restrict_roles(...roles: enum_user_role[]) {
    return handle_async(
      async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.user_role)) {
          const err_msg =
            '[AuthController] error: the action has not been permitted.';
          loggers.auth_logger.error(err_msg);
          throw new AuthError(403, err_msg);
        }
        next();
      },
    );
  }
}

//  Export

export default UserController;
