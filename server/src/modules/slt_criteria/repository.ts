import BaseRepository from '../../core/BaseRepository';
import { TSltCriteriaBase, TSchemaBase } from '../../util/types';

//  Repository class

class SltCriteriaRepository extends BaseRepository<
  TSltCriteriaBase & TSchemaBase
> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltCriteriaBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default SltCriteriaRepository;
