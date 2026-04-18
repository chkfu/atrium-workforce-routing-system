import BaseRepository from '../../../core/BaseRepository';
import { TCandidateBase, TSchemaBase } from '../../../util/types';

//  Repository class

class CandidateRepository extends BaseRepository<TCandidateBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCandidateBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default CandidateRepository;
