import * as yup from 'yup';

//  remarks: schema for updating department select scoring (all fields optional)
export const UpdateSelectScoringSchema = yup.object({
  _id: yup.number(),
  candidate_id: yup.number().nullable(),
  weight_id: yup.number().nullable(),
  base_score_edu: yup
    .number()
    .min(0, 'Score must be larger than 0')
    .max(100, 'Score cannot exceed 100')
    .default(20)
    .nullable()
    .optional(),
  base_score_exp: yup
    .number()
    .min(0, 'Score must be larger than 0')
    .max(100, 'Score cannot exceed 100')
    .default(20)
    .nullable()
    .optional(),
  base_score_tests: yup
    .number()
    .min(0, 'Score must be larger than 0')
    .max(100, 'Score cannot exceed 100')
    .default(20)
    .nullable()
    .optional(),
  score_foundation: yup
    .number()
    .min(0, 'Score must be larger than 0')
    .max(100, 'Score cannot exceed 100')
    .default(0)
    .nullable()
    .optional(),
  score_preference: yup
    .number()
    .min(0, 'Score must be larger than 0')
    .max(100, 'Score cannot exceed 100')
    .default(0)
    .nullable()
    .optional(),
  is_active: yup.boolean().default(true).nullable(),
});

//  remarks: schema for updating department select criteria
export const UpdateSelectCriteriaSchema = yup.object({
  _id: yup.number(),
  dept_id: yup.number().nullable(),
  min_score_qual: yup
    .number()
    .min(0, 'Score must be larger than 0')
    .max(100, 'Score cannot exceed 100')
    .default(0)
    .nullable()
    .optional(),
  min_score_exp: yup
    .number()
    .min(0, 'Score must be larger than 0')
    .max(100, 'Score cannot exceed 100')
    .default(0)
    .nullable()
    .optional(),
  min_score_tests: yup
    .number()
    .min(0, 'Score must be larger than 0')
    .max(100, 'Score cannot exceed 100')
    .default(0)
    .nullable()
    .optional(),
  pref_criteria: yup.object().nullable().optional(),
  blacklist: yup.object().nullable().optional(),
  is_active: yup.boolean().default(true).nullable(),
});