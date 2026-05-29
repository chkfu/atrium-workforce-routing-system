import * as yup from 'yup';

//  remarks:
export const UpdateCandidateSchema = yup.object({
  firstName: yup
    .string()
    .matches(/^[a-zA-Z\s\-]*$/, 'Special characters not allowed.')
    .trim()
    .max(20, 'Exceeded length of 20 characters.'),
  lastName: yup
    .string()
    .max(20, 'Exceed length of 20 characters.')
    .matches(/^[a-zA-Z\s\-]*$/, 'Special characters not allowed.')
    .trim(),
  gender: yup
    .string()
    .oneOf(['', 'male', 'female', 'other'], 'Invalid option')
    .nullable(), // learnt: nullable enables to skipped
  email: yup
    .string()
    .transform((value) => value.replace(/\s/g, ''))
    .trim()
    .email('Invalid email'),
  prob_status: yup
    .string()
    .trim()
    .oneOf([
      '',
      'selecting',
      'training',
      'completed',
      'postponed',
      'withdrawn',
      'failed',
    ])
    .nullable(), // learnt: nullable enables to skipped
});
