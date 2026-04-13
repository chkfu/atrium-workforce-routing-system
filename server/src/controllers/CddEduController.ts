import BaseController from './BaseController';
import { TCddEduBase, TSchemaBase } from '../util/types';
import CddEduRepository from '../repositories/CddEduRepository';
//  Declarations

class CddEduController extends BaseController<TCddEduBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddEduBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new CddEduRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default CddEduController;
