import BaseService from './BaseService';
import StaffRepository from '../repositories/StaffRepository';
import { TStaffBase, TSchemaBase } from '../util/types';

//  Service class

class StaffService extends BaseService<TStaffBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TStaffBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new StaffRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default StaffService;
