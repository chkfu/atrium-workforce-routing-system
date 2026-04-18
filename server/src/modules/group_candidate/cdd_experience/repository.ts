import BaseRepository from '../../../core/BaseRepository';
import { TCddExpBase, TSchemaBase } from '../../../util/types';

//  Repository class

class CddExpRepository extends BaseRepository<TCddExpBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddExpBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default CddExpRepository;
