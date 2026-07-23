import { PLACEHOLDER_SELECT } from "../../../../utils/constants";

//  remarks: table structure for building the forms (department details)
export const DeptStructure = {
  _id: {
    type: 'text',
    label: 'Identifier',
    disabled: true,
  },
  dept_name: {
    type: 'text',
    label: 'Department Name',
    placeholder: 'Insert name...',
  },
  dept_capacity: {
    type: 'number',
    label: 'Capacity',
    placeholder: 'Insert capacity...',
  },
  importance_weight: {
    type: 'number',
    label: 'Importance Weight',
    placeholder: 'Insert weight...',
    step: 0.01
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

export const SelectCriteriaStructure = {
  min_score_qual: {
    type: 'number',
    label: 'Minimum Qualification Score',
    placeholder: 'Insert minimum score...',
  },
  min_score_exp: {
    type: 'number',
    label: 'Minimum Experience Score',
    placeholder: 'Insert minimum score...',
  },
  min_score_tests: {
    type: 'number',
    label: 'Minimum Test Score',
    placeholder: 'Insert minimum score...',
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


