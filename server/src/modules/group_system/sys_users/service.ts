import { Request } from 'express';
import BaseService from '../../../core/BaseService';
import SysUserRepository from './repository';
import { TUserBase, TSchemaBase, TCandidateBase, TStaffBase } from '../../../util/types/schema_types';
import { enum_user_role } from '../../../util/enums';
import AppError from '../../../util/errors/AppError';
import loggers from '../../../infra/loggers';
import CandidateRepository from '../../group_candidate/candidates/repository';
import StaffRepository from '../../group_department/staff/repository';
import db_structure from '../../../util/config/db_structure';
import { format_text, format_email, format_number, format_date } from '../../../util/types/type_formatter';

//  Service class

class UserService extends BaseService<TUserBase & TSchemaBase> {
  //  Attributes
  private candidate_repo: CandidateRepository;
  private staff_repo: StaffRepository;

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TUserBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new SysUserRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
    this.candidate_repo = new CandidateRepository(
      db_structure.candidates.table,
      [...db_structure.candidates.columns] as Extract<
        keyof (TCandidateBase & TSchemaBase),
        string
      >[],
      db_structure.candidates.primary_key,
    );
    this.staff_repo = new StaffRepository(
      db_structure.staff.table,
      [...db_structure.staff.columns] as Extract<
        keyof (TStaffBase & TSchemaBase),
        string
      >[],
      db_structure.staff.primary_key,
    );
  }

  //  Methods

  public async update_record_self(req: Request) {
    //  remarks: banned any update on passwords
    if (req.body._password || req.body._password_confirm) {
      const err_msg = `[UserService] error: refers to designated route at auth services to proceed further.`;
      loggers.app_logger.error(err_msg);
      throw new AppError(400, err_msg);
    }
    //  remarks: identify user record
    const user = req.user;
    if (!user) {
      const err_msg = `[UserService] error: user details not found locally.`;
      loggers.app_logger.error(err_msg);
      throw new AppError(400, err_msg);
    }
    //  remarks: forward to specific services
    const staff_roles_list = [
      enum_user_role.grade_1_assistant,
      enum_user_role.grade_2_manager,
      enum_user_role.grade_3_executive,
      enum_user_role.sys_admin,
    ];
    if (user.user_role === enum_user_role.candidate)
      return await this.update_record_with_candidate(user, req.body);
    else if (staff_roles_list.includes(user.user_role))
      return await this.update_record_with_staff(user, req.body);
    else {
      const err_msg = `[UserService] error: failed to proceed further without user role specified.`;
      loggers.app_logger.error(err_msg);
      throw new AppError(400, err_msg);
    }
  }

  //  remarks: supporting update record self (candidates), prevent unexpected input has been injected
  public async update_record_with_candidate(
    user: TUserBase & TSchemaBase,
    req_body: Record<string, any>,
  ) {
    if (!user.candidate_id) {
      const err_msg = `[UserService] error: candidate_id not found for this user.`;
      loggers.app_logger.error(err_msg);
      throw new AppError(400, err_msg);
    }
    return await this.candidate_repo.update_record_details_batch(
      [String(user.candidate_id)],
      {
        first_name: format_text(req_body.first_name),
        last_name: format_text(req_body.last_name),
        gender: format_text(req_body.gender),
        prob_status: format_text(req_body.prob_status),
        email: format_email(req_body.email),
      },
    );
  }

  //  remarks: supporting update record self (staff), prevent unexpected input has been injected
  public async update_record_with_staff(
    user: TUserBase & TSchemaBase,
    req_body: Record<string, any>,
  ) {
    if (!user.staff_id) {
      const err_msg = `[UserService] error: staff_id not found for this user.`;
      loggers.app_logger.error(err_msg);
      throw new AppError(400, err_msg);
    }
    return await this.staff_repo.update_record_details_batch(
      [String(user.staff_id)],
      {
        first_name: format_text(req_body.first_name),
        last_name: format_text(req_body.last_name),
        gender: format_text(req_body.gender),
        work_email: format_email(req_body.email),
        work_position: format_text(req_body.work_position),
        work_grade: format_text(req_body.work_grade),
        work_ext: format_text(req_body.work_ext),
        dept_id: format_number(req_body.dept_id),
        date_hired: format_date(req_body.date_hired),
        date_quit: format_date(req_body.date_quit),
      },
    );
  }
}

//  Export
export default UserService;
