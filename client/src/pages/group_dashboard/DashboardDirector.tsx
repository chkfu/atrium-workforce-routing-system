import DashboardCard from '../../components/DashboardCard';
import Accordion from '../../elements/Accordion';
import { TCardItem } from '../../utils/types/element_types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { HREF } from '../../config/href';

//  Function

export default function DirectorDashboard(): JSX.Element {
  //  remarks: extract user id
  const staff_id = useSelector((state: RootState) => state.auth.user?.staff_id);

  //  remarks: declaration
  const card_list_personal: TCardItem[] = [
    {
      title: 'View Profile',
      description: 'View and update your personal information and profile.',
      path: staff_id != null ? HREF.STAFF_PROFILE(String(staff_id)) : '',
    },
  ];
  const card_list_task_panel: TCardItem[] = [
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

  //   remarks: display
  return (
    <section id="director-dashboard-section" className="px-12 py-6 flex flex-col gap-6">
      {/* personal section */}
      {card_list_personal.map((el: TCardItem) => {
        return (
          <Accordion title="Personal">
            <DashboardCard title={el.title} description={el.description} url={el.path} />
          </Accordion>
        );
      })}

      {/*  work panel */}
      {card_list_task_panel.map((el: TCardItem) => {
        return (
          <Accordion title="Task Panel">
            <DashboardCard title={el.title} description={el.description} url={el.path} />
          </Accordion>
        );
      })}
    </section>
  );
}
