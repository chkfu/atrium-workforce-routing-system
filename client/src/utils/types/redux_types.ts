import { enum_gender, enum_prob_status } from './page_enums'

export interface ICandidate {
  id: number
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