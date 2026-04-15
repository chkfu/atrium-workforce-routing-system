import BaseService from './BaseService';
import CddPrefRepository from '../repositories/CddPrefRepository';
import { TCddPrefBase, TSchemaBase } from '../util/types';

//  Service class

class CddPrefService extends BaseService<TCddPrefBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddPrefBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new CddPrefRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default CddPrefService;
