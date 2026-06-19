//  remarks: pagination results are frequently changing, skip caching to avoid stale data

//  remarks: the type refers to the where relation, and columns names are corresponding to sql
export const filter_criteria: Record<
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
