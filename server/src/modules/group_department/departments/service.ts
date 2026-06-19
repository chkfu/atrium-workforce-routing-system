import BaseService from '../../../core/BaseService';
import DepartmentRepository from './repository';
import { TDepartmentBase, TSchemaBase } from '../../../util/types/schema_types';
import { filter_criteria } from '../../../util/yup/validate_criteria';
import { ValueError } from '../../../util/errors/ValueError';
import {
  format_boolean,
  format_date,
  format_text,
  format_number
} from '../../../util/types/type_formatter';
import { enum_gender_obj } from '../../../util/enums';

//  Service class

class DepartmentService extends BaseService<TDepartmentBase & TSchemaBase> {
  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TDepartmentBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new DepartmentRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);
  }


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
      let formatted_filter_opts: Record<string, any> = {
        name: format_text(filter_params.filter_name),
        capacity_from: format_number(filter_params.filter_capacity_from, 100, 'integer'),
        capacity_to: format_number(filter_params.filter_capacity_to, 100, 'integer'),
        weight_from: format_number(filter_params.filter_weight_from, 10, 'float'),
        weight_to: format_number(filter_params.filter_weight_to, 10, 'float'),
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
          formatted_filter_opts.updated_from >
          formatted_filter_opts.updated_to) ||

        (formatted_filter_opts.capacity_from &&
          formatted_filter_opts.capacity_to &&
          formatted_filter_opts.capacity_from >
          formatted_filter_opts.capacity_to) ||

        (formatted_filter_opts.weight_from &&
          formatted_filter_opts.weight_to &&
          formatted_filter_opts.weight_from >
          formatted_filter_opts.weight_to)
      ) {
        return {
          total_count: 0,
          total_pages: 0,
          current_page: formatted_page_opts.page_current,
          data: [],
        };
      }

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
export default DepartmentService;
