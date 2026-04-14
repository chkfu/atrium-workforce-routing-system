import BaseRepository from './BaseRepository';
import { THireScoreBase, TSchemaBase } from '../util/types';

class HireScoreRepository extends BaseRepository<THireScoreBase & TSchemaBase> {
  //  Attributes

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
