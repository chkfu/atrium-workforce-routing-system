import { Request, Response, NextFunction, RequestHandler } from 'express';
import BaseController from '../../../core/BaseController';
import { TPbtIntakeBase, TSchemaBase } from '../../../util/types/schema_types';
import PbtIntakeService from './service';
import { handle_async } from '../../../infra/middlewares/handle_async';

//  Controller class

class PbtIntakeController extends BaseController<TPbtIntakeBase & TSchemaBase> {
  private pbt_intake_service: PbtIntakeService;

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TPbtIntakeBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new PbtIntakeService(table, columns, primary_key);
    super(table, columns, primary_key, service);
    this.pbt_intake_service = service;
  }

  //  Methods
  public create_record_single = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      const { weight_id } = req.body;
      const record = await this.pbt_intake_service.set_intake_results(weight_id);
      res.status(201).json({
        status: 'success',
        count: record.length || 0,
        data: {
          record,
        },
      });
    });
}

//  Export
export default PbtIntakeController;
