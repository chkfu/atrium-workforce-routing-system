import BaseController from './BaseController';
import { TCandidateBase, TSchemaBase } from '../util/types';
import CandidateRepository from '../repositories/CandidateRepository';
//  Declarations

class CandidateController extends BaseController<TCandidateBase & TSchemaBase> {
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
export default CandidateController;
