import BaseService from '../../shared/BaseService';
import CddExpRepository from './repository';
import { TCddExpBase, TSchemaBase } from '../../util/types';

//  Service class

class CddExpService extends BaseService<TCddExpBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddExpBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new CddExpRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default CddExpService;
