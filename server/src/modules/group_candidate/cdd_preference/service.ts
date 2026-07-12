import BaseService from '../../../core/BaseService';
import CddPrefRepository from './repository';
import { TCddPrefBase, TSchemaBase } from '../../../util/types/schema_types';

//  Service class

class CddPrefService extends BaseService<TCddPrefBase & TSchemaBase, CddPrefRepository> {
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
