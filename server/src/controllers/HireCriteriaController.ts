import BaseController from './BaseController';
import { THireCriteriaBase, TSchemaBase } from '../util/types';
import HireCriteriaRepository from '../repositories/HireCriteriaRepository';

//  Declarations

class HireCriteriaController extends BaseController<
  THireCriteriaBase & TSchemaBase
> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireCriteriaBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new HireCriteriaRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default HireCriteriaController;
