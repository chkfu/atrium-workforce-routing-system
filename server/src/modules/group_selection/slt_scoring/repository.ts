import pool from '../../../infra/database/postgres';
import BaseRepository from '../../../core/BaseRepository';
import { TSltScoreBase, TSchemaBase } from '../../../util/types/schema_types';
import ValueError from '../../../util/errors/ValueError';

//  Repository class

class SltScoreRepository extends BaseRepository<TSltScoreBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltScoreBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }

  //  Methods

  public get_candidate_score_desc = async() => {
    const query = `SELECT * FROM view_select_scoring;`;
    const result = await pool.query(query)
    return result.rows;
  }
}

//  Export
export default SltScoreRepository;
