const BASE_URL = '/api/v1';

export const API = {
  LOGIN: `${BASE_URL}/auth/login_user`,
  LOGOUT: `${BASE_URL}/auth/logout_user`,
  RESET_OPT_OUT: `${BASE_URL}/auth/reset_password_opt_out`,
  RESET_OPT_IN: `${BASE_URL}/auth/reset_password_opt_in`,
  CANDIDATES: `${BASE_URL}/candidates`,
  CANDIDATES_ACTIVATE: `${BASE_URL}/candidates/activation`,
  CANDIDATES_EDU: `${BASE_URL}/candidate_education`,
  CANDIDATES_EXP: `${BASE_URL}/candidate_experience`,
  CANDIDATES_TEST: `${BASE_URL}/candidate_tests`,
  CANDIDATES_PREF: `${BASE_URL}/candidate_preferences`,
  STAFF: `${BASE_URL}/staff`,
  STAFF_ACTIVATE: `${BASE_URL}/staff/activation`,
  DEPARTMENTS: `${BASE_URL}/departments`,
  DEPARTMENTS_ACTIVATE: `${BASE_URL}/departments/activation`,
  // SELECT_CRITERIA: ``;
};
