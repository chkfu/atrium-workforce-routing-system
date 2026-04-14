import BaseController from './BaseController';
import { TPbtScoreBase, TSchemaBase } from '../util/types';
import PbtScoreRepository from '../repositories/PbtScoreRepository';

//  Declarations

class PbtScoreController extends BaseController<TPbtScoreBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TPbtScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new PbtScoreRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default PbtScoreController;
