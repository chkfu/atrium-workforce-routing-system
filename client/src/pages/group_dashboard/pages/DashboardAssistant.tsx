import DashboardCard from '../../../components/DashboardCard';
import Accordion from '../../../elements/Accordion';
import SectCardListReuse from '../elements/SectCardListReuse';
import { TCardItem } from '../../../utils/types/element_types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { STRUCTURE } from '../utils/structure';

//  Function

export default function AssistantDashboard(): JSX.Element {
  //  remarks: extract user id
  const staff_id = useSelector((state: RootState) => state.auth.user?.staff_id);

  //  remarks: declaration
  const card_list_personal = STRUCTURE.dashboard.personal.assistant(staff_id);
  const card_list_task_panel = STRUCTURE.dashboard.task_panel.assistant;

  //  remarks: display
  return (
    <section id="assistant-dashboard-section" className="px-12 py-6 flex flex-col gap-6">

      {/*  remarks: task panel  */}
      <Accordion title="Task Pending">
        {/* =============== TO BE IMPLEMENTED  ============= */}
        <p className="py-4 text-base text-gray-500">No upcoming tasks assigned.</p>
      </Accordion>

      {/*  remarks: personal panel  */}
      <SectCardListReuse title="Personal">
        {card_list_personal.map((el: TCardItem) => {
          return <DashboardCard key={el.title} title={el.title} description={el.description} url={el.path} />;
        })}
      </SectCardListReuse>

      {/*  remarks: work panel  */}
      <SectCardListReuse title="Teams">
        {card_list_task_panel.map((el: TCardItem) => {
          return <DashboardCard key={el.title} title={el.title} description={el.description} url={el.path} />;
        })}
      </SectCardListReuse>
    </section>
  );
}
