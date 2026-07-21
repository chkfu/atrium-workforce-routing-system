import DashboardCard from '../../components/DashboardCard';
import Accordion from '../../elements/Accordion';
import { TCardItem } from '../../utils/types/element_types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { HREF } from '../../config/href';

//  Function

export default function CandidateDashboard(): JSX.Element {
  //  remarks: extract user id
  const candidate_id = useSelector((state: RootState) => state.auth.user?.candidate_id);

  //  remarks: declaration
  const card_list_personal: TCardItem[] = [
    {
      title: 'View Profile',
      description: 'View and update your personal information and profile.',
      path: candidate_id != null ? HREF.CANDIDATES_PROFILE(String(candidate_id)) : '',
    },
  ];
  const card_list_task_panel: TCardItem[] = [
    {
      title: 'View Progress',
      description: 'Monitor your application status and task assignments.',
      path: '/#',
    },
  ];

  //  remarks: display
  return (
    <section id="candidate-dashboard-section" className="px-12 py-6 flex flex-col gap-6">
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
