import BaseService from '../../../core/BaseService';
import CddEduService from '../../group_candidate/cdd_education/service';
import CddExpService from '../../group_candidate/cdd_experience/service';
import CddTestService from '../../group_candidate/cdd_tests/service';
import SltScoreRepository from './repository';
import {
  TSltScoreBase,
  TSchemaBase,
  TCddEduBase,
  TCddExpBase,
  TCddTestBase,
} from '../../../util/types/schema_types';
import db_structure from '../../../util/config/db_structure';
import ValueError from '../../../util/errors/ValueError';


//  Service class

class SltScoreService extends BaseService<
  TSltScoreBase & TSchemaBase,
  SltScoreRepository
> {

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new SltScoreRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }

  //  Methods

  public get_slt_score_desc = async() => {
    return this.repository.get_candidate_score_desc();
  }
}

//  Export
export default SltScoreService;
