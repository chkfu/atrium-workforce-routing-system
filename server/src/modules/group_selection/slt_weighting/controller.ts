import { Request, Response, NextFunction, RequestHandler } from 'express';
import BaseController from '../../../core/BaseController';
import { TSltWeightBase, TSchemaBase } from '../../../util/types/schema_types';
import { handle_async } from '../../../infra/middlewares/handle_async';
import SltWeightService from './service';

//  Controller class

class SltWeightController extends BaseController<TSltWeightBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltWeightBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new SltWeightService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }

  //  Methods

  //  PATCH /api/v1/{table_name}/:id
  //  remarks: activates the given strategy and deactivates every other one
  public update_record_by_id = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      const id: string = req.params['id'] as string;
      const result = await (this.service as SltWeightService).update_record_by_id(id);
      res.status(200).json({
        status: 'success',
        data: {
          result,
        },
      });
    });

  //  POST /api/v1/{table_name}
  //  remarks: new strategy always starts inactive
  public create_record_batch = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      const obj_arr: any[] = req.body[this.table];
      if (Array.isArray(obj_arr)) {
        obj_arr.forEach((record) => {
          record.is_active = false;
        });
      }
      const records = await this.service.create_record_batch(obj_arr);
      res.status(201).json({
        status: 'success',
        count: records.length,
        data: {
          records,
        },
      });
    });
}

//  Export
export default SltWeightController;
