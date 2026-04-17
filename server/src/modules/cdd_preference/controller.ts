import BaseController from '../../core/BaseController';
import { TCddPrefBase, TSchemaBase } from '../../util/types';
import CddPrefService from './service';

//  Controller class

class CddPrefController extends BaseController<TCddPrefBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddPrefBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new CddPrefService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default CddPrefController;
