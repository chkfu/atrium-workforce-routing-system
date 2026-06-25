
import * as yup from 'yup';

//  remarks: schema for updating candidate education (all fields optional)
export const UpdateCandidateEduSchema = yup.object({
  _id: yup.number(),
  candidate_id: yup
    .number()
    .nullable(),
  cert_degree: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s\-\.]*$/, 'Special characters and numbers not allowed.')
    .max(50, 'Exceeded length of 50 characters.').nullable().optional(),
  cert_institute: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s\-\.]*$/, 'Special characters and numbers not allowed.')
    .max(50, 'Exceeded length of 50 characters.').nullable().optional(),
  cert_major: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s\-\.]*$/, 'Special characters and numbers not allowed.')
    .max(50, 'Exceeded length of 50 characters.').nullable().optional(),
  year_issued: yup
    .number()
    .min(1900, 'Year must be 1900 or later.')
    .max(new Date().getFullYear(), `Year cannot exceed current year.`).nullable().optional(),
  is_verified: yup
    .boolean()
    .default(false)
    .nullable(),
  is_active: yup
    .boolean()
    .default(true)
    .nullable(),
});