import BaseRepository from './BaseRepository';
import { TSysUserBase, TSchemaBase } from '../util/types';

class SysUserRepository extends BaseRepository<TSysUserBase & TSchemaBase> {
  //  Attributes

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
