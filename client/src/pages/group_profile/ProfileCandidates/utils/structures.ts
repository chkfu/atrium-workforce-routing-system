import { enum_cert_degree, enum_cert_institute, enum_cert_major, enum_gender, enum_prob_status } from "../../../../utils/types/page_enums";
import { init_select_dept_opts } from "./handlers";
import { PLACEHOLDER_SELECT } from "../../../../utils/constants";



//  remarks: table structure for building the forms (candidate details)
export const CandidateDetailStructure = {
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
  email: {
    type: 'email',
    label: 'Email',
    placeholder: 'Insert email...',
  },
  prob_status: {
    type: 'select',
    label: 'Candidate Stage',
    options: Object.entries(enum_prob_status).map(([key, value]) => ({
      value: key,
      label: value,
    })),
    placeholder: PLACEHOLDER_SELECT,
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


//  remarks: table structure for building the forms (candidate education)
export const CandidateEduStructrure = {
  cert_degree: {
    type: 'select',
    label: 'Degree',
    options: Object.entries(enum_cert_degree).map(([key, value]) => ({
      value: key,
      label: value,
    })),
    placeholder: PLACEHOLDER_SELECT,
  },
  cert_institute: {
    type: 'select',
    label: 'Institute',
    options: Object.entries(enum_cert_institute).map(([key, value]) => ({
      value: key,
      label: value,
    })),
    placeholder: PLACEHOLDER_SELECT,
  },
  cert_major: {
    type: 'select',
    label: 'Major',
    options: Object.entries(enum_cert_major).map(([key, value]) => ({
      value: key,
      label: value,
    })),
    placeholder: PLACEHOLDER_SELECT,
  },
  year_issued: {
    type: 'text',
    label: 'Year awarded',
    placeholder: 'Insert numbers...',
  },
  is_verified: {
    type: 'select',
    label: 'Verified Status',
    options: [
      { value: 'true', label: 'True' },
      { value: 'false', label: 'False' },
    ],
    placeholder: PLACEHOLDER_SELECT,
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
};

//  remarks: table structure for building the forms (candidate experience)
export const CandidateExpStructrure = {
  exp_nature: {
    type: 'text',
    label: 'Nature of Work',
    placeholder: 'Insert text...',
  },
  exp_role: {
    type: 'text',
    label: 'Role',
    placeholder: 'Insert text...',
  },
  exp_institute: {
    type: 'text',
    label: 'Organization/Company',
    placeholder: 'Insert text...',
  },
  date_start: {
    type: 'date',
    label: 'Start Date',
    placeholder: 'Select date...',
  },
  date_end: {
    type: 'date',
    label: 'End Date',
    placeholder: 'Select date...',
  },
  is_verified: {
    type: 'select',
    label: 'Verified Status',
    options: [
      { value: 'true', label: 'True' },
      { value: 'false', label: 'False' },
    ],
    placeholder: PLACEHOLDER_SELECT,
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
};

//  remarks: table structure for building the forms (candidate test score)
export const CandidateTestStructrure = {
  score_aptitude: {
    type: 'number',
    label: 'Aptitude Score',
    placeholder: 'Insert score between 0 and 100...',
  },
  score_interview_1st: {
    type: 'number',
    label: 'First Interview Score',
    placeholder: 'Insert score between 0 and 100...',
  },
  score_interview_2nd: {
    type: 'number',
    label: 'Second Interview Score',
    placeholder: 'Insert score between 0 and 100...',
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
};


//  remarks: table structure for building the forms (candidate preferences)
export const getCandidatePrefStructrure = (departments: any) => ({
  pref_dept_1st: {
    type: 'select',
    label: '1st Preference',
    placeholder: PLACEHOLDER_SELECT,
    options: init_select_dept_opts({ departments }),
  },
  pref_dept_2nd: {
    type: 'select',
    label: '2nd Preference',
    placeholder: PLACEHOLDER_SELECT,
    options: init_select_dept_opts({ departments }),
  },
  pref_dept_3rd: {
    type: 'select',
    label: '3rd Preference',
    placeholder: PLACEHOLDER_SELECT,
    options: init_select_dept_opts({ departments }),
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