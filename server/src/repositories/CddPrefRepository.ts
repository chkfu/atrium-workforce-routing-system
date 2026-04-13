import BaseRepository from './BaseRepository';
import { TCddPrefBase, TSchemaBase } from '../util/types';

class CddPrefRepository extends BaseRepository<TCddPrefBase & TSchemaBase> {
  //  Attributes

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
