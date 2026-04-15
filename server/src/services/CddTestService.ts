import BaseService from './BaseService';
import CddTestRepository from '../repositories/CddTestRepository';
import { TCddTestBase, TSchemaBase } from '../util/types';

//  Service class

class CddTestService extends BaseService<TCddTestBase & TSchemaBase> {
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
export default CddTestService;
