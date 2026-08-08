import * as yup from 'yup';

//  remarks: schema for creating probation intakes
export const CreateIntakeSchema = yup.object({
  select_weight_id: yup
    .number()
    .typeError('Weighting strategy ID must be a number.')
    .required('Weighting strategy is required.'),
});

//  remarks: schema for updating probation intakes (all fields optional)
export const UpdateCandidateSchema = yup.object({
  candidate_id: yup.number().typeError('Candidate ID must be a number.'),
  select_weight_id: yup.number().typeError('Weighting strategy ID must be a number.'),
  dept_intake: yup.number().typeError('Department ID must be a number.'),
  round_intake: yup.number().typeError('Round must be a number.'),
  date_start: yup.date().typeError('Invalid date.'),
  date_end: yup.date().typeError('Invalid date.'),
  remarks: yup.string().trim().max(50, 'Exceeded length of 50 characters.'),
});

//  remarks: schema for filtering candidates (all fields optional)
export const FilterCandidateSchema = yup.object({
  filter_name: yup.string().trim().max(20, 'Exceeded length of 20 characters.'),
});
