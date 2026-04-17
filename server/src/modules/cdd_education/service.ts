import BaseService from '../../core/BaseService';
import CddEduRepository from './repository';
import { TCddEduBase, TSchemaBase } from '../../util/types';

//  Service class

class CddEduService extends BaseService<TCddEduBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddEduBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new CddEduRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default CddEduService;
