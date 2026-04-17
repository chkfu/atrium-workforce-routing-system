import BaseRepository from '../../core/BaseRepository';
import { THireWeightBase, TSchemaBase } from '../../util/types';

//  Repository class

class HireWeightRepository extends BaseRepository<
  THireWeightBase & TSchemaBase
> {
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
export default HireWeightRepository;
