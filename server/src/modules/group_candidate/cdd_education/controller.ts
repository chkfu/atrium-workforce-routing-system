import { Request, Response, NextFunction, RequestHandler } from 'express';
import BaseController from '../../../core/BaseController';
import {
  TCddEduBase,
  TSchemaBase,
  TSltScoreBase,
} from '../../../util/types/schema_types';
import CddEduService from './service';
import SltScoreService from '../../group_selection/slt_scoring/service';
import { handle_async } from '../../../infra/middlewares/handle_async';
import db_structure from '../../../util/config/db_structure';
import AuthError from '../../../util/errors/AuthError';
import { enum_user_role } from '../../../util/enums';
import { ROLE_RANK } from '../../../util/config/role_rank';

//  remarks: administrative fields blocked from self-service create/update; they feed the score calculation
const RESTRICTED_FIELDS = ['is_verified', 'is_active'];

//  Controller class

class CddEduController extends BaseController<TCddEduBase & TSchemaBase> {
  private slt_score_service: SltScoreService;

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddEduBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new CddEduService(table, columns, primary_key);
    super(table, columns, primary_key, service);
    this.slt_score_service = new SltScoreService(
      db_structure.slt_score.table,
      db_structure.slt_score.columns as Extract<
        keyof (TSltScoreBase & TSchemaBase),
        string
      >[],
      db_structure.slt_score.primary_key,
    );
  }

  //  Methods

  //  1.  REUSED

  //  learnt: middleware to restrict record deletion by permission rank, or self-access to their own record
  public restrict_batch_to_owner = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      //  remarks: declaration
      const err_msg =
        '[CddEduController] error: the action has not been permitted.';
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
        (record) =>
          String(record.candidate_id) === String(req.user!.candidate_id),
      );
      if (!owns_all) throw new AuthError(403, err_msg);
      return next();
    });

  //  learnt: middleware to block administrative fields (is_verified, is_active) from self-service create/update
  public restrict_fields_to_editable = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      //  remarks: declaration
      const err_msg =
        '[CddEduController] error: the action has not been permitted.';
      if (!req.user) throw new AuthError(403, err_msg);
      //  remarks: (1) enable all staff who passed the criteria
      if (
        ROLE_RANK[req.user.user_role] >=
        ROLE_RANK[enum_user_role.grade_1_assistant]
      ) {
        return next();
      }
      if (req.user.user_role !== enum_user_role.candidate) {
        throw new AuthError(403, err_msg);
      }
      //  remarks: locate the record(s) payload, covering both POST (records array keyed by table) and PATCH (_ids + flat fields) body shapes
      const record_arr: any[] = Array.isArray(req.body[this.table])
        ? req.body[this.table]
        : [req.body];
      const has_restricted_field = record_arr.some((record) =>
        Object.keys(record).some((key) => RESTRICTED_FIELDS.includes(key)),
      );
      if (has_restricted_field) throw new AuthError(403, err_msg);
      return next();
    });

  //  2.  POST methods

  //  POST /api/v1/{table_name}
  //  INPUT: array of record objects
  public create_record_batch = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      const obj_arr: any = req.body[this.table];
      const records = await this.service.create_record_batch(obj_arr);
      res.status(201).json({
        status: 'success',
        count: records.length,
        data: {
          records,
        },
      });
    });

  //  3.  PATCH methods

  //  PATCH  /api/v1/{table_name}
  //  INPUT: array of id strings, single input for each column update (enable null)
  public update_record_details_batch = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      const records = await this.service.update_record_details_batch(req.body);
      res.status(200).json({
        status: 'success',
        count: records.length,
        data: {
          records,
        },
      });
    });

  //  PATCH /api/v1/{table_name}/activation
  //  INPUT: array of records ids, is_active as boolean
  public update_record_active_batch = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      // remarks: update is_active as true
      const records = await this.service.update_record_active_batch(req.body);
      res.status(200).json({
        status: 'success',
        count: records.length,
        data: {
          records,
        },
      });
    });

  //  4.  DELETE methods

  //  DELETE  /api/v1/{table_name}
  //  INPUT: array of record ids
  public remove_record_batch = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      //  declarations
      const id_arr: string[] = req.body._ids.map((id: string | string[]) =>
        typeof id === 'string' ? id : id[0],
      );
      //  delete records and get returned data
      const records = await this.service.remove_record_batch(id_arr);
      return res.status(204).send();
    });

  //  DELETE  /api/v1/{table_name}/empty
  //  INPUT: null
  //  remarks: return to empty table [for system admin only]
  public empty_record_all = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      await this.service.empty_record_all();
      await this.slt_score_service.reset_score_edu_nullify();
      return res.status(204).send();
    });
}

//  Export
export default CddEduController;
