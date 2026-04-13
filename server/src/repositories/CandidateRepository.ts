import BaseRepository from './BaseRepository';
import { TCandidateBase, TSchemaBase } from '../util/types';

class CandidateRepository extends BaseRepository<TCandidateBase & TSchemaBase> {
  //  Attributes

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
