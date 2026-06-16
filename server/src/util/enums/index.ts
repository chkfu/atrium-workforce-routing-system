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

//  Extract enum values for validation arrays (keeps enum and array in sync)
export const enum_gender_obj = Object.values(enum_gender);
export const enum_grade_obj = Object.values(enum_staff_grade);
export const enum_user_role_obj = Object.values(enum_user_role);
export const enum_prob_status_obj = Object.values(enum_prob_status);
export const enum_hire_decision_obj = Object.values(enum_hire_decision);
