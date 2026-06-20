import DashboardCard from '../../components/DashboardCard';
import Accordion from '../../elements/Accordion';
import { TCardItem } from '../../utils/types/element_types';

//  Declaration

const card_list_personal: TCardItem[] = [
  {
    title: 'View Profile',
    description: 'View and update your personal information and profile.',
    path: '/me/candidate-profile',
  },
];

const card_list_task_panel: TCardItem[] = [
  {
    title: 'View Progress',
    description: 'Monitor your application status and task assignments.',
    path: '/#',
  },
];

//  Function

export default function CandidateDashboard(): JSX.Element {
  //  visualise
  return (
    <section
      id='candidate-dashboard-section'
      className='px-12 py-6 flex flex-col gap-6'
    >
      {/* personal section */}
      {card_list_personal.map((el: TCardItem) => {
        return (
          <Accordion title='Personal'>
            <DashboardCard
              title={el.title}
              description={el.description}
              url={el.path}
            />
          </Accordion>
        );
      })}

      {/*  work panel */}
      {card_list_task_panel.map((el: TCardItem) => {
        return (
          <Accordion title='Task Panel'>
            <DashboardCard
              title={el.title}
              description={el.description}
              url={el.path}
            />
          </Accordion>
        );
      })}
    </section>
  );
}
