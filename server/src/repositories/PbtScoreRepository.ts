import BaseRepository from './BaseRepository';
import { TPbtScoreBase, TSchemaBase } from '../util/types';

class PbtScoreRepository extends BaseRepository<TPbtScoreBase & TSchemaBase> {
  //  Attributes

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TPbtScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default PbtScoreRepository;
