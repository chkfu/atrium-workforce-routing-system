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
