import BaseController from './BaseController';
import { THireWeightBase, TSchemaBase } from '../util/types';
import HireWeightRepository from '../repositories/HireWeightRepository';

//  Declarations

class HireWeightController extends BaseController<
  THireWeightBase & TSchemaBase
> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireWeightBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new HireWeightRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default HireWeightController;
