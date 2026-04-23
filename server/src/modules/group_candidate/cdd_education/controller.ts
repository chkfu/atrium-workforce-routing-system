import { Request, Response, NextFunction, RequestHandler } from 'express';
import BaseController from '../../../core/BaseController';
import { TCddEduBase, TSchemaBase, TSltScoreBase } from '../../../util/types';
import CddEduService from './service';
import SltScoreService from '../../group_selection/slt_scoring/service';
import { handle_async } from '../../../infra/middlewares/handle_async';
import db_structure from '../../../util/config/db_structure';

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

  //  2.  POST methods

  //  POST /api/v1/{table_name}
  //  INPUT: array of record objects
  public create_record_batch = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      const obj_arr: any = req.body[this.table];
      const records = await this.service.create_record_batch(obj_arr);
      //  remarks: trigger immediate creation of scoring record with calculation
      const candidate_ids = Array.from(
        new Set(records.map((record: any) => record.candidate_id)),
      );
      await Promise.all(
        candidate_ids.map((candidate_id: any) =>
          this.slt_score_service.update_score_edu_by_candidate(
            String(candidate_id),
          ),
        ),
      );
      //  normal response
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
      //  remarks: trigger immediate creation of scoring record with calculation
      const candidate_ids = Array.from(
        new Set(records.map((record: any) => record.candidate_id)),
      );
      await Promise.all(
        candidate_ids.map((candidate_id: any) =>
          this.slt_score_service.update_score_edu_by_candidate(
            String(candidate_id),
          ),
        ),
      );
      //  normal response
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
      //  remarks: trigger immediate creation of scoring record with calculation
      const candidate_ids = Array.from(
        new Set(records.map((record: any) => record.candidate_id)),
      );
      await Promise.all(
        candidate_ids.map((candidate_id: any) =>
          this.slt_score_service.update_score_edu_by_candidate(
            String(candidate_id),
          ),
        ),
      );
      //  normal response
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
      //  remarks: trigger immediate recalculation of scoring record with new education data
      const candidate_ids = Array.from(
        new Set(records.map((record: any) => record.candidate_id)),
      );
      await Promise.all(
        candidate_ids.map((candidate_id: any) =>
          this.slt_score_service.update_score_edu_by_candidate(
            String(candidate_id),
          ),
        ),
      );
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
