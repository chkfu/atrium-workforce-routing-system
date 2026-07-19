

export const HREF = {
  //  Public Access
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',

  //  remarks: authentication
  LOGIN: '/login',
  FORGET_PASSWORD: '/forget-password',
  RESET_PASSWORD: '/reset-password/:token',

  //  remakrs: dashboards, by role
  CANDIDATE_DASHBOARD: '/candidate-dashboard',
  ASSISTANT_DASHBOARD: '/assistant-dashboard',
  MANAGER_DASHBOARD: '/manager-dashboard',

  //  remarks: group List, by permissions
  MANAGE_CANDIDATES: '/manage-candidates',
  MANAGE_STAFF: '/manage-staff',
  MANAGE_DEPARTMENTS: '/manage-departments',

  //  remarks: single page, by id
  //  learnt: use the funciton, enable to insert id for detection
  CANDIDATES_PROFILE: (id: string) => `/candidates-profile/${id}`,
  STAFF_PROFILE: (id: string) => `/staff-profile/${id}`,
  DEPARTMENT_PROFILE: (id: string) => `/department-profile/${id}`,

  //  remarks: route patterns for single page, by id
  //  used in router config, where the id is a placeholder rather than a value
  CANDIDATES_PROFILE_ROUTE: '/candidates-profile/:id',
  STAFF_PROFILE_ROUTE: '/staff-profile/:id',
  DEPARTMENT_PROFILE_ROUTE: '/department-profile/:id',
};
