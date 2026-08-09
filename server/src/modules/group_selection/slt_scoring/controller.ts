import { Request, Response, NextFunction, RequestHandler } from 'express';
import BaseController from '../../../core/BaseController';
import { handle_async } from '../../../infra/middlewares/handle_async';
import { TSltScoreBase, TSchemaBase } from '../../../util/types/schema_types';
import SltScoreService from './service';

//  Controller class

class SltScoreController extends BaseController<TSltScoreBase & TSchemaBase> {
  private slt_score_service: SltScoreService;

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new SltScoreService(table, columns, primary_key);
    super(table, columns, primary_key, service);
    this.slt_score_service = service;
  }

  //  Methods
  public get_candidate_score_desc = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      const selected_weight_id = Number(req.params.weight_id);
      const result = await this.slt_score_service.get_slt_score_desc(selected_weight_id);
      res.status(200).json({
        status: 'success',
        data: {
          result,
        },
      });
    });
}

//  Export
export default SltScoreController;
