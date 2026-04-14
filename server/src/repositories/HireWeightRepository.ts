import BaseRepository from './BaseRepository';
import { THireWeightBase, TSchemaBase } from '../util/types';

class PbtIntakeRepository extends BaseRepository<
  THireWeightBase & TSchemaBase
> {
  //  Attributes

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (THireWeightBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default PbtIntakeRepository;
