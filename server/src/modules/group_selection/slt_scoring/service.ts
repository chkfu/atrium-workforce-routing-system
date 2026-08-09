import BaseService from '../../../core/BaseService';
import SltScoreRepository from './repository';
import {
  TSltScoreBase,
  TSchemaBase,
} from '../../../util/types/schema_types';


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

  public get_slt_score_desc = async(weight_id: number) => {
    return this.repository.get_candidate_score_desc(weight_id);
  }
}

//  Export
export default SltScoreService;
