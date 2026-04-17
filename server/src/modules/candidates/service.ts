import BaseService from '../../core/BaseService';
import CandidateRepository from './repository';
import { TCandidateBase, TSchemaBase } from '../../util/types';

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
}

//  Export
export default CandidateService;
