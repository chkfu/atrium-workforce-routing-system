import DashboardCard from '../../components/DashboardCard';
import Accordion from '../../elements/Accordion';
import { TCardItem } from '../../utils/types/element_types';

//  Types

//  Declaration

const card_list_personal: TCardItem[] = [
  {
    title: 'View Profile',
    description: 'View and update your personal information and profile.',
    path: '/me/staff-profile',
  },
];

const card_list_task_panel: TCardItem[] = [
  {
    title: 'Manage Candidates',
    description: 'Manage and review candidate applications',
    path: '/manage-candidates',
  },
];

//  Function

export default function AssistantDashboard(): JSX.Element {
  //  visualise
  return (
    <section id="assistant-dashboard-section" className="px-12 py-6 flex flex-col gap-6">
      <Accordion title="Task Pending">
        {/* =============== TO BE IMPLEMENTED  ============= */}
        <p className="py-4 text-base text-gray-500">No upcoming tasks assigned.</p>
      </Accordion>
      <Accordion title="Personal">
        {/* personal section */}
        {card_list_personal.map((el: TCardItem) => {
          return <DashboardCard title={el.title} description={el.description} url={el.path} />;
        })}
      </Accordion>{' '}
      {/*  work panel */}
      <Accordion title="Teams">
        {card_list_task_panel.map((el: TCardItem) => {
          return <DashboardCard title={el.title} description={el.description} url={el.path} />;
        })}
      </Accordion>
    </section>
  );
}
