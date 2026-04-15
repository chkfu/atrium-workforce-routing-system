import BaseRepository from '../../shared/BaseRepository';
import { TStaffBase, TSchemaBase } from '../../util/types';

//  Repository class

class StaffRepository extends BaseRepository<TStaffBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TStaffBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default StaffRepository;
