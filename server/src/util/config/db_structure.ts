//  Shared configuration

const SHARED_PRIMARY_KEY: string = '_id';

//  Body

const db_structure = {
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
};

//  Export

export default db_structure;
