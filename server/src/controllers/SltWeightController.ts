import BaseController from './BaseController';
import { TSltWeightBase, TSchemaBase } from '../util/types';
import SltWeightService from '../services/SltWeightService';

//  Controller class

class SltWeightController extends BaseController<TSltWeightBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltWeightBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new SltWeightService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default SltWeightController;
