import { useRoutes, RouteObject } from 'react-router-dom';
import Home from './pages/group_navigation/Home';
import About from './pages/group_navigation/About';
import Contact from './pages/group_navigation/Contact';
import Layout from './components/Layout';
import Login from './pages/group_auth/pages/Login';
import ForgetPassword from './pages/group_auth/pages/ForgetPassword'
import ResetPassword from './pages/group_auth/pages/ResetPassword';
import Error from './pages/group_navigation/Error';
import DashboardCandidate from './pages/group_dashboard/DashboardCandidate';
import DashboardAssistant from './pages/group_dashboard/DashboardAssistant';
import DashboardManager from './pages/group_dashboard/DashboardManager';
import ManageCandidates from './pages/group_manage_record/ManageCandidates';
import ManageStaff from './pages/group_manage_record/ManageStaff';
import ManageDepartments from './pages/group_manage_record/ManageDepartments';
import ProfileCandidates from './pages/group_profile/ProfileCandidates';
import ProfileStaff from './pages/group_profile/ProfileStaff';
import ProfileDepartment from './pages/group_profile/ProfileDepartment';
import { HREF } from './config/href';

const routes: RouteObject[] = [
  {
    path: HREF.LOGIN,
    element: <Login />,
  },
   {
    path: HREF.FORGET_PASSWORD,
    element: <ForgetPassword />,
  },
  {
    path: HREF.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    element: <Layout />,
    children: [
      //  Public Access
      {
        path: HREF.HOME,
        element: <Home />,
      },
      {
        path: HREF.ABOUT,
        element: <About />,
      },
      {
        path: HREF.CONTACT,
        element: <Contact />,
      },
      //  Group List, by permissions
      {
        path: HREF.MANAGE_CANDIDATES,
        element: <ManageCandidates />,
      },
      {
        path: HREF.MANAGE_STAFF,
        element: <ManageStaff />,
      },
      {
        path: HREF.MANAGE_DEPARTMENTS,
        element: <ManageDepartments />,
      },

      //  Single page, sepecified by id
      {
        path: HREF.CANDIDATES_PROFILE_ROUTE,
        element: <ProfileCandidates />,
      },
      {
        path: HREF.STAFF_PROFILE_ROUTE,
        element: <ProfileStaff />,
      },
      {
        path: HREF.DEPARTMENT_PROFILE_ROUTE,
        element: <ProfileDepartment />,
      },

      //  Dashboards, by role positions
      {
        path: HREF.CANDIDATE_DASHBOARD,
        element: <DashboardCandidate />,
      },
      {
        path: HREF.ASSISTANT_DASHBOARD,
        element: <DashboardAssistant />,
      },
      {
        path: HREF.MANAGER_DASHBOARD,
        element: <DashboardManager />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
];

export default function App() {
  return useRoutes(routes);
}
