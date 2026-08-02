import pool from '../../../infra/database/postgres';
import BaseRepository from '../../../core/BaseRepository';
import { TDepartmentBase, TSchemaBase } from '../../../util/types/schema_types';

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

  //  Methods

  public get_department_criteria_desc = async () => {
    const query = `SELECT * FROM view_department_criteria;`;
    const result = await pool.query(query);
    return result.rows;
  };
}

//  Export
export default DepartmentRepository;
