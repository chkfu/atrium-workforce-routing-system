import BaseService from '../../../core/BaseService';
import HireWeightRepository from './repository';
import { THireWeightBase, TSchemaBase } from '../../../util/types';

//  Service class

class HireWeightService extends BaseService<THireWeightBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireWeightBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new HireWeightRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default HireWeightService;
