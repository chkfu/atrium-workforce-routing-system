import BaseRepository from '../../shared/BaseRepository';
import { TPbtScoreBase, TSchemaBase } from '../../util/types';

//  Repository class

class PbtScoreRepository extends BaseRepository<TPbtScoreBase & TSchemaBase> {
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
