import * as yup from 'yup';

//  remarks: schema for creating departmentss
export const CreateDepartmentSchema = yup.object({
  dept_name: yup
    .string()
    .required('Department name is required')
    .matches(/^[a-zA-Z\s\-]*$/, 'Special characters not allowed.')
    .trim()
    .max(20, 'Exceeded length of 20 characters.'),
  dept_capacity: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(100)
    .nullable()
    .optional(),
  importance_weight: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(10)
    .nullable()
    .optional(),
});

//  remarks: schema for updating departmentss (all fields optional)
export const UpdateDepartmentSchema = yup.object({
  dept_name: yup
    .string()
    .matches(/^[a-zA-Z\s\-]*$/, 'Special characters not allowed.')
    .trim()
    .max(20, 'Exceeded length of 20 characters.')
    .nullable()
    .optional(),
  dept_capacity: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .typeError('Capacity must be a number')
    .min(0)
    .max(100)
    .nullable()
    .optional(),
  importance_weight: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .typeError('Weight must be a number')
    .min(0)
    .max(10)
    .nullable()
    .optional(),
});

//  remarks: schema for filtering departmentss (all fields optional)
export const FilterDepartmentSchema = yup.object({
  dept_name: yup.string().trim().max(20, 'Exceeded length of 20 characters.').nullable().optional(),
  dept_capacity: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(100)
    .nullable()
    .optional(),
  importance_weight: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(10)
    .nullable()
    .optional(),
});
