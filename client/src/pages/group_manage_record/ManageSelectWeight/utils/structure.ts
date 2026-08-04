import { ISelectWeightTypeField } from '../../../../utils/types/redux_types';

const edu_fields: ISelectWeightTypeField[] = [
  { name: 'edu_degree_other', label: 'Other Degree' },
  { name: 'edu_degree_bachelor', label: "Bachelor's Degree" },
  { name: 'edu_degree_postdip', label: 'Postgraduate Diploma' },
  { name: 'edu_degree_master', label: "Master's Degree" },
  { name: 'edu_degree_doctoral', label: 'Doctoral Degree' },
  { name: 'edu_inst_other', label: 'Other Tier Institution' },
  { name: 'edu_inst_1st', label: '1st Tier Institution' },
  { name: 'edu_inst_2nd', label: '2nd Tier Institution' },
  { name: 'edu_inst_3rd', label: '3rd Tier Institution' },
  { name: 'edu_major_stem', label: 'STEM Major' },
  { name: 'edu_major_eng', label: 'Engineering Major' },
  { name: 'edu_major_bus', label: 'Business Major' },
  { name: 'edu_major_law', label: 'Law Major' },
  { name: 'edu_major_sosc', label: 'Social Science Major' },
  { name: 'edu_major_other', label: 'Other Major' },
];

const exp_fields: ISelectWeightTypeField[] = [
  { name: 'exp_nature_ft', label: 'Full-time' },
  { name: 'exp_nature_pt', label: 'Part-time' },
  { name: 'exp_nature_intern', label: 'Internship' },
  { name: 'exp_nature_vol', label: 'Volunteer' },
  { name: 'exp_year_rate', label: 'Per-year Rate', step: 0.01 },
];

const test_fields: ISelectWeightTypeField[] = [
  { name: 'test_apt', label: 'Aptitude Test Weight', step: 0.01 },
  { name: 'test_int_1st', label: '1st Interview Weight', step: 0.01 },
  { name: 'test_int_2nd', label: '2nd Interview Weight', step: 0.01 },
];

const share_fields: ISelectWeightTypeField[] = [
  { name: 'weight_edu', label: 'Education Share', step: 0.01 },
  { name: 'weight_exp', label: 'Experience Share', step: 0.01 },
  { name: 'weight_test', label: 'Test Share', step: 0.01 },
];

const pass_fields: ISelectWeightTypeField[] = [
  { name: 'pass_edu', label: 'Education Pass Mark' },
  { name: 'pass_exp', label: 'Experience Pass Mark' },
  { name: 'pass_test', label: 'Test Pass Mark' },
];


//  remarks: collection

export const STRUCTURE = {
  education: edu_fields,
  experience: exp_fields,
  test_score: test_fields,
  share_fields: share_fields,
  pass_fields: pass_fields,
}