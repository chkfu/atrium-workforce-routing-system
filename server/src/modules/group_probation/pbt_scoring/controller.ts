import BaseController from '../../../core/BaseController';
import { TPbtScoreBase, TSchemaBase } from '../../../util/types';
import PbtScoreService from './service';

//  Controller class

class PbtScoreController extends BaseController<TPbtScoreBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TPbtScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new PbtScoreService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default PbtScoreController;
