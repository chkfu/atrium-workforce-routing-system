import BaseRepository from '../../../core/BaseRepository';
import { TUserBase, TSchemaBase } from '../../../util/types/schema_types';
import pool from '../../../infra/database/postgres';

//  Repository class

class UserRepository extends BaseRepository<TUserBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TUserBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }

  //  Methods

  public async get_view_user_profile(username: string){
    const result = await pool.query(
    `SELECT * FROM "user_profiles" WHERE "username" = $1 OR "email" = $1;`,
    [username],
  );
  return result.rows[0];
  }
}

//  Export
export default UserRepository;
