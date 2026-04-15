import BaseService from '../../shared/BaseService';
import SltCriteriaRepository from './repository';
import { TSltCriteriaBase, TSchemaBase } from '../../util/types';

//  Service class

class SltCriteriaService extends BaseService<TSltCriteriaBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltCriteriaBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new SltCriteriaRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default SltCriteriaService;
