//  remarks: pagination results are frequently changing, skip caching to avoid stale data
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
