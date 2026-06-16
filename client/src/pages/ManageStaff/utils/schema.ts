import * as yup from 'yup';

//  remarks: schema for creating Staffs
export const CreateStaffSchema = yup.object({
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
  gender: yup.string().oneOf(['male', 'female', 'other'], 'Invalid option'),
  dept_id: yup.string(),
  work_position: yup.string().trim(),
  work_grade: yup.string().trim(),
  work_extension: yup.string().trim(),
  work_email: yup
    .string()
    .transform((value) => value.replace(/\s/g, ''))
    .trim()
    .email('Invalid email')
    .nullable(),
  date_hired: yup.date().typeError('Invalid date format').nullable(),
  date_quit: yup
    .date()
    .typeError('Invalid date format')
    .nullable()
    .min(yup.ref('date_hired'), 'Invalid date range.'),
});

//  remarks: schema for updating Staffs (all fields optional)
export const UpdateStaffSchema = yup.object({
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
  gender: yup.string().oneOf(['male', 'female', 'other'], 'Invalid option'),
  work_position: yup.string().trim(),
  work_grade: yup.string().trim(),
  work_extension: yup.string().trim(),
  work_email: yup
    .string()
    .transform((value) => value.replace(/\s/g, ''))
    .trim()
    .email('Invalid email')
    .nullable(),
  date_hired: yup.date().typeError('Invalid date format').nullable(),
  date_quit: yup
    .date()
    .typeError('Invalid date format')
    .nullable()
    .min(yup.ref('date_hired'), 'Invalid date range.'),
});

//  remarks: schema for filtering Staffs (all fields optional)
export const FilterStaffSchema = yup.object({
  filter_name: yup.string().trim().max(20, 'Exceeded length of 20 characters.'),
});
