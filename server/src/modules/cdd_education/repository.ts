import BaseRepository from '../../shared/BaseRepository';
import { TCddEduBase, TSchemaBase } from '../../util/types';

//  Repository class

class CddEduRepository extends BaseRepository<TCddEduBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddEduBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default CddEduRepository;
