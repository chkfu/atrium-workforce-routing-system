import * as yup from 'yup';

//  remarks: schema for creating candidates
export const CreateCandidateSchema = yup.object({
  first_name: yup
    .string()
    .required('First name is required')
    .matches(/^[a-zA-Z\s\-]*$/, 'Special characters not allowed.')
    .trim()
    .max(20, 'Exceeded length of 20 characters.'),
  last_name: yup
    .string()
    .required('Last name is required')
    .max(20, 'Exceed length of 20 characters.')
    .matches(/^[a-zA-Z\s\-]*$/, 'Special characters not allowed.')
    .trim(),
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female', 'other'], 'Invalid option'),
  email: yup
    .string()
    .required('Email is required')
    .transform((value) => value.replace(/\s/g, ''))
    .trim()
    .email('Invalid email'),
  prob_status: yup
    .string()
    .required('Probation status is required')
    .oneOf(
      [
        'selecting',
        'training',
        'completed',
        'postponed',
        'withdrawn',
        'failed',
      ],
      'Invalid option',
    ),
});

//  remarks: schema for updating candidates (all fields optional)
export const UpdateCandidateSchema = yup.object({
  first_name: yup
    .string()
    .matches(/^[a-zA-Z\s\-]*$/, 'Special characters not allowed.')
    .trim()
    .max(20, 'Exceeded length of 20 characters.'),
  last_name: yup
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

//  remarks: schema for filtering candidates (all fields optional)
export const FilterCandidateSchema = yup.object({
  filter_name: yup
    .string()
    .trim()
    .max(20, 'Exceeded length of 20 characters.'),
});
