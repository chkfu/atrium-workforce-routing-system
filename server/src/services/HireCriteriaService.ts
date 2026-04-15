import BaseService from './BaseService';
import HireCriteriaRepository from '../repositories/HireCriteriaRepository';
import { THireCriteriaBase, TSchemaBase } from '../util/types';

//  Service class

class HireCriteriaService extends BaseService<THireCriteriaBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireCriteriaBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new HireCriteriaRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default HireCriteriaService;
