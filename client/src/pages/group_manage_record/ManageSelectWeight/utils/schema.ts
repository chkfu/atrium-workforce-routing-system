import * as yup from 'yup';

//  remarks: schema for creating select weighting strategies
//  learnt: handler code already fill in the null value, which yup.default never run.
//  learnt: here, leave undefined value to postrgre for auto filling
export const CreateSelectWeightSchema = yup
  .object({
    strategy_name: yup
      .string()
      .required('Strategy name is required')
      .trim()
      .max(50, 'Exceeded length of 50 characters.'),
    strategy_goal: yup.string().trim().nullable().optional(),
    //  education rules
    edu_degree_other: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_degree_bachelor: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_degree_postdip: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_degree_master: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_degree_doctoral: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_inst_other: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_inst_1st: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_inst_2nd: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_inst_3rd: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_major_stem: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_major_eng: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_major_bus: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_major_law: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_major_sosc: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    edu_major_other: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    //  experience rules
    exp_nature_ft: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    exp_nature_pt: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    exp_nature_intern: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    exp_nature_vol: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .nullable()
      .optional(),
    exp_year_rate: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0, 'Rate must be between 0 and 2')
      .max(2, 'Rate must be between 0 and 2')
      .nullable()
      .optional(),
    //  test score rules
    test_apt: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0, 'Weight must be between 0 and 1')
      .max(1, 'Weight must be between 0 and 1')
      .nullable()
      .optional(),
    test_int_1st: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0, 'Weight must be between 0 and 1')
      .max(1, 'Weight must be between 0 and 1')
      .nullable()
      .optional(),
    test_int_2nd: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0, 'Weight must be between 0 and 1')
      .max(1, 'Weight must be between 0 and 1')
      .nullable()
      .optional(),
    //  overall shares
    weight_edu: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0, 'Share must be between 0 and 1')
      .max(1, 'Share must be between 0 and 1')
      .nullable()
      .optional(),
    weight_exp: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0, 'Share must be between 0 and 1')
      .max(1, 'Share must be between 0 and 1')
      .nullable()
      .optional(),
    weight_test: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0, 'Share must be between 0 and 1')
      .max(1, 'Share must be between 0 and 1')
      .nullable()
      .optional(),
    //  passing standard
    pass_edu: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .max(100)
      .nullable()
      .optional(),
    pass_exp: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .max(100)
      .nullable()
      .optional(),
    pass_test: yup
      .number()
      .transform((value) => (value === '' || isNaN(value) ? null : value))
      .min(0)
      .max(100)
      .nullable()
      .optional(),
  })

//  remarks: schema for updating select weighting strategies (all fields optional)
export const UpdateSelectWeightSchema = yup.object({
  strategy_name: yup
    .string()
    .trim()
    .max(50, 'Exceeded length of 50 characters.')
    .nullable()
    .optional(),
  strategy_goal: yup.string().trim().nullable().optional(),
  edu_degree_other: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_degree_bachelor: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_degree_postdip: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_degree_master: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_degree_doctoral: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_inst_other: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_inst_1st: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_inst_2nd: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_inst_3rd: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_major_stem: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_major_eng: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_major_bus: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_major_law: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_major_sosc: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  edu_major_other: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  exp_nature_ft: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  exp_nature_pt: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  exp_nature_intern: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  exp_nature_vol: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .nullable()
    .optional(),
  exp_year_rate: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0, 'Rate must be between 0 and 2')
    .max(2, 'Rate must be between 0 and 2')
    .nullable()
    .optional(),
  test_apt: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0, 'Weight must be between 0 and 1')
    .max(1, 'Weight must be between 0 and 1')
    .nullable()
    .optional(),
  test_int_1st: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0, 'Weight must be between 0 and 1')
    .max(1, 'Weight must be between 0 and 1')
    .nullable()
    .optional(),
  test_int_2nd: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0, 'Weight must be between 0 and 1')
    .max(1, 'Weight must be between 0 and 1')
    .nullable()
    .optional(),
  weight_edu: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0, 'Share must be between 0 and 1')
    .max(1, 'Share must be between 0 and 1')
    .nullable()
    .optional(),
  weight_exp: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0, 'Share must be between 0 and 1')
    .max(1, 'Share must be between 0 and 1')
    .nullable()
    .optional(),
  weight_test: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0, 'Share must be between 0 and 1')
    .max(1, 'Share must be between 0 and 1')
    .nullable()
    .optional(),
  pass_edu: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(100)
    .nullable()
    .optional(),
  pass_exp: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(100)
    .nullable()
    .optional(),
  pass_test: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(100)
    .nullable()
    .optional(),
  is_active: yup.boolean().nullable().optional(),
});

//  remarks: schema for filtering select weighting strategies (all fields optional)
export const FilterSelectWeightSchema = yup.object({
  strategy_name: yup
    .string()
    .trim()
    .max(50, 'Exceeded length of 50 characters.')
    .nullable()
    .optional(),
  weight_edu_from: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(1)
    .nullable()
    .optional(),
  weight_edu_to: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(1)
    .nullable()
    .optional(),
  weight_exp_from: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(1)
    .nullable()
    .optional(),
  weight_exp_to: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(1)
    .nullable()
    .optional(),
  weight_test_from: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(1)
    .nullable()
    .optional(),
  weight_test_to: yup
    .number()
    .transform((value) => (value === '' || isNaN(value) ? null : value))
    .min(0)
    .max(1)
    .nullable()
    .optional(),
  is_active: yup.boolean().nullable().optional(),
});
