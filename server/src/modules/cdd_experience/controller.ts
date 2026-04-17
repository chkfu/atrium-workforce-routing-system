import BaseController from '../../core/BaseController';
import { TCddExpBase, TSchemaBase } from '../../util/types';
import CddExpService from './service';

//  Controller class

class CddExpController extends BaseController<TCddExpBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddExpBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new CddExpService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default CddExpController;
