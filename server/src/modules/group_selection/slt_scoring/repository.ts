import pool from '../../../infra/database/postgres';
import BaseRepository from '../../../core/BaseRepository';
import { TSltScoreBase, TSchemaBase } from '../../../util/types';
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

  public update_weight_opt = async (weight_id: number) => {
    const result = await pool.query(
      `UPDATE "${this.table}"
       SET "weight_id" = $1
       WHERE EXISTS (
           SELECT 1 FROM "select_weighting" WHERE "_id" = $1 AND "is_active" = true
         )
       RETURNING *`,
      [weight_id],
    );
    if (!result.rows || result.rows.length === 0) {
      throw new ValueError(
        404,
        `[${this.table}] error: failed to update the weight with ${weight_id}`,
      );
    }
    return result.rows;
  };

  public update_score_edu_by_candidate = async (
    score: number,
    candidate_id: string,
  ) => {
    const result = await pool.query(
      `UPDATE "${this.table}"
        SET "base_score_edu" = $1
        WHERE "candidate_id" = $2
        RETURNING *`,
      [score, candidate_id],
    );
    if (!result.rows || result.rows.length === 0) {
      throw new ValueError(
        404,
        `[${this.table}] error: failed to update with invalid candidate ${candidate_id}`,
      );
    }
    return result.rows;
  };

  public reset_score_edu_nullify = async () => {
    const result = await pool.query(
      `UPDATE "${this.table}"
        SET "base_score_edu" = $1
        RETURNING *`,
      [0],
    );
    if (!result.rows || result.rows.length === 0) {
      throw new ValueError(
        404,
        `[${this.table}] error: failed to nullify education scores`,
      );
    }
    return result.rows;
  };

  public reset_score_exp_nullify = async () => {
    const result = await pool.query(
      `UPDATE "${this.table}"
        SET "base_score_exp" = $1
        RETURNING *`,
      [0],
    );
    if (!result.rows || result.rows.length === 0) {
      throw new ValueError(
        404,
        `[${this.table}] error: failed to nullify experience scores`,
      );
    }
    return result.rows;
  };

  public reset_score_tests_nullify = async () => {
    const result = await pool.query(
      `UPDATE "${this.table}"
        SET "base_score_tests" = $1
        RETURNING *`,
      [0],
    );
    if (!result.rows || result.rows.length === 0) {
      throw new ValueError(
        404,
        `[${this.table}] error: failed to nullify tests scores`,
      );
    }
    return result.rows;
  };
}

//  Export
export default SltScoreRepository;
