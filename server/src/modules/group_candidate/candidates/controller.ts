import { Request, Response, NextFunction, RequestHandler } from 'express';
import BaseController from '../../../core/BaseController';
import { TCandidateBase, TSchemaBase } from '../../../util/types/schema_types';
import CandidateService from './service';
import { handle_async } from '../../../infra/middlewares/handle_async';
import AuthError from '../../../util/errors/AuthError';
import { enum_user_role } from '../../../util/enums';
import { ROLE_RANK } from '../../../util/config/role_rank';

//  remarks: administrative fields blocked from self-service updates
const RESTRICTED_FIELDS = ['prob_status', 'is_active'];

//  Controller class

class CandidateController extends BaseController<TCandidateBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCandidateBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new CandidateService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }

  //  Methods

  //  learnt: middleware to restrict candidate detail updates to their own record, and to non-administrative fields
  public restrict_details_to_owner = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      //  remarks: declaration
      const err_msg =
        '[CandidateController] error: the action has not been permitted.';
      //  remarks: drop all request which user is not found
      if (!req.user) throw new AuthError(403, err_msg);
      //  remarks: (1) enable all staff who passed the criteria
      if (
        ROLE_RANK[req.user.user_role] >=
        ROLE_RANK[enum_user_role.grade_1_assistant]
      ) {
        return next();
      }
      //  remarks: (2) user self-access, only candidate role is eligible
      if (req.user.user_role !== enum_user_role.candidate) {
        throw new AuthError(403, err_msg);
      }
      //  remarks: (3) requested records can be identified by _ids in body
      const id_arr: string[] = req.body._ids.map((id: string | string[]) =>
        typeof id === 'string' ? id : id[0],
      );
      const records: any[] = await Promise.all(
        id_arr.map((id) => this.service.get_record_by_id(id)),
      );
      //  remarks: grant access only when every requested record belongs to the requester
      const owns_all = records.every(
        (record) => String(record._id) === String(req.user!.candidate_id),
      );
      if (!owns_all) throw new AuthError(403, err_msg);
      //  remarks: (4) block administrative fields from self-service updates
      const has_restricted_field = Object.keys(req.body).some((key) =>
        RESTRICTED_FIELDS.includes(key),
      );
      if (has_restricted_field) throw new AuthError(403, err_msg);
      return next();
    });
}

//  Export
export default CandidateController;
