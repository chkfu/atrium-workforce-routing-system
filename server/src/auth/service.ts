import crypto from 'crypto';
import { Request } from 'express';
import BaseService from '../core/BaseService';
import UserRepository from './repository';
import { TUserBase, TSchemaBase } from '../util/types/schema_types';
import {
  format_date,
  format_email,
  format_number,
  format_text,
} from '../util/types/type_formatter';
import ValueError from '../util/errors/ValueError';
import loggers from '../infra/loggers';
import {
  generate_jwt_token,
  hash_password_bcrypt,
  validate_password_bcrypt,
  generate_password_reset_token,
  validate_new_passwords,
  validate_prev_passwords,
} from './utils/handlers';
import { node_mailing } from '../util/nodemailer';
import AuthError from '../util/errors/AuthError';

//  Service class

class UserService extends BaseService<TUserBase & TSchemaBase> {
  //  Attributes
  //  learnt: the generic type points to the repository in base services
  //          repository need to be specified as UserRepository to prevent undefined
  declare repository: UserRepository;
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TUserBase & TSchemaBase), string>[],
    primary_key: string,
    repository?: UserRepository,
  ) {
    //  remarks: check repositories
    if (!repository) {
      repository = new UserRepository(table, columns, primary_key);
    }
    super(table, columns, primary_key, repository);
  }

  //  Methods

  //  remarks: extracted user role to decide create which kind of user record
  //  INPUT: user_data
  public async register_new_user(user_data: any = {}) {
    const { user_role } = user_data;
    if (!user_role || !['candidate', 'staff'].includes(user_role)) {
      throw new Error(
        `[${this.table.toUpperCase()}] error: Invalid user role provided`,
      );
    }
    if (user_role == 'candidate')
      return this.register_user_with_candidate(user_data);
    if (user_role == 'staff') return this.register_user_with_staff(user_data);
  }

  //  remarks: user registration, with new candidate record creation
  //  INPUT: including both sys_user and candidate parameters
  public async register_user_with_candidate(user_data: any) {
    const {
      first_name,
      last_name,
      email,
      username,
      _password,
      _password_confirm,
    } = user_data;
    //  remarks: validate inputs
    if (
      !first_name ||
      !last_name ||
      !email ||
      !username ||
      !_password ||
      !_password_confirm
    )
      throw new ValueError(
        400,
        '[AuthService] error: required parameter is missing for candidate user registration.',
      );
    if (_password !== _password_confirm)
      throw new ValueError(
        400,
        '[AuthService] error: passwords are not matched for candidate user registration.',
      );
    //  remarks: transform inputs before storage
    //  (a) compulsory parameters
    const formatted_fname = format_text(first_name);
    const formatted_lname = format_text(last_name);
    const formatted_email = format_email(email);
    const hashed_password = await hash_password_bcrypt(_password);
    const hashed_pw_confirm = await hash_password_bcrypt(_password_confirm);
    //  (b) optional parameters
    const formatted_gender = user_data.gender ?? format_text(user_data.gender);
    const formatted_pstatus =
      user_data.prob_status ?? format_text(user_data.prob_status);
    user_data.prob_status ?? format_text(user_data.prob_status);
    //  remarks: pass the formatted parameters
    return this.repository.register_user_with_candidate({
      first_name: formatted_fname as string,
      last_name: formatted_lname as string,
      email: formatted_email as string,
      username,
      _password: hashed_password as string,
      _password_confirm: hashed_pw_confirm as string,
      gender: formatted_gender as string,
      prob_status: formatted_pstatus as string,
    });
  }

  //  remarks: user registration, with new staff record creation
  //  INPUT: including both sys_user and staff parameters
  async register_user_with_staff(user_data: any) {
    const {
      first_name,
      last_name,
      email,
      username,
      _password,
      _password_confirm,
    } = user_data;
    //  remarks: validate inputs
    if (
      !first_name ||
      !last_name ||
      !email ||
      !username ||
      !_password ||
      !_password_confirm
    )
      throw new ValueError(
        400,
        '[AuthService] error: required parameter is missing for candidate user registration.',
      );
    if (_password !== _password_confirm)
      throw new ValueError(
        400,
        '[AuthService] error: passwords are not matched for candidate user registration.',
      );
    //  remarks: transform inputs before storage
    //  (a) compulsory parameters
    const formatted_fname = format_text(first_name);
    const formatted_lname = format_text(last_name);
    const formatted_email = format_email(email);
    const hashed_password = await hash_password_bcrypt(_password);
    const hashed_pw_confirm = await hash_password_bcrypt(_password_confirm);
    //  (b) optional parameters
    const formatted_gender = user_data.gender ?? format_text(user_data.gender);
    const formatted_work_pos =
      user_data.work_position ?? format_text(user_data.work_position);
    const formatted_work_grade =
      user_data.work_grade ?? format_text(user_data.work_grade);
    const formatted_work_ext =
      user_data.work_ext ?? format_text(user_data.work_ext);
    const formatted_dept_id =
      user_data.dept_id ?? format_number(user_data.dept_id);
    const formatted_date_hired =
      user_data.date_hired ?? format_date(user_data.date_hired);
    const formatted_date_quit =
      user_data.date_quit ?? format_date(user_data.date_quit);
    //  remarks: pass the formatted parameters
    return this.repository.register_user_with_staff({
      first_name: formatted_fname as string,
      last_name: formatted_lname as string,
      email: formatted_email as string,
      work_position: formatted_work_pos as string,
      work_grade: formatted_work_grade as string,
      work_ext: formatted_work_ext as string,
      dept_id: formatted_dept_id as number,
      date_hired: formatted_date_hired as Date,
      date_quit: formatted_date_quit as Date,
      username,
      _password: hashed_password as string,
      _password_confirm: hashed_pw_confirm as string,
      gender: formatted_gender as string,
    });
  }

  //  remarks: user login, includes get user, compare password and create token
  async login_user(login_data: any = {}) {
    //  remarks: validate input username and password
    const { input, _password } = login_data;
    if (!input || !_password) {
      const err_msg =
        '[AuthService] error: username/email and password are required for login.';
      loggers.auth_logger.error(err_msg);
      throw new ValueError(400, `${err_msg}`);
    }

    //  remarks: get target user from database
    const user = (await this.repository.get_record_by_column(
      'username',
      input,
    )) ?? (await this.repository.get_record_by_column(
      'email',
      input,
    ));
    if (!user) {
      const err_msg = `[AuthService] error: target user cannot be found.`;
      loggers.auth_logger.error(err_msg);
      throw new ValueError(400, `${err_msg}`);
    }
    const user_role = user.user_role;

    //  remarks: extract and compare the passwords
    const result_validate = await validate_password_bcrypt(
      _password,
      user._password,
    );
    if (!result_validate) {
      const err_msg = `[AuthService] error: passwords not matched.`;
      loggers.auth_logger.error(err_msg);
      throw new ValueError(400, `${err_msg}`);
    }

    //  remarks: return token for verification
    const jwt_token = await generate_jwt_token(user._id);
    return {
      user_role: user_role,
      token: jwt_token,
    };
  }

  //  ==========    PASSWORD MANAGEMENT    ==========

  //  remarks: update password with self-access point
  async update_password_self(req: Request) {
    //  remarks: ensure req.user information exists
    if (!req.user) {
      const err_msg =
        '[AuthService] error: login is required to change password.';
      loggers.auth_logger.error(err_msg);
      throw new AuthError(401, err_msg);
    }
    //  remarks: search user record matching
    const user = await this.repository.get_record_by_id(String(req.user._id));
    if (!user) {
      const err_msg = `[AuthService] error: target user cannot be found.`;
      loggers.auth_logger.error(err_msg);
      throw new ValueError(400, `${err_msg}`);
    }
    //  remarks: validate provided old password, new password and password confirm
    //  (a) check validity of passwords to be processed
    const { _password_prev, _password, _password_confirm } = req.body;
    if (!_password_prev || !_password || !_password_confirm) {
      const err_msg =
        '[AuthService] error: current password and new password are required.';
      loggers.auth_logger.error(err_msg);
      throw new ValueError(400, `${err_msg}`);
    }
    //  (b) validate old passwords to permit new passwords
    await validate_prev_passwords(_password_prev, user._password);
    await validate_new_passwords(_password, _password_confirm);
    const hashed_password = await hash_password_bcrypt(_password);
    //  (3) update user record and login
    await this.repository.clear_password_reset(user._id, hashed_password);
    return this.login_user({ username: user.username, _password });
  }

  //  remarks:  opt-out procedure, sending out tokens to proceed
  async reset_password_opt_out(req: Request) {
    //  learnt: (1) get the target user
    const { input } = req.body;
    if (!input) {
      const err_msg =
        '[AuthService] error: username or email is required for password reset.';
      loggers.auth_logger.error(err_msg);
      throw new ValueError(400, `${err_msg}`);
    }
    const user =
      (await this.repository.get_record_by_column('username', input)) ??
      (await this.repository.get_record_by_column('email', input));
    if (!user) {
      const err_msg = `[AuthService] error: target user cannot be found.`;
      loggers.auth_logger.error(err_msg);
      throw new ValueError(400, `${err_msg}`);
    }
    //  learnt: (2) generate and stored temp reset token
    const { reset_token, hashed_token } = generate_password_reset_token();
    const pw_reset_expired = new Date(Date.now() + 1000 * 60 * 10);
    await this.repository.update_record_details_batch([user._id], {
      pw_reset_token: hashed_token,
      pw_reset_expired,
    });
    //  learnt: (3) send the details to the user
    try {
      const reset_url = `${process.env.CLIENT_URL}/reset-password/${reset_token}`;
      const reset_message = `Dear User,\n\nWe received a request to reset your password. Click the link below to choose a new one:\n\n${reset_url}\n\nThis link will expire in 10 minutes. If you didn't request this, you can safely ignore this email.\n\n- Atrium Team`;
      await node_mailing({
        email: user.email,
        subject: 'Reset your Atrium password',
        message: reset_message,
      });
    } catch (err: any) {
      const err_msg = `[AuthService] error: failed to send out details for user password reset.`;
      loggers.auth_logger.error(err_msg);
      throw new AuthError(500, `${err_msg}: ${err}`);
    }
  }

  //  remarks:  opt-in procedure, receiving new passwords to be set
  async reset_password_opt_in(req: Request) {
    //  learnt: (1) get target user
    //  remarks: (a) extract token and check existence
    const { token } = req.params;
    if (!token || Array.isArray(token)) {
      const err_msg = '[AuthService] error: reset token is required.';
      loggers.auth_logger.error(err_msg);
      throw new ValueError(400, `${err_msg}`);
    }
    //  remarks: (b) search user with obtained token, check validity
    const hashed_token = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    const user = await this.repository.get_record_by_column(
      'pw_reset_token',
      hashed_token,
    );
    if (!user) {
      const err_msg = `[AuthService] error: failed to reset password with invalid token.`;
      loggers.auth_logger.error(err_msg);
      throw new ValueError(400, `${err_msg}`);
    }
    if (!user.pw_reset_expired || user.pw_reset_expired < Date.now()) {
      const err_msg = `[AuthService] error: failed to reset password with expired token.`;
      loggers.auth_logger.error(err_msg);
      throw new ValueError(400, `${err_msg}`);
    }
    //  learnt: (2) validate token and setup new password
    const { _password, _password_confirm } = req.body;
    await validate_new_passwords(_password, _password_confirm);
    const hashed_password = await hash_password_bcrypt(_password);
    //  learnt: (3) update user record
    //  remarks: empty all reset information, as task completed
    await this.repository.clear_password_reset(user._id, hashed_password);
    //  learnt: (4) login and refresh token
    return this.login_user({ username: user.username, _password });
  }
}

//  Export

export default UserService;
