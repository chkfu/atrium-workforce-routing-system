import BaseService from '../../../core/BaseService';
import CandidateRepository from './repository';
import { TCandidateBase, TSchemaBase } from '../../../util/types';
import { ValueError } from '../../../util/errors/ValueError';

//  Service class

class CandidateService extends BaseService<TCandidateBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TCandidateBase & TSchemaBase), string>[],
    primary_key: string,
    repository?: CandidateRepository,
  ) {
    if (!repository) {
      repository = new CandidateRepository(table, columns, primary_key);
    }
    super(table, columns, primary_key, repository);
  }

  //  Methods

  //  1.  GET methods

  //  GET /api/v1/{table_name}
  //  INPUT: sortTarget (column name), is_ascending (boolean)
  //  remarks: exception for empty checks, as empty is also the info for clients
  //  remarks: redis action - update value, if items not found
  public async get_record_batch(
    page_opts: Record<string, number> = { page_current: 1, page_limit: 20 },
    sort_opts: Record<string, any> = { sort_target: null, sort_order: true },
    filter_opts: Record<string, any> = {},
  ) {
    //  remarks: handling data types
    //  1. pagination-related
    const MAX_PAGE_LIMIT = 100;
    let page_current: number = Math.max(1, Number(page_opts.page_current) || 1);
    let page_limit: number = Math.min(
      MAX_PAGE_LIMIT,
      Number(page_opts.page_limit) || 20,
    );
    const formatted_page_opts = {
      page_current: page_current,
      page_limit: page_limit,
    };
    //  2. sorting-related
    let sort_target: string | null = null;
    if (sort_opts.sort_target) {
      const column_option = String(sort_opts.sort_target).trim();
      sort_target = (this.columns as string[]).includes(column_option)
        ? column_option
        : null;
    }
    const sort_order = Boolean(sort_opts.sort_order) ?? true;
    const formatted_sort_opts = {
      sort_target: sort_target,
      sort_order: sort_order,
    };

    //  3. filtering-related
    const filter_params = filter_opts.filter_params || {};

    const format_text = (str: any): string | null => {
      if (!str) return null;
      return String(str).trim().replace(/\s+/g, ' ').toLowerCase();
    };

    const format_email = (str: any): string | null => {
      if (!str) return null;
      return String(str).trim().toLowerCase().replace(/\s/g, '');
    };

    const format_enum = (str: any, valid_enums: string[]): string | null => {
      if (!str) return null;
      const formatted = String(str).trim().toLowerCase();
      return valid_enums.includes(formatted) ? formatted : null;
    };

    const format_boolean = (str: any): boolean | null => {
      if (!str) return null;
      const formatted = String(str).trim().toLowerCase();
      if (formatted === 'true') return true;
      if (formatted === 'false') return false;
      return null;
    };

    const format_date = (str: any): string | null => {
      if (!str) return null;
      const trimmed = String(str).trim();
      const date_regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!date_regex.test(trimmed)) return null;
      const date = new Date(trimmed);
      return isNaN(date.getTime()) ? null : trimmed;
    };

    const gender_enums = ['male', 'female', 'other'];
    const prob_status_enums = [
      'selecting',
      'training',
      'completed',
      'postponed',
      'withdrawn',
      'failed',
    ];

    let formatted_filter_opts: Record<string, any> = {
      name: format_text(filter_params.filter_name),
      email: format_email(filter_params.filter_email),
      gender: format_enum(filter_params.filter_gender, gender_enums),
      prob_status: format_enum(
        filter_params.filter_prob_status,
        prob_status_enums,
      ),
      is_active: format_boolean(filter_params.filter_is_active),
      created_from: format_date(filter_params.filter_created_from),
      created_to: format_date(filter_params.filter_created_to),
      updated_from: format_date(filter_params.filter_updated_from),
      updated_to: format_date(filter_params.filter_updated_to),
    };

    //  error handling: return empty result if invalid date range
    if (
      (formatted_filter_opts.created_from &&
        formatted_filter_opts.created_to &&
        formatted_filter_opts.created_from >
          formatted_filter_opts.created_to) ||
      (formatted_filter_opts.updated_from &&
        formatted_filter_opts.updated_to &&
        formatted_filter_opts.updated_from > formatted_filter_opts.updated_to)
    ) {
      return {
        total_count: 0,
        total_pages: 0,
        current_page: formatted_page_opts.page_current,
        data: [],
      };
    }

    //  remarks: pagination results are frequently changing, skip caching to avoid stale data
    const filter_criteria: Record<string, Record<string, string | string[]>> = {
      name: { type: 'like', column: ['first_name', 'last_name'] },
      email: { type: 'like', column: ['email'] },
      gender: { type: 'equal', column: ['gender'] },
      prob_status: { type: 'equal', column: ['prob_status'] },
      is_active: { type: 'equal', column: ['is_active'] },
      created_from: { type: 'larger_than', column: ['created_at'] },
      created_to: { type: 'smaller_than', column: ['created_at'] },
      updated_from: { type: 'larger_than', column: ['updated_at'] },
      updated_to: { type: 'smaller_than', column: ['updated_at'] },
    };

    const result = await this.repository.get_record_batch(
      formatted_page_opts,
      formatted_sort_opts,
      formatted_filter_opts,
      filter_criteria,
    );
    //  error handling - only throw if result itself is invalid, not when data is empty
    if (result === null || result === undefined)
      throw new ValueError(
        404,
        `[${this.table.toUpperCase()}] error: no record is found.`,
      );
    return result;
  }
}

//  Export
export default CandidateService;
