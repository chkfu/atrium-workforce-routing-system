import BaseRepository from '../../../core/BaseRepository';
import { TUserBase, TSchemaBase } from '../../../util/types/schema_types';

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
}

//  Export
export default UserRepository;
