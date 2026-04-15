import BaseService from './BaseService';
import HireIntakeRepository from '../repositories/HireIntakeRepository';
import { THireIntakeBase, TSchemaBase } from '../util/types';

//  Service class

class HireIntakeService extends BaseService<THireIntakeBase & TSchemaBase> {
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
export default HireIntakeService;
