import BaseController from '../../../core/BaseController';
import { TCddTestBase, TSchemaBase } from '../../../util/types';
import CddTestService from './service';

//  Controller class

class CddTestController extends BaseController<TCddTestBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddTestBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new CddTestService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default CddTestController;
