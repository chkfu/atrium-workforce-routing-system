import * as yup from 'yup';

//  remarks: schema for updating candidate education (all fields optional)
export const UpdateCandidateEduSchema = yup.object({
  _id: yup.number(),
  candidate_id: yup.number().nullable(),
  cert_degree: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s\-\.]*$/, 'Special characters and numbers not allowed.')
    .max(50, 'Exceeded length of 50 characters.')
    .nullable()
    .optional(),
  cert_institute: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s\-\.]*$/, 'Special characters and numbers not allowed.')
    .max(50, 'Exceeded length of 50 characters.')
    .nullable()
    .optional(),
  cert_major: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s\-\.]*$/, 'Special characters and numbers not allowed.')
    .max(50, 'Exceeded length of 50 characters.')
    .nullable()
    .optional(),
  year_issued: yup
    .number()
    .min(1900, 'Year must be 1900 or later.')
    .max(new Date().getFullYear(), `Year cannot exceed current year.`)
    .nullable()
    .optional(),
  is_verified: yup.boolean().default(false).nullable(),
  is_active: yup.boolean().default(true).nullable(),
});

//  remarks: schema for updating candidate experience (all fields optional)
export const UpdateCandidateExpSchema = yup.object({
  _id: yup.number(),
  candidate_id: yup.number().nullable(),
  exp_nature: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s\-\.]*$/, 'Special characters and numbers not allowed.')
    .max(50, 'Exceeded length of 50 characters.')
    .nullable()
    .optional(),
  exp_role: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s\-\.]*$/, 'Special characters and numbers not allowed.')
    .max(50, 'Exceeded length of 50 characters.')
    .nullable()
    .optional(),
  exp_institute: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s\-\.]*$/, 'Special characters and numbers not allowed.')
    .max(50, 'Exceeded length of 50 characters.')
    .nullable()
    .optional(),
  date_start: yup.date().min(new Date('1900-01-01'), 'Start date must be after year 1900').nullable().optional(),
  date_end: yup.date()
    .min(yup.ref('date_start'), 'End date must be later than start date')
    .nullable()
    .optional(),
  is_verified: yup.boolean().default(false).nullable(),
  is_active: yup.boolean().default(true).nullable(),
});

//  remarks: schema for updating candidate test score (all fields optional)
export const UpdateCandidateTestSchema = yup.object({
  _id: yup.number(),
  candidate_id: yup.number().nullable(),
  score_aptitude: yup
    .number()
    .min(0, 'Score must be larger than 0')
    .max(100, 'Score cannot exceed 100')
    .nullable()
    .optional(),
  score_interview_1st: yup
    .number()
    .min(0, 'Score must be larger than 0')
    .max(100, 'Score cannot exceed 100')
    .nullable()
    .optional(),
  score_interview_2nd: yup
    .number()
    .min(0, 'Score must be larger than 0')
    .max(100, 'Score cannot exceed 100')
    .nullable()
    .optional(),
  is_active: yup.boolean().default(true).nullable(),
});

//  remarks: schema for updating candidate preferences (all fields optional)
export const UpdateCandidatePrefSchema = yup.object({
  _id: yup.number(),
  candidate_id: yup.number().nullable(),
  pref_dept_1st: yup
    .number()
    .typeError('Department must be selected')
    .nullable()
    .optional(),
  pref_dept_2nd: yup
    .number()
    .typeError('Department must be selected')
    .nullable()
    .optional(),
  pref_dept_3rd: yup
    .number()
    .typeError('Department must be selected')
    .nullable()
    .optional(),
  is_active: yup.boolean().default(true).nullable(),
});


