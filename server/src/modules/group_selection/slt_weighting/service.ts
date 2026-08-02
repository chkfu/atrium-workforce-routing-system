import BaseService from '../../../core/BaseService';
import SltWeightRepository from './repository';
import { TSltWeightBase, TSchemaBase } from '../../../util/types/schema_types';
import ValueError from '../../../util/errors/ValueError';

//  Service class

class SltWeightService extends BaseService<
  TSltWeightBase & TSchemaBase,
  SltWeightRepository
> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TSltWeightBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new SltWeightRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }

  //  Methods

  //  remarks: activates the given strategy and deactivates every other one in the table
  public update_record_by_id = async (_id: string) => {
    return await this.cache_service.handle_lock(this.table, 'all', async () => {
      await this.cache_service.del_cache_by_pattern(
        this.cache_service.create_key(this.table, '*'),
      );
      const result = await this.repository.update_record_by_id(_id);
      return result;
    });
  };
}

//  Export
export default SltWeightService;
