import BaseRepository from '../core/BaseRepository';
import { TUserBase, TSchemaBase } from '../util/types/schema_types';
import pool from '../infra/database/postgres';
import loggers from '../infra/loggers';

// Repository class

class UserRepository extends BaseRepository<TUserBase & TSchemaBase> {
  // Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TUserBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }

  // Methods

  //  GET Methods

  public async get_user_by_username({ username }: { username: string }) {
    //  remarks: query with username only
    const result = await pool.query(
      `SELECT * FROM "sys_users" WHERE username = $1`,
      [username],
    );
    return result.rows[0];
  }


  //  POST Methods

  //  remarks: user registration, with new candidate record creation
  public async register_user_with_candidate({
    first_name,
    last_name,
    gender,
    prob_status,
    email,
    username,
    _password,
    _password_confirm,
  }: {
    first_name: string;
    last_name: string;
    gender?: string | null;
    prob_status?: string | null;
    email: string;
    username: string;
    _password: string;
    _password_confirm: string;
  }) {
    const query_connector = await pool.connect();
    try {
      await query_connector.query(`BEGIN;`);
      const result_candidate = await query_connector.query(
        `
        INSERT INTO "candidates"(
        first_name,
        last_name,
        gender,
        email,
        prob_status)
        VALUES (
        $1, $2, $3, $4, $5)
        RETURNING *;`,
        [first_name, last_name, gender ?? null, email, prob_status ?? null],
      );
      // learnt: client.query return the query result object;
      // rows is one of the key that refers to actual data in list
      const candidate_id = result_candidate.rows[0]._id;
      const result_user = await query_connector.query(
        `
        INSERT INTO "sys_users" (
        username,
        email,
        _password,
        _password_confirm,
        user_role,
        candidate_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`,
        [
          username,
          email,
          _password,
          _password_confirm,
          'candidate',
          candidate_id,
        ],
      );
      await query_connector.query('COMMIT');
      loggers.auth_logger.info(
        `[AuthRepository] succeed: new user and candidate records have been created successfully.`,
      );
      return result_user.rows[0];
    } catch (err) {
      //  remarks: error handling
      await query_connector.query('ROLLBACK');
      loggers.auth_logger.error(
        `[AuthRepository] error: failed to create user record with new candidate.`,
        err,
      );
      throw err;
      //  remarks: close connection
    } finally {
      query_connector.release();
    }
  }

  //  remarks: user registration, with new staff record creation
  public async register_user_with_staff({
    first_name,
    last_name,
    gender,
    work_position,
    work_grade,
    work_ext,
    dept_id,
    date_hired,
    date_quit,
    email,
    username,
    _password,
    _password_confirm,
  }: {
    first_name: string;
    last_name: string;
    gender?: string | null;
    work_position?: string | null;
    work_grade: string;
    work_ext?: string | null;
    dept_id?: number | null;
    date_hired?: Date | null;
    date_quit?: Date | null;
    email: string;
    username: string;
    _password: string;
    _password_confirm: string;
  }) {
    const query_connector = await pool.connect();
    try {
      await query_connector.query(`BEGIN;`);
      const result_staff = await query_connector.query(
        `
        INSERT INTO "staff"(
        first_name,
        last_name,
        gender,
        work_position,
        work_grade,
        work_email,
        work_ext,
        dept_id,
        date_hired,
        date_quit)
        VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;`,
        [
          first_name,
          last_name,
          gender ?? null,
          work_position ?? null,
          work_grade ?? null,
          email ?? null,
          work_ext ?? null,
          dept_id ?? null,
          date_hired ?? null,
          date_quit ?? null,
        ],
      );
      // learnt: client.query return the query result object;
      // rows is one of the key that refers to actual data in list
      const staff_id = result_staff.rows[0]._id;
      const result_user = await query_connector.query(
        `
        INSERT INTO "sys_users" (
        username,
        email,
        _password,
        _password_confirm,
        user_role,
        staff_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`,
        [username, email, _password, _password_confirm, work_grade, staff_id],
      );
      await query_connector.query('COMMIT');
      loggers.auth_logger.info(
        `[AuthRepository] succeed: new user and staff records have been created successfully.`,
      );
      return result_user.rows[0];
    } catch (err) {
      //  remarks: error handling
      await query_connector.query('ROLLBACK');
      loggers.auth_logger.error(
        `[AuthRepository] error: failed to create user record with new staff.`,
        err,
      );
      throw err;
      //  remarks: close connection
    } finally {
      query_connector.release();
    }
  }
}

// Export

export default UserRepository;
