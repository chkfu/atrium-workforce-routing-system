import BaseController from '../../shared/BaseController';
import { TSltCriteriaBase, TSchemaBase } from '../../util/types';
import SltCriteriaService from './service';

//  Controller class

class SltCriteriaController extends BaseController<
  TSltCriteriaBase & TSchemaBase
> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltCriteriaBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new SltCriteriaService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default SltCriteriaController;
