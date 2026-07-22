import DashboardCard from '../../../components/DashboardCard';
import SectCardListReuse from '../elements/SectCardListReuse';
import { TCardItem } from '../../../utils/types/element_types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  candidate_card_list_personal,
  candidate_card_list_task_panel,
} from '../utils/structure';

//  Function

export default function CandidateDashboard(): JSX.Element {
  //  remarks: extract user id
  const candidate_id = useSelector((state: RootState) => state.auth.user?.candidate_id);

  //  remarks: declaration
  const card_list_personal = candidate_card_list_personal(candidate_id);
  const card_list_task_panel = candidate_card_list_task_panel;

  //  remarks: display
  return (
    <section id="candidate-dashboard-section" className="px-12 py-6 flex flex-col gap-6">
      
      {/*  remarks: personal panel  */}
      <SectCardListReuse title="Personal">
        {card_list_personal.map((el: TCardItem) => {
          return <DashboardCard key={el.title} title={el.title} description={el.description} url={el.path} />;
        })}
      </SectCardListReuse>

      {/*  remarks: work panel  */}
      <SectCardListReuse title="Task Panel">
        {card_list_task_panel.map((el: TCardItem) => {
          return <DashboardCard key={el.title} title={el.title} description={el.description} url={el.path} />;
        })}
      </SectCardListReuse>
    </section>
  );
}
