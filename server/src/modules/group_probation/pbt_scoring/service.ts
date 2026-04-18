import BaseService from '../../../core/BaseService';
import PbtScoreRepository from './repository';
import { TPbtScoreBase, TSchemaBase } from '../../../util/types';

//  Service class

class PbtScoreService extends BaseService<TPbtScoreBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TPbtScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new PbtScoreRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default PbtScoreService;
