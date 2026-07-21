import { Request, Response, NextFunction, RequestHandler } from 'express';
import BaseController from '../../../core/BaseController';
import { TCddPrefBase, TSchemaBase } from '../../../util/types/schema_types';
import CddPrefService from './service';
import { handle_async } from '../../../infra/middlewares/handle_async';
import AuthError from '../../../util/errors/AuthError';
import { enum_user_role } from '../../../util/enums';
import { ROLE_RANK } from '../../../util/config/role_rank';

//  remarks: administrative fields blocked from self-service create/update
const RESTRICTED_FIELDS = ['is_active'];

//  Controller class

class CddPrefController extends BaseController<TCddPrefBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddPrefBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new CddPrefService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }

  //  learnt: middleware to restrict record update/deletion by permission rank, or self-access to their own record
  public restrict_batch_to_owner = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      //  remarks: declaration
      const err_msg =
        '[CddPrefController] error: the action has not been permitted.';
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
      //  remarks: grant access by matching every record's candidate_id with the requester
      const owns_all = records.every(
        (record) => String(record.candidate_id) === String(req.user!.candidate_id),
      );
      if (!owns_all) throw new AuthError(403, err_msg);
      return next();
    });

  //  learnt: middleware to block administrative fields (is_active) from self-service create/update
  public restrict_fields_to_editable = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      const err_msg =
        '[CddPrefController] error: the action has not been permitted.';
      if (!req.user) throw new AuthError(403, err_msg);
      if (
        ROLE_RANK[req.user.user_role] >=
        ROLE_RANK[enum_user_role.grade_1_assistant]
      ) {
        return next();
      }
      if (req.user.user_role !== enum_user_role.candidate) {
        throw new AuthError(403, err_msg);
      }
      const record_arr: any[] = Array.isArray(req.body[this.table])
        ? req.body[this.table]
        : [req.body];
      const has_restricted_field = record_arr.some((record) =>
        Object.keys(record).some((key) => RESTRICTED_FIELDS.includes(key)),
      );
      if (has_restricted_field) throw new AuthError(403, err_msg);
      return next();
    });
}

//  Export
export default CddPrefController;
