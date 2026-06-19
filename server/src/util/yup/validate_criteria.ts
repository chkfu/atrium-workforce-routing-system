//  remarks: pagination results are frequently changing, skip caching to avoid stale data
//  remarks: the type refers to the where relation, and columns names are corresponding to sql

//  remarks: candidate-based
export const filter_criteria: Record<
  string,
  Record<string, string | string[]>
> = {
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

//  remarks: staff-based
export const filter_criteria_staff: Record<
  string,
  Record<string, string | string[]>
> = {
  name: { type: 'like', column: ['first_name', 'last_name'] },
  gender: { type: 'equal', column: ['gender'] },
  email: { type: 'like', column: ['work_email'] },
  department: { type: 'equal', column: ['dept_id'] },
  position: { type: 'equal', column: ['work_position'] },
  grade: { type: 'equal', column: ['work_grade'] },
  extension: { type: 'equal', column: ['work_ext'] },
  date_hired_from: { type: 'larger_than', column: ['date_hired'] },
  date_hired_to: { type: 'smaller_than', column: ['date_hired'] },
  date_quit_from: { type: 'larger_than', column: ['date_quit'] },
  date_quit_to: { type: 'smaller_than', column: ['date_quit'] },
  is_active: { type: 'equal', column: ['is_active'] },
  created_from: { type: 'larger_than', column: ['created_at'] },
  created_to: { type: 'smaller_than', column: ['created_at'] },
  updated_from: { type: 'larger_than', column: ['updated_at'] },
  updated_to: { type: 'smaller_than', column: ['updated_at'] },
};

//  remarks: department-based
export const filter_criteria_departments: Record<
  string,
  Record<string, string | string[]>
> = {
  name: { type: 'like', column: ['dept_name'] },
  capacity_from: { type: 'larger_than', column: ['dept_capacity'] },
  capacity_to: { type: 'smaller_than', column: ['dept_capacity'] },
  weight_from: { type: 'larger_than', column: ['importance_weight'] },
  weight_to: { type: 'smaller_than', column: ['importance_weight'] },
  is_active: { type: 'equal', column: ['is_active'] },
  created_from: { type: 'larger_than', column: ['created_at'] },
  created_to: { type: 'smaller_than', column: ['created_at'] },
  updated_from: { type: 'larger_than', column: ['updated_at'] },
  updated_to: { type: 'smaller_than', column: ['updated_at'] },
};


