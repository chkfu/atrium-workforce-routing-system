import BaseRepository from '../../shared/BaseRepository';
import { TCddTestBase, TSchemaBase } from '../../util/types';

//  Repository class

class CddTestRepository extends BaseRepository<TCddTestBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddTestBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default CddTestRepository;
