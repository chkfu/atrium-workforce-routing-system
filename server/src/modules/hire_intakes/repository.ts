import BaseRepository from '../../shared/BaseRepository';
import { THireIntakeBase, TSchemaBase } from '../../util/types';

//  Repository class

class HireIntakeRepository extends BaseRepository<
  THireIntakeBase & TSchemaBase
> {
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
