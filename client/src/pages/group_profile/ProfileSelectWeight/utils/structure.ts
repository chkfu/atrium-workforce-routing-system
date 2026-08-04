import { PLACEHOLDER_SELECT } from "../../../../utils/constants";

//  remarks: table structure for building the forms (selection weight details)
export const SelectWeightStructure = {
  _id: {
    type: 'text',
    label: 'Identifier',
    disabled: true,
  },
  strategy_name: {
    type: 'text',
    label: 'Strategy Name',
    placeholder: 'Insert name...',
  },
  strategy_goal: {
    type: 'text',
    label: 'Strategy Goal',
    placeholder: 'Insert goal...',
  },
  //  education rules
  edu_degree_other: {
    type: 'number',
    label: 'Other Degree',
    placeholder: 'Insert weight...',
  },
  edu_degree_bachelor: {
    type: 'number',
    label: "Bachelor's Degree",
    placeholder: 'Insert weight...',
  },
  edu_degree_postdip: {
    type: 'number',
    label: 'Postgraduate Diploma',
    placeholder: 'Insert weight...',
  },
  edu_degree_master: {
    type: 'number',
    label: "Master's Degree",
    placeholder: 'Insert weight...',
  },
  edu_degree_doctoral: {
    type: 'number',
    label: 'Doctoral Degree',
    placeholder: 'Insert weight...',
  },
  edu_inst_other: {
    type: 'number',
    label: 'Other Tier Institution',
    placeholder: 'Insert weight...',
  },
  edu_inst_1st: {
    type: 'number',
    label: '1st Tier Institution',
    placeholder: 'Insert weight...',
  },
  edu_inst_2nd: {
    type: 'number',
    label: '2nd Tier Institution',
    placeholder: 'Insert weight...',
  },
  edu_inst_3rd: {
    type: 'number',
    label: '3rd Tier Institution',
    placeholder: 'Insert weight...',
  },
  edu_major_stem: {
    type: 'number',
    label: 'STEM Major',
    placeholder: 'Insert weight...',
  },
  edu_major_eng: {
    type: 'number',
    label: 'Engineering Major',
    placeholder: 'Insert weight...',
  },
  edu_major_bus: {
    type: 'number',
    label: 'Business Major',
    placeholder: 'Insert weight...',
  },
  edu_major_law: {
    type: 'number',
    label: 'Law Major',
    placeholder: 'Insert weight...',
  },
  edu_major_sosc: {
    type: 'number',
    label: 'Social Science Major',
    placeholder: 'Insert weight...',
  },
  edu_major_other: {
    type: 'number',
    label: 'Other Major',
    placeholder: 'Insert weight...',
  },
  //  experience rules
  exp_nature_ft: {
    type: 'number',
    label: 'Full-time',
    placeholder: 'Insert weight...',
  },
  exp_nature_pt: {
    type: 'number',
    label: 'Part-time',
    placeholder: 'Insert weight...',
  },
  exp_nature_intern: {
    type: 'number',
    label: 'Internship',
    placeholder: 'Insert weight...',
  },
  exp_nature_vol: {
    type: 'number',
    label: 'Volunteer',
    placeholder: 'Insert weight...',
  },
  exp_year_rate: {
    type: 'number',
    label: 'Per-year Rate',
    placeholder: 'Insert rate...',
    step: 0.01,
  },
  //  test score rules
  test_apt: {
    type: 'number',
    label: 'Aptitude Test Weight',
    placeholder: 'Insert weight...',
    step: 0.01,
  },
  test_int_1st: {
    type: 'number',
    label: '1st Interview Weight',
    placeholder: 'Insert weight...',
    step: 0.01,
  },
  test_int_2nd: {
    type: 'number',
    label: '2nd Interview Weight',
    placeholder: 'Insert weight...',
    step: 0.01,
  },
  //  overall shares
  weight_edu: {
    type: 'number',
    label: 'Education Share',
    placeholder: 'Insert share...',
    step: 0.01,
  },
  weight_exp: {
    type: 'number',
    label: 'Experience Share',
    placeholder: 'Insert share...',
    step: 0.01,
  },
  weight_test: {
    type: 'number',
    label: 'Test Share',
    placeholder: 'Insert share...',
    step: 0.01,
  },
  //  passing standard
  pass_edu: {
    type: 'number',
    label: 'Education Pass Mark',
    placeholder: 'Insert pass mark...',
  },
  pass_exp: {
    type: 'number',
    label: 'Experience Pass Mark',
    placeholder: 'Insert pass mark...',
  },
  pass_test: {
    type: 'number',
    label: 'Test Pass Mark',
    placeholder: 'Insert pass mark...',
  },
  is_active: {
    type: 'select',
    label: 'Active Status',
    options: [
      { value: 'true', label: 'True' },
      { value: 'false', label: 'False' },
    ],
    placeholder: PLACEHOLDER_SELECT,
  },
}

