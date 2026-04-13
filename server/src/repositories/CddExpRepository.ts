import BaseRepository from './BaseRepository';
import { TCddExpBase, TSchemaBase } from '../util/types';

class CddExpRepository extends BaseRepository<TCddExpBase & TSchemaBase> {
  //  Attributes

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
