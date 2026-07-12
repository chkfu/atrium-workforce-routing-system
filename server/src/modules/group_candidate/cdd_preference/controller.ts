import { RequestHandler, Request, Response, NextFunction } from 'express';
import { handle_async } from '../../../infra/middlewares/handle_async';
import BaseController from '../../../core/BaseController';
import { TCddPrefBase, TSchemaBase } from '../../../util/types/schema_types';
import CddPrefService from './service';

//  Controller class

class CddPrefController extends BaseController<TCddPrefBase & TSchemaBase> {
  //  remarks: kept separately typed, since the inherited `service` field is typed
  //  as the base class and does not expose CddPrefService-specific methods
  private cdd_pref_service: CddPrefService;

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddPrefBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new CddPrefService(table, columns, primary_key);
    super(table, columns, primary_key, service);
    this.cdd_pref_service = service;
  }

  //  GET /api/v1/candidate_preferences/column-list/:col_key/:col_val
  //  INPUT: col_key, col_val in req.params
  //  remarks: returns every matching record to detect duplicates
  public get_record_column_list = (): RequestHandler =>
    handle_async(async (req: Request, res: Response, next: NextFunction) => {
      const col_key = req.params['col_key'] as Extract<
        keyof (TCddPrefBase & TSchemaBase),
        string
      >;
      const col_val: string = req.params['col_val'] as string;
      const records = await this.cdd_pref_service.get_record_list_by_column(
        col_key,
        col_val,
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
}

//  Export
export default CddPrefController;
