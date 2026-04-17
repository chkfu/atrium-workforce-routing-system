import BaseService from '../../core/BaseService';
import SysUserRepository from './repository';
import { TSysUserBase, TSchemaBase } from '../../util/types';

//  Service class

class SysUserService extends BaseService<TSysUserBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSysUserBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new SysUserRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }
}

//  Export
export default SysUserService;
