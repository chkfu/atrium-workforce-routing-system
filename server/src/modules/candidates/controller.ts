import BaseController from '../../shared/BaseController';
import { TCandidateBase, TSchemaBase } from '../../util/types';
import CandidateService from './service';

//  Controller class

class CandidateController extends BaseController<TCandidateBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCandidateBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new CandidateService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default CandidateController;
