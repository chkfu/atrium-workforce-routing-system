import pool from '../../../infra/database/postgres';
import BaseRepository from '../../../core/BaseRepository';
import { TSltWeightBase, TSchemaBase } from '../../../util/types/schema_types';
import ValueError from '../../../util/errors/ValueError';

//  Repository class

class SltWeightRepository extends BaseRepository<TSltWeightBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltWeightBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }

  //  Methods

  //  remarks: ensure any update on weight could inactivate other records
  //  remarks: considered multiple record could mess up the result calculation
  public update_record_by_id = async (_id: string) => {
    const result = await pool.query(
      `UPDATE "${this.table}"
        SET "is_active" = ("${this.primary_key}" = $1)
        RETURNING *;`,
      [_id],
    );
    if (!result.rows || result.rows.length === 0) {
      throw new ValueError(
        404,
        `[${this.table}] error: failed to activate weighting strategy ${_id}`,
      );
    }
    return result.rows;
  };
}

//  Export
export default SltWeightRepository;
