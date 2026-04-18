import BaseRepository from '../../../core/BaseRepository';
import { TPbtIntakeBase, TSchemaBase } from '../../../util/types';

//  Repository class

class PbtIntakeRepository extends BaseRepository<TPbtIntakeBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TPbtIntakeBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default PbtIntakeRepository;
