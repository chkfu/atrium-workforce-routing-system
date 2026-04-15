import BaseController from './BaseController';
import { TCddEduBase, TSchemaBase } from '../util/types';
import CddEduService from '../services/CddEduService';

//  Controller class

class CddEduController extends BaseController<TCddEduBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddEduBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new CddEduService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default CddEduController;
