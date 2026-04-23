import BaseService from '../../../core/BaseService';
import CddTestRepository from './repository';
import { TCddTestBase, TSchemaBase } from '../../../util/types';
import ValueError from '../../../util/errors/ValueError';

//  Service class

class CddTestService extends BaseService<
  TCddTestBase & TSchemaBase,
  CddTestRepository
> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCddTestBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new CddTestRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }

  //  Methods - for orchestration
  public async get_recent_by_candidate(candidate_id: string) {
    return await this.cache_service.handle_lock(
      this.table,
      candidate_id,
      async () => {
        //  cache calling details
        const cached_key: string = this.cache_service.create_key(
          this.table,
          candidate_id,
        );
        const cached_val: any = await this.cache_service.get_cache(cached_key);
        if (cached_val) {
          return cached_val;
        }
        //  error handling
        const result =
          await this.repository.get_recent_by_candidate(candidate_id);
        if (result === null || result === undefined)
          throw new ValueError(
            404,
            `[${this.table.toUpperCase()}] error: no record is found.`,
          );
        //  update cache
        await this.cache_service.set_cache(cached_key, result);
        return result;
      },
    );
  }
}

//  Export
export default CddTestService;
