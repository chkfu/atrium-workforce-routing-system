import BaseController from '../../core/BaseController';
import { TStaffBase, TSchemaBase } from '../../util/types';
import StaffService from './service';

//  Controller class

class StaffController extends BaseController<TStaffBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TStaffBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new StaffService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default StaffController;
