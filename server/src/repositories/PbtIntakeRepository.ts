import BaseRepository from './BaseRepository';
import { TPbtIntakeBase, TSchemaBase } from '../util/types';

class PbtIntakeRepository extends BaseRepository<TPbtIntakeBase & TSchemaBase> {
  //  Attributes

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
