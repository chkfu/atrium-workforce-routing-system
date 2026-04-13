import BaseRepository from './BaseRepository';
import { TCddTestBase, TSchemaBase } from '../util/types';

class CddTestRepository extends BaseRepository<TCddTestBase & TSchemaBase> {
  //  Attributes

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
