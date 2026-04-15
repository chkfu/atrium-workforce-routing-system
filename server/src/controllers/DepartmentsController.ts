import BaseController from './BaseController';
import DepartmentService from '../services/DepartmentService';
import { TDepartmentBase, TSchemaBase } from '../util/types';

//  Controller class

class DepartmentsController extends BaseController<
  TDepartmentBase & TSchemaBase
> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TDepartmentBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const service = new DepartmentService(table, columns, primary_key);
    super(table, columns, primary_key, service);
  }
}

//  Export
export default DepartmentsController;
