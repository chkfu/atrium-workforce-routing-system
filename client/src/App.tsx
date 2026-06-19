import { useRoutes, RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Login from './pages/Login';
import Error from './pages/Error';
import ManageCandidates from './pages/ManageCandidates';
import ManageStaff from './pages/ManageStaff';
import ManageDepartments from './pages/ManageDepartments';
import ProfileCandidates from './pages/ProfileCandidates';
import CandidateDashboard from './pages/CandidateDashboard';
import AssistantDashboard from './pages/AssistantDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import About from './pages/About';
import Contact from './pages/Contact';

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
        element: <CandidateDashboard />,
      },
      {
        path: '/assistant-dashboard',
        element: <AssistantDashboard />,
      },
      {
        path: '/manager-dashboard',
        element: <ManagerDashboard />,
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
