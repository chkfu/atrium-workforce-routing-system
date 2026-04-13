import BaseRepository from './BaseRepository';
import { TCddEduBase, TSchemaBase } from '../util/types';

class CddEduRepository extends BaseRepository<TCddEduBase & TSchemaBase> {
  //  Attributes

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
