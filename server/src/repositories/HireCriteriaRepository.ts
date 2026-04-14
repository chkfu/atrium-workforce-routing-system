import BaseRepository from './BaseRepository';
import { THireCriteriaBase, TSchemaBase } from '../util/types';

class PbtIntakeRepository extends BaseRepository<
  THireCriteriaBase & TSchemaBase
> {
  //  Attributes

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireCriteriaBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default PbtIntakeRepository;
