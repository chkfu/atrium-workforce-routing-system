import BaseService from './BaseService';
import HireScoreRepository from '../repositories/HireScoreRepository';
import { THireScoreBase, TSchemaBase } from '../util/types';

//  Service class

class HireScoreService extends BaseService<THireScoreBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new HireScoreRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default HireScoreService;
