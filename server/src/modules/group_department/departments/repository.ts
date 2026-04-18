import BaseRepository from '../../../core/BaseRepository';
import { TDepartmentBase, TSchemaBase } from '../../../util/types';

//  Repository class

class DepartmentRepository extends BaseRepository<
  TDepartmentBase & TSchemaBase
> {
  //  Attributes

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TDepartmentBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default DepartmentRepository;
