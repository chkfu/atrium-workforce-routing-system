import BaseController from './BaseController';
import { THireScoreBase, TSchemaBase } from '../util/types';
import HireScoreRepository from '../repositories/HireScoreRepository';

//  Declarations

class HireScoreController extends BaseController<THireScoreBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new HireScoreRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default HireScoreController;
