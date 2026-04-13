import BaseController from './BaseController';
import { TCddPrefBase, TSchemaBase } from '../util/types';
import CddPrefRepository from '../repositories/CddPrefRepository';
//  Declarations

class CddPrefController extends BaseController<TCddPrefBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddPrefBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new CddPrefRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default CddPrefController;
