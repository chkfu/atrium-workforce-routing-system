import { enum_cert_degree, enum_cert_institute, enum_cert_major } from "../../../../utils/types/page_enums";

export const CandidateEduStructrure = {
  cert_degree: {
    type: 'select',
    label: 'Degree',
    options: Object.entries(enum_cert_degree).map(([key, value]) => ({
      value: key,
      label: value,
    })),
    placeholder: '--- Please Select ---',
  },
  cert_institute: {
    type: 'select',
    label: 'Institute',
    options: Object.entries(enum_cert_institute).map(([key, value]) => ({
      value: key,
      label: value,
    })),
    placeholder: '--- Please Select ---',
  },
  cert_major: {
    type: 'select',
    label: 'Major',
    options: Object.entries(enum_cert_major).map(([key, value]) => ({
      value: key,
      label: value,
    })),
    placeholder: '--- Please Select ---',
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
    placeholder: '--- Please Select ---',
  },
  is_active: {
    type: 'select',
    label: 'Active Status',
    options: [
      { value: 'true', label: 'True' },
      { value: 'false', label: 'False' },
    ],
    placeholder: '--- Please Select ---',
  },
};