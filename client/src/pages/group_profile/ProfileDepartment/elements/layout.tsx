import Accordion from '../../../../elements/Accordion';
import { FormSubsectionUpdateReuse } from '../../../../elements/forms/FormSubsectionUpdateReuse';
import { DeptStructure } from '../utils/structure';
import { handle_dept_details_submit } from '../utils/handlers';
import { IDepartment } from '../../../../utils/types/redux_types';
import { CreateDepartmentSchema } from '../../../group_manage_record/ManageDepartments/utils/schema';

//  ==========    Section: Dept Details   ==========

//  remarks: the section container of Dept details
export function SectionDetails({
  targetDept,
}: {
  targetDept: IDepartment | null;
}): JSX.Element {

  //  remarks: submission handler
    const handleSubmit = (data: any) => {
    if (targetDept?._id) {
        handle_dept_details_submit(String(targetDept._id), data);
      }
    };
  
    //  remarks: state managerment
    // const [targetSelectCriteria, setTargetSelectCriteria] = useState<any>(null)

  //  remarks: display
  return (
    <Accordion title="(1) Dept Details" titleSize="text-xl">
      <FormSubsectionUpdateReuse
        key={targetDept?._id}
        sect_state={targetDept}
        form_schema={CreateDepartmentSchema}
        submit_handler={handleSubmit}
        form_structure={DeptStructure}
        form_subtitle=""
      />
    </Accordion>
  );
}