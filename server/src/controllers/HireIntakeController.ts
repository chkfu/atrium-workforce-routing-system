import BaseController from './BaseController';
import { THireIntakeBase, TSchemaBase } from '../util/types';
import HireIntakeRepository from '../repositories/HireIntakeRepository';

//  Declarations

class HireIntakeController extends BaseController<
  THireIntakeBase & TSchemaBase
> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireIntakeBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new HireIntakeRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default HireIntakeController;
