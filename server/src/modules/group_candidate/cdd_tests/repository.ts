import BaseRepository from '../../../core/BaseRepository';
import { TCddTestBase, TSchemaBase } from '../../../util/types';
import pool from '../../../infra/database/postgres';

//  Repository class

class CddTestRepository extends BaseRepository<TCddTestBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddTestBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }

  //  Methods

  //  remarks: GET specific record(s) by single candidate id
  //  INPUT: array of stringified id
  public get_recent_by_candidate = async (candidate_id: string) => {
    //  form query stirng
    let query_str: string = `SELECT * FROM "${this.table}" WHERE "candidate_id" = $1;`;
    //  querying
    const result = await pool.query(query_str, [candidate_id]);
    return result.rows[0];
  };
}

//  Export
export default CddTestRepository;
