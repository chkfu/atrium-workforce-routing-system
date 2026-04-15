import BaseRepository from '../../shared/BaseRepository';
import { THireCriteriaBase, TSchemaBase } from '../../util/types';

//  Repository class

class HireCriteriaRepository extends BaseRepository<
  THireCriteriaBase & TSchemaBase
> {
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
export default HireCriteriaRepository;
