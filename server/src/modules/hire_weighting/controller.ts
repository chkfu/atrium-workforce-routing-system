import BaseController from '../../shared/BaseController';
import { THireWeightBase, TSchemaBase } from '../../util/types';
import HireWeightService from './service';

//  Controller class

class HireWeightController extends BaseController<
  THireWeightBase & TSchemaBase
> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireWeightBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new HireWeightService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default HireWeightController;
