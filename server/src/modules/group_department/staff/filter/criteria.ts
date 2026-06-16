//  remarks: pagination results are frequently changing, skip caching to avoid stale data

//  remarks: the type refers to the where relation, and columns names are corresponding to sql
export const filter_criteria: Record<
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
