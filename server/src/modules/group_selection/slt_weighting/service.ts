import BaseService from '../../../core/BaseService';
import SltWeightRepository from './repository';
import { TSltWeightBase, TSchemaBase } from '../../../util/types';

//  Service class

class SltWeightService extends BaseService<TSltWeightBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltWeightBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new SltWeightRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default SltWeightService;
