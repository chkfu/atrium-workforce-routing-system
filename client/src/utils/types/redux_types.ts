import { enum_gender, enum_prob_status, enum_staff_role } from './page_enums'

//  candidates

export interface ICandidate {
  _id: number
  first_name: string
  last_name: string
  gender: enum_gender
  email: string
  prob_status: enum_prob_status
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface ICandidateList {
  value: ICandidate[]
}


//  staff

export interface IStaff{
  _id: number
  first_name: string
  last_name: string
  gender: enum_gender
  work_position: string
  work_grade: enum_staff_role
  work_email: string
  work_ext: string
  dept_id: number
  date_hired: string
  date_quit: string
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface IStaffList {
  value: IStaff[]
}


//  departments

export interface IDepartment{
  _id: number
  dept_name: string
  dept_capacity: number
  importance_weight: number
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface IDepartmentList {
  value: IDepartment[]
}