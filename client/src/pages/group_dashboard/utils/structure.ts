import { TCardItem } from '../../../utils/types/element_types';
import { HREF } from '../../../config/href';

//  Director Dashboard

export const director_card_list_personal = (staff_id?: number | null): TCardItem[] => [
  {
    title: 'View Profile',
    description: 'View and update your personal information and profile.',
    path: staff_id != null ? HREF.STAFF_PROFILE(String(staff_id)) : '',
  },
];

export const director_card_list_task_panel: TCardItem[] = [
  {
    title: 'Manage Staff',
    description: 'Oversee and manage all staff members and their roles',
    path: '/manage-staff',
  },
  {
    title: 'Manage Departments',
    description: 'Configure and manage organizational departments',
    path: '/manage-departments',
  },
  {
    title: 'Manage Weighting',
    description: 'Set scoring weights and evaluation criteria',
    path: '/#',
  },
  {
    title: 'Manage Strategies',
    description: 'Define and manage recruitment strategies',
    path: '/#',
  },
];

//  Manager Dashboard

export const manager_card_list_personal = (staff_id?: number | null): TCardItem[] => [
  {
    title: 'View Profile',
    description: 'View and update your personal information and profile.',
    path: staff_id != null ? HREF.STAFF_PROFILE(String(staff_id)) : '',
  },
];

export const manager_card_list_task_panel: TCardItem[] = [
  {
    title: 'Manage Candidates',
    description: 'Review and manage candidate applications and profiles',
    path: '/manage-candidates',
  },
  {
    title: 'Manage Staff',
    description: 'Manage staff members and their assignments',
    path: '/manage-staff',
  },
  {
    title: 'Manage Departments',
    description: 'Organize and manage department information',
    path: '/manage-departments',
  },
];

//  Assistant Dashboard

export const assistant_card_list_personal = (staff_id?: number | null): TCardItem[] => [
  {
    title: 'View Profile',
    description: 'View and update your personal information and profile.',
    path: staff_id != null ? HREF.STAFF_PROFILE(String(staff_id)) : '',
  },
];

export const assistant_card_list_task_panel: TCardItem[] = [
  {
    title: 'Manage Candidates',
    description: 'Manage and review candidate applications',
    path: '/manage-candidates',
  },
];

//  Candidate Dashboard

export const candidate_card_list_personal = (candidate_id?: number | null): TCardItem[] => [
  {
    title: 'View Profile',
    description: 'View and update your personal information and profile.',
    path: candidate_id != null ? HREF.CANDIDATES_PROFILE(String(candidate_id)) : '',
  },
];

export const candidate_card_list_task_panel: TCardItem[] = [
  {
    title: 'View Progress',
    description: 'Monitor your application status and task assignments.',
    path: '/#',
  },
];
