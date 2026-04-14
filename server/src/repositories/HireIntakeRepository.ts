import BaseRepository from './BaseRepository';
import { THireIntakeBase, TSchemaBase } from '../util/types';

class HireIntakeRepository extends BaseRepository<
  THireIntakeBase & TSchemaBase
> {
  //  Attributes

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireIntakeBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default HireIntakeRepository;
