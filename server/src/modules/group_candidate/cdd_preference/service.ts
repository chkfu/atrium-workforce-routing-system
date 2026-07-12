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

  //  remarks: GET all records matched by any whitelisted column, to detect duplicates
  //  INPUT: column key (must be a known column or primary key), value to match
  public get_record_list_by_column = async (
    col_key: Extract<keyof (TCddPrefBase & TSchemaBase), string>,
    col_val: string,
  ) => {
    return await this.repository.get_record_list_by_column(col_key, col_val);
  };
}

//  Export
export default CddPrefService;
