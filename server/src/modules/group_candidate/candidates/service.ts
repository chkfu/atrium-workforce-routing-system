import BaseService from '../../../core/BaseService';
import CandidateRepository from './repository';
import { TCandidateBase, TSchemaBase } from '../../../util/types';

//  Service class

class CandidateService extends BaseService<TCandidateBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCandidateBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new CandidateRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }

  //  override default sorting: is_active DESC (active candidates first)
  public async get_record_batch(sort_col: string | null = 'is_active', is_ascending: boolean | null = false) {
    return super.get_record_batch(sort_col, is_ascending);
  }
}

//  Export
export default CandidateService;
