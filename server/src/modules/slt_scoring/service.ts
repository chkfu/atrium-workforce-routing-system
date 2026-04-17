import BaseService from '../../core/BaseService';
import SltScoreRepository from './repository';
import { TSltScoreBase, TSchemaBase } from '../../util/types';

//  Service class

class SltScoreService extends BaseService<TSltScoreBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new SltScoreRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default SltScoreService;
