import BaseController from '../../core/BaseController';
import { TSltScoreBase, TSchemaBase } from '../../util/types';
import SltScoreService from './service';

//  Controller class

class SltScoreController extends BaseController<TSltScoreBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new SltScoreService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default SltScoreController;
