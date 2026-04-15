import BaseRepository from '../../shared/BaseRepository';
import { TSltScoreBase, TSchemaBase } from '../../util/types';

//  Repository class

class SltScoreRepository extends BaseRepository<TSltScoreBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default SltScoreRepository;
