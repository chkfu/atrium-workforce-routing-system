import BaseController from './BaseController';
import { TCddExpBase, TSchemaBase } from '../util/types';
import CddExpRepository from '../repositories/CddExpRepository';
//  Declarations

class CddExpController extends BaseController<TCddExpBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddExpBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new CddExpRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default CddExpController;
