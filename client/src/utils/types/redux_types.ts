import {
  enum_cert_degree,
  enum_cert_institute,
  enum_cert_major,
  enum_gender,
  enum_prob_status,
  enum_staff_role,
} from './page_enums';

//  auth

export interface IAuth {
  _id: number;
  first_name: string;
  last_name: string;
  candidate_id: number | null;
  staff_id: number | null;
  user_role: string;
}

export interface IAuthState {
  user: IAuth | null;
  isAuthenticated: boolean;
}

//  candidates

export interface ICandidate {
  _id: number;
  first_name: string;
  last_name: string;
  gender: enum_gender;
  email: string;
  prob_status: enum_prob_status;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ICandidateList {
  value: ICandidate[];
}

export interface ICandidateEdu {
  _id: number;
  candidate_id: number;
  cert_degree: enum_cert_degree;
  cert_institute: enum_cert_institute;
  cert_major: enum_cert_major;
  year_issued: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ICandidateEduList {
  value: ICandidateEdu[];
}

export interface ICandidateExp {
  _id: number;
  candidate_id: number;
  exp_nature: string;
  exp_role: string;
  exp_institute: string;
  date_start: string;
  date_end: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ICandidateExpList {
  value: ICandidateExp[];
}

export interface ICandidateTest {
  _id: number;
  candidate_id: number;
  score_aptitude: number;
  score_interview_1st: number;
  score_interview_2nd: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ICandidateTestList {
  value: ICandidateTest[];
}

export interface ICandidatePref {
  _id: number;
  candidate_id: number;
  pref_dept_1st: number | null;
  pref_dept_2nd: number | null;
  pref_dept_3rd: number | null;
  is_active: boolean;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface ICandidatePrefList {
  value: ICandidatePref[];
}


//  staff

export interface IStaff {
  _id: number;
  first_name: string;
  last_name: string;
  gender: enum_gender;
  work_position: string;
  work_grade: enum_staff_role;
  work_email: string;
  work_ext: string;
  dept_id: number;
  date_hired: string;
  date_quit: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface IStaffList {
  value: IStaff[];
}

//  departments

export interface IDepartment {
  _id: number;
  dept_name: string;
  dept_capacity: number;
  importance_weight: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface IDepartmentList {
  value: IDepartment[];
}

//  selection

export interface ISelectCriteria {
  _id: number;
  dept_id: number;
  min_score_qual: number;
  min_score_exp: number;
  min_score_tests: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ISelectCriteriaList {
  value: ISelectCriteria[];
}


export interface ISelectWeight {
  _id: number;
  strategy_name: string;
  strategy_goal: string;
  //  education rules
  edu_degree_other: number;
  edu_degree_bachelor: number;
  edu_degree_postdip: number;
  edu_degree_master: number;
  edu_degree_doctoral: number;
  edu_inst_other: number;
  edu_inst_1st: number;
  edu_inst_2nd: number;
  edu_inst_3rd: number;
  edu_major_stem: number;
  edu_major_eng: number;
  edu_major_bus: number;
  edu_major_law: number;
  edu_major_sosc: number;
  edu_major_other: number;
  //  experience rules
  exp_nature_ft: number;
  exp_nature_pt: number;
  exp_nature_intern: number;
  exp_nature_vol: number;
  exp_year_rate: number;
  //  test score rules
  test_apt: number;
  test_int_1st: number;
  test_int_2nd: number;
  //  overall shares
  weight_edu: number;
  weight_exp: number;
  weight_test: number;
  //  passing standard
  pass_edu: number;
  pass_exp: number;
  pass_test: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ISelectWeightTypeField {
  name: string;
  label: string;
  step?: number;
}

export interface ISelectWeightList {
  value: ISelectWeight[];
}

//  probation intakes

export interface IProbIntake {
  intake_id: number;
  candidate_id: number;
  candidate_first_name: string;
  candidate_last_name: string;
  candidate_gender: enum_gender;
  candidate_prob_status: enum_prob_status;
  intake_dept_name: string;
  intake_strategy_name: string;
  intake_edu_score: number;
  intake_exp_score: number;
  intake_test_score: number;
  intake_total_score: number;
  intake_is_active: boolean;
  intake_created_at: string;
  intake_updated_at: string;
}

export interface IProbIntakeList {
  value: IProbIntake[];
}