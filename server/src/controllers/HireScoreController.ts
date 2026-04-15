import BaseController from './BaseController';
import { THireScoreBase, TSchemaBase } from '../util/types';
import HireScoreService from '../services/HireScoreService';

//  Controller class

class HireScoreController extends BaseController<THireScoreBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new HireScoreService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default HireScoreController;
