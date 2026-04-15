import BaseController from '../../shared/BaseController';
import { THireIntakeBase, TSchemaBase } from '../../util/types';
import HireIntakeService from './service';

//  Controller class

class HireIntakeController extends BaseController<
  THireIntakeBase & TSchemaBase
> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireIntakeBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new HireIntakeService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default HireIntakeController;
