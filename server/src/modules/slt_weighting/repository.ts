import BaseRepository from '../../core/BaseRepository';
import { TSltWeightBase, TSchemaBase } from '../../util/types';

//  Repository class

class SltWeightRepository extends BaseRepository<TSltWeightBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltWeightBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    super(table, columns, primary_key);
  }
}

//  Export
export default SltWeightRepository;
