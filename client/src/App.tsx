import { useRoutes, RouteObject } from 'react-router-dom';
import Home from './pages/group_navigation/Home';
import About from './pages/group_navigation/About';
import Contact from './pages/group_navigation/Contact';
import Layout from './components/Layout';
import Login from './pages/group_auth/Login';
import Error from './pages/group_navigation/Error';
import DashboardCandidate from './pages/group_dashboard/DashboardCandidate';
import DashboardAssistant from './pages/group_dashboard/DashboardAssistant';
import DashboardManager from './pages/group_dashboard/DashboardManager';
import ManageCandidates from './pages/group_manage_record/ManageCandidates'
import ManageStaff from './pages/group_manage_record/ManageStaff';
import ManageDepartments from './pages/group_manage_record/ManageDepartments';
import ProfileCandidates from './pages/group_profile/ProfileCandidates';


const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      //  Public Access
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      //  Group List, by permissions
      {
        path: '/manage-candidates',
        element: <ManageCandidates />,
      },
      {
        path: '/manage-staff',
        element: <ManageStaff />,
      },
      {
        path: '/manage-departments',
        element: <ManageDepartments />,
      },
      //  Single page, sepecified by id
      {
        path: '/candidates-profile/:id',
        element: <ProfileCandidates />,
      },
      //  Dashboards, by role positions
      {
        path: '/candidate-dashboard',
        element: <DashboardCandidate />,
      },
      {
        path: '/assistant-dashboard',
        element: <DashboardAssistant />,
      },
      {
        path: '/manager-dashboard',
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
