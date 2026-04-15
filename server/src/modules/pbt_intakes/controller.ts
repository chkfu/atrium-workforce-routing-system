import BaseController from '../../shared/BaseController';
import { TPbtIntakeBase, TSchemaBase } from '../../util/types';
import PbtIntakeService from './service';

//  Controller class

class PbtIntakeController extends BaseController<TPbtIntakeBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TPbtIntakeBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new PbtIntakeService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default PbtIntakeController;
