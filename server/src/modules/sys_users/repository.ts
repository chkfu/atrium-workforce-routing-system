import BaseRepository from '../../shared/BaseRepository';
import { TSysUserBase, TSchemaBase } from '../../util/types';

//  Repository class

class SysUserRepository extends BaseRepository<TSysUserBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSysUserBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default SysUserRepository;
