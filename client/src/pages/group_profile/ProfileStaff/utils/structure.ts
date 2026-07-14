import { enum_gender, enum_staff_role } from "../../../../utils/types/page_enums";
import { init_select_dept_opts } from "./handlers";
import { PLACEHOLDER_SELECT } from "../../../../utils/constants";



//  remarks: table structure for building the forms (staff details)
export const getStaffDetailStructure = (departments: any) => ({
  _id: {
    type: 'text',
    label: 'Identifier',
    disabled: true,
  },
  first_name: {
    type: 'text',
    label: 'First Name',
    placeholder: 'Insert name...',
  },
  last_name: {
    type: 'text',
    label: 'Last Name',
    placeholder: 'Insert name...',
  },
  gender: {
    type: 'select',
    label: 'Gender',
    options: Object.entries(enum_gender).map(([key, value]) => ({
      value: key,
      label: value,
    })),
    placeholder: PLACEHOLDER_SELECT,
  },
  work_position: {
    type: 'text',
    label: 'Position',
    placeholder: 'Insert position...',
  },
  work_grade: {
    type: 'select',
    label: 'Grade',
    options: Object.entries(enum_staff_role).map(([key, value]) => ({
      value: key,
      label: value,
    })),
    placeholder: PLACEHOLDER_SELECT,
  },
  work_email: {
    type: 'email',
    label: 'Work Email',
    placeholder: 'Insert email...',
  },
  work_ext: {
    type: 'text',
    label: 'Extension',
    placeholder: 'Insert extension...',
  },
  dept_id: {
    type: 'select',
    label: 'Department',
    placeholder: PLACEHOLDER_SELECT,
    options: init_select_dept_opts({ departments }),
  },
  date_hired: {
    type: 'date',
    label: 'Date Hired',
    placeholder: 'Select date...',
  },
  date_quit: {
    type: 'date',
    label: 'Date Quit',
    placeholder: 'Select date...',
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
});
