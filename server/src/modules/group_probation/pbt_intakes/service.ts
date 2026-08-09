import BaseService from '../../../core/BaseService';
import PbtIntakeRepository from './repository';
import {
  TPbtIntakeBase,
  TSchemaBase,
  TSltWeightBase,
  TSltScoreBase,
  TDepartmentBase,
  TCddPrefBase,
} from '../../../util/types/schema_types';
import SltWeightService from '../../group_selection/slt_weighting/service';
import SltScoreService from '../../group_selection/slt_scoring/service';
import DepartmentService from '../../group_department/departments/service';
import CddPrefService from '../../group_candidate/cdd_preference/service';
import db_structure from '../../../util/config/db_structure';
import ValueError from '../../../util/errors/ValueError';
import AppError from '../../../util/errors/AppError';
import loggers from '../../../infra/loggers';

//  Service class

class PbtIntakeService extends BaseService<TPbtIntakeBase & TSchemaBase, PbtIntakeRepository> {
  private slt_weight_service: SltWeightService;
  private slt_score_service: SltScoreService;
  private department_service: DepartmentService;
  private cdd_pref_service: CddPrefService;
  private result_arr: any[] = [];
  private pending_arr: any[] = [];

  //  Constructor
  constructor(
    table: string,
    columns: Extract<keyof (TPbtIntakeBase & TSchemaBase), string>[],
    primary_key: string,
  ) {
    const repository = new PbtIntakeRepository(table, columns, primary_key);
    super(table, columns, primary_key, repository);

    this.slt_weight_service = new SltWeightService(
      db_structure.slt_weight.table,
      db_structure.slt_weight.columns as Extract<
        keyof (TSltWeightBase & TSchemaBase),
        string
      >[],
      db_structure.slt_weight.primary_key,
    );
    if (!this.slt_weight_service) {
      throw new ValueError(
        500,
        '[PbtIntakeService] error: failed to initialise slt_weight_service',
      );
    }

    this.slt_score_service = new SltScoreService(
      db_structure.slt_score.table,
      db_structure.slt_score.columns as Extract<
        keyof (TSltScoreBase & TSchemaBase),
        string
      >[],
      db_structure.slt_score.primary_key,
    );
    if (!this.slt_score_service) {
      throw new ValueError(
        500,
        '[PbtIntakeService] error: failed to initialise slt_score_service',
      );
    }

    this.department_service = new DepartmentService(
      db_structure.departments.table,
      db_structure.departments.columns as Extract<
        keyof (TDepartmentBase & TSchemaBase),
        string
      >[],
      db_structure.departments.primary_key,
    );
    if (!this.department_service) {
      throw new ValueError(
        500,
        '[PbtIntakeService] error: failed to initialise department_service',
      );
    }

    this.cdd_pref_service = new CddPrefService(
      db_structure.cdd_pref.table,
      db_structure.cdd_pref.columns as Extract<
        keyof (TCddPrefBase & TSchemaBase),
        string
      >[],
      db_structure.cdd_pref.primary_key,
    );
    if (!this.cdd_pref_service) {
      throw new ValueError(
        500,
        '[PbtIntakeService] error: failed to initialise cdd_pref_service',
      );
    }
  }


  //  ==========    Main Method    ==========

  public set_intake_results = async(weight_id: number) => {
    try {
      await this.run_selection_procedures(weight_id);
    } catch(err){
      const err_msg = `[${this.table.toUpperCase()}] error: failed to run selection procedures.`;
      loggers.app_logger.error(`${err_msg}\n${err}`);
      throw new AppError(500, err_msg);
    }
    let result_rows: any[] = [];
    try {
      const result = await this.repository.set_select_result(this.result_arr);
      result_rows = result.rows;
    } catch(err){
      const err_msg = `[${this.table.toUpperCase()}] error: failed to save selection results.`;
      loggers.app_logger.error(`${err_msg}\n${err}`);
      throw new AppError(500, err_msg);
    }
    let pending_rows: any[] = [];
    try {
       const result = await this.repository.set_select_result(this.pending_arr);
       pending_rows = result.rows;
    } catch(err){
      const err_msg = `[${this.table.toUpperCase()}] error: failed to save pending selection results.`;
      loggers.app_logger.error(`${err_msg}\n${err}`);
      throw new AppError(500, err_msg);
    }
    return [...result_rows, ...pending_rows];
  }


  //  ==========    Supporting Methods    ==========

  //  remarks: the major select logic, comprise sub-processes of regular and pending
  public run_selection_procedures = async (weight_id: number) => {
    //  learnt: reset for subsequent select action
    this.result_arr = [];
    this.pending_arr = [];

    //  remarks: (1) extract candidate total score, department weighting, selection weighting
    const { candidate_desc, department_desc, weighting_desc, pref_desc } = await this.get_selection_inputs(weight_id);
    const target_weight = weighting_desc.data.find((weight: any) => Number(weight._id) === Number(weight_id));
    if (!target_weight) {
      throw new ValueError(
        404,
        `[${this.table.toUpperCase()}] error: weight_id ${weight_id} is not a known weighting strategy.`,
      );
    }
    //  remarks: (2) matching
    //  remarks: remaining_capacity already reflects existing staff headcount (view_department_criteria);
    //           clone here since assign_candidates_regular/pending mutate it per assignment
    //  learnt: prevent changes made to original department_desc array, as [...array] cannot clone nested objects
    const dept_capacity_desc = department_desc.map(dept => ({ ...dept }));
    //  remarks: execute selection processes
    const pref_map = new Map(pref_desc.map(pref => [pref.candidate_id, pref]));
    this.assign_candidates_regular(candidate_desc, dept_capacity_desc, pref_map, weight_id, 'normal');
    this.pending_arr = this.assign_candidates_pending(this.pending_arr, dept_capacity_desc, weight_id);
    return { 
      result_arr: this.result_arr, 
      pending_arr: this.pending_arr 
    };
  };

  //  remarks: reusable matching logic, double loop to match candidate score and department standard
  //  remarks: time cost - O(n * m)
  public assign_candidates_regular = (
    candidate_list: any[],
    department_list: any[],
    pref_map: Map<number, any>,
    weight_id: number,
    remarks: string,
  ) => {
    candidate_list.forEach(candidate => {
      //  remarks: get preference list per candidates
      const pref = pref_map.get(candidate.candidate_id);
      const preferred_ids = pref
        ? [pref.pref_dept_1st, pref.pref_dept_2nd, pref.pref_dept_3rd].filter(id => id != null)
        : [];
      //  remarks: new list with preference options first and other departments by weighting later
      const ordered_list = [
        ...preferred_ids
          .map(dept_id => department_list.find(dept => dept.dept_id === dept_id))
          .filter(Boolean),
        ...department_list.filter(dept => !preferred_ids.includes(dept.dept_id)),
      ];
      //  remarks: do the matching based on department requirements
      const matched_dept = ordered_list.find(dept => {
        const has_capacity = dept.remaining_capacity > 0;
        const meets_criteria =
          candidate.edu_score >= (dept.min_score_qual ?? 0) &&
          candidate.exp_score >= (dept.min_score_exp ?? 0) &&
          candidate.test_score >= (dept.min_score_tests ?? 0);
        return has_capacity && meets_criteria;
      });
      //  remarks: assign to lists
      if (matched_dept) {
        matched_dept.remaining_capacity -= 1;
        this.result_arr.push({ ...candidate, dept_id: matched_dept.dept_id, weight_id, remarks });
      } else {
        this.pending_arr.push({ ...candidate, dept_id: null, weight_id, remarks: 'force_assign' });
      }
    });
  };

  //  remarks: matching logic, as second selection layer without score criteria
  public assign_candidates_pending = (candidate_list: any[], department_list: any[], weight_id: number) => {
    const still_pending: any[] = [];
    //  remarks: matching by department designated priority
    candidate_list.forEach(candidate => {
      const matched_dept = department_list.find(dept => {
        const has_capacity = dept.remaining_capacity > 0;
        return has_capacity;
      });
      //  remarks: assign to listsm supposedly quota will be enough for all
      if (matched_dept) {
        matched_dept.remaining_capacity -= 1;
        this.result_arr.push({ ...candidate, dept_id: matched_dept.dept_id, weight_id, remarks: 'force_assign' });
      } else {
        still_pending.push({ ...candidate, dept_id: null, weight_id, remarks: 'force_assign_failed' });
      }
    });
    return still_pending;
  };

  //  remarks: get candidate score list, get department list, get select weighting
  private get_selection_inputs = async (weight_id: number) => {
    //  remarks: candidate total scores in desc order
    const candidate_desc = await this.slt_score_service.get_slt_score_desc(weight_id);
    if (!candidate_desc || candidate_desc.length < 1) {
      throw new ValueError(
        404,
        `[${this.table.toUpperCase()}] error: no candidate score is found.`,
      );
    }
    //  remarks: department list merged with its active selection criteria, in importance_weight desc order
    const department_desc = await this.department_service.get_department_criteria_desc();
    if (!department_desc || department_desc.length < 1) {
      throw new ValueError(
        404,
        `[${this.table.toUpperCase()}] error: no department is found.`,
      );
    }
    //  remarks: selection weighting in desc order
    const weighting_desc = await this.slt_weight_service.get_record_batch(
      { page_current: 1, page_limit: 100 },  // remarks: supposed weighting strategy count within 100
    );
    if (!weighting_desc.data || weighting_desc.data.length < 1) {
      throw new ValueError(
        404,
        `[${this.table.toUpperCase()}] error: no weighting strategy is found.`,
      );
    }
    //  remarks: candidate department preference (1st/2nd/3rd choice), used before importance_weight fallback
    const pref_batch = await this.cdd_pref_service.get_record_batch(
      { page_current: 1, page_limit: 100 },  // remarks: supposed candidate preference count within 100
    );
    const pref_desc = pref_batch.data ?? [];
    return { candidate_desc, department_desc, weighting_desc, pref_desc };
  };
}

//  Export
export default PbtIntakeService;
