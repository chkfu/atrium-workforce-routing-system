import { enum_user_role } from '../enums';

//  learnt: setup ranking system for role permission
export const ROLE_RANK: Record<enum_user_role, number> = {
  [enum_user_role.candidate]: 0,
  [enum_user_role.grade_1_assistant]: 1,
  [enum_user_role.grade_2_manager]: 2,
  [enum_user_role.grade_3_executive]: 3,
  [enum_user_role.sys_admin]: 4,
}