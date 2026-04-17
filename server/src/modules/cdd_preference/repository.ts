import BaseRepository from '../../core/BaseRepository';
import { TCddPrefBase, TSchemaBase } from '../../util/types';

//  Repository class

class CddPrefRepository extends BaseRepository<TCddPrefBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddPrefBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default CddPrefRepository;
