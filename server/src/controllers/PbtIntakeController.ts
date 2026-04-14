import BaseController from './BaseController';
import { TPbtIntakeBase, TSchemaBase } from '../util/types';
import PbtIntakeRepository from '../repositories/PbtIntakeRepository';

//  Declarations

class PbtIntakeController extends BaseController<TPbtIntakeBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TPbtIntakeBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new PbtIntakeRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default PbtIntakeController;
