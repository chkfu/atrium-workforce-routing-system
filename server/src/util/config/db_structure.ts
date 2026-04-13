//  Shared configuration

const SHARED_PRIMARY_KEY: string = '_id';

//  Body

const db_structure = {
  //  1. Core tables

  departments: {
    table: 'departments',
    columns: ['dept_name', 'dept_capacity', 'importance_weight', 'is_active'],
    primary_key: SHARED_PRIMARY_KEY,
  },

  staff: {
    table: 'staff',
    columns: [
      'first_name',
      'last_name',
      'gender',
      'work_position',
      'work_grade',
      'work_email',
      'work_ext',
      'dept_id',
      'date_hired',
      'date_quit',
      'is_active',
    ],
    primary_key: SHARED_PRIMARY_KEY,
  },

  candidates: {
    table: 'candidates',
    columns: [
      'first_name',
      'last_name',
      'gender',
      'email',
      'prob_status',
      'is_active',
    ],
    primary_key: SHARED_PRIMARY_KEY,
  },

  sys_users: {
    table: 'sys_users',
    columns: [
      'username',
      '_password',
      'user_role',
      'staff_id',
      'candidate_id',
      'is_active',
    ],
    primary_key: SHARED_PRIMARY_KEY,
  },

  //  2. Candidate-supported tables

  cdd_edu: {
    table: 'candidate_education',
    columns: [
      'candidate_id',
      'cert_degree',
      'cert_institute',
      'cert_major',
      'year_issued',
      'is_verified',
      'is_active',
    ],
    primary_key: SHARED_PRIMARY_KEY,
  },

  cdd_exp: {
    table: 'candidate_experience',
    columns: [
      'candidate_id',
      'exp_nature',
      'exp_role',
      'exp_institute',
      'year_start',
      'year_end',
      'is_verified',
      'is_active',
    ],
    primary_key: SHARED_PRIMARY_KEY,
  },

  cdd_test: {
    table: 'candidate_tests',
    columns: [
      'candidate_id',
      'score_aptitude',
      'score_interview_1st',
      'score_interview_2nd',
      'score_overall',
      'is_active',
    ],
    primary_key: SHARED_PRIMARY_KEY,
  },

  cdd_pref: {
    table: 'candidate_preferences',
    columns: [
      'candidate_id',
      'pref_dept_1st',
      'pref_dept_2nd',
      'pref_dept_3rd',
      'is_active',
    ],
    primary_key: SHARED_PRIMARY_KEY,
  },
};

//  Export

export default db_structure;
