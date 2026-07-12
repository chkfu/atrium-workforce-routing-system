import pool from '../../../infra/database/postgres';
import KeyError from '../../../util/errors/KeyError';
import BaseRepository from '../../../core/BaseRepository';
import { TCddPrefBase, TSchemaBase } from '../../../util/types/schema_types';

//  Repository class

class CddPrefRepository extends BaseRepository<TCddPrefBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddPrefBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }

  //  remarks: GET all records matched by column
  //  INPUT: column key, value to match
  public get_record_list_by_column = async (
    col_key: Extract<keyof (TCddPrefBase & TSchemaBase), string>,
    col_val: string,
  ) => {
    if (col_key !== this.primary_key && !this.columns.includes(col_key)) {
      throw new KeyError(
        400,
        `[${this.table.toUpperCase()}] error: the provided column ${col_key} is not found.`,
      );
    }
    const result = await pool.query(
      `SELECT * FROM "${this.table}" WHERE "${col_key}" = $1;`,
      [col_val],
    );
    return result.rows;
  };
}

//  Export
export default CddPrefRepository;
