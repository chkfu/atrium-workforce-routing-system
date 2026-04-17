import BaseRepository from '../../core/BaseRepository';
import { THireScoreBase, TSchemaBase } from '../../util/types';

//  Repository class

class HireScoreRepository extends BaseRepository<THireScoreBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default HireScoreRepository;
