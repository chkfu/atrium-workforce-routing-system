import BaseController from './BaseController';
import { TCddTestBase, TSchemaBase } from '../util/types';
import CddTestRepository from '../repositories/CddTestRepository';
//  Declarations

class CddTestController extends BaseController<TCddTestBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddTestBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new CddTestRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default CddTestController;
