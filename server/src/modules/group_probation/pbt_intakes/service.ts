import BaseService from '../../../core/BaseService';
import PbtIntakeRepository from './repository';
import { TPbtIntakeBase, TSchemaBase } from '../../../util/types';

//  Service class

class PbtIntakeService extends BaseService<TPbtIntakeBase & TSchemaBase> {
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
export default PbtIntakeService;
