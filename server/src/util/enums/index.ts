export enum enum_gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export enum enum_staff_grade {
  pending = 'pending',
  grade_1_assistant = 'grade_1_assistant',
  grade_2_manager = 'grade_2_manager',
  grade_3_executive = 'grade_3_executive',
}

export enum enum_user_role {
  candidate = 'candidate',
  grade_1_assistant = 'grade_1_assistant',
  grade_2_manager = 'grade_2_manager',
  grade_3_executive = 'grade_3_executive',
  sys_admin = 'sys_admin',
}

export enum enum_prob_status {
  selecting = 'selecting',
  training = 'training',
  completed = 'completed',
  postponed = 'postponed',
  withdrawn = 'withdrawn',
  failed = 'failed',
}

export enum enum_hire_decision {
  approved = 'approved',
  rejected = 'rejected',
  deferred = 'deferred',
}
