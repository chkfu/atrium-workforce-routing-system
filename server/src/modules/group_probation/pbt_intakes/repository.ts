import pool from '../../../infra/database/postgres';
import BaseRepository from '../../../core/BaseRepository';
import { TPbtIntakeBase, TSchemaBase } from '../../../util/types/schema_types';
import loggers from '../../../infra/loggers';

//  Repository class

class PbtIntakeRepository extends BaseRepository<TPbtIntakeBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TPbtIntakeBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }

  //  Methods

  //  remarks: columns = candidate_id, dept_intake, select_weight_id, remarks (matches probation_intakes after the schema.sql amendment)
  public set_select_result = async (result_arr: any[]) => {
    //  remarks: error handling
    if (result_arr.length < 1) {
      loggers.app_logger.info(
        '[PbtIntake] reminder: result array is empty, skipping insert',
      );
      return { rows: [] };
    }
    //  hints: form with ($1, $2, $3, $4) with additioanl array of parameters
    const values: any[] = [];
    const row_placeholders: string[] = [];
    let placeholder_count = 0;

    result_arr.forEach(row => {
      values.push(row.candidate_id, row.dept_id, row.weight_id, row.remarks);
      const placeholders = [1, 2, 3, 4].map(() => {
        placeholder_count += 1;
        return `$${placeholder_count}`;
      });
      row_placeholders.push(`(${placeholders.join(', ')})`);
    });
    //  remarks: combine
    const query = `
      INSERT INTO probation_intakes (candidate_id, dept_intake, select_weight_id, remarks)
      VALUES ${row_placeholders.join(', ')}
      RETURNING *;
    `;
    const result = await pool.query(query, values);
    return result;
  };
}

//  Export
export default PbtIntakeRepository;
