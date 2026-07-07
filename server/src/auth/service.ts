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
import bcrypt from 'bcrypt';
import loggers from '../infra/loggers';
import { hash_password } from './utils/handlers';

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
  public async register_new_user(user_data: any) {
    const { user_role } = user_data;
    if (!user_role || user_role in ['candidate', 'staff']) {
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
    const hashed_password = await hash_password(_password);
    const hashed_pw_confirm = await hash_password(_password_confirm);
    //  (b) optional parameters
    const formatted_gender = user_data.gender ?? format_text(user_data.gender);
    const formatted_pstatus = user_data.prob_status ?? format_text(user_data.prob_status);
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
    const hashed_password = await hash_password(_password);
    const hashed_pw_confirm = await hash_password(_password_confirm);
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
}

//  Export

export default UserService;
