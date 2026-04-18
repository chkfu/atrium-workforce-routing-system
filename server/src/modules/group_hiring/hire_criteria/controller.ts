import BaseController from '../../../core/BaseController';
import { THireCriteriaBase, TSchemaBase } from '../../../util/types';
import HireCriteriaService from './service';

//  Controller class

class HireCriteriaController extends BaseController<
  THireCriteriaBase & TSchemaBase
> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireCriteriaBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new HireCriteriaService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default HireCriteriaController;
