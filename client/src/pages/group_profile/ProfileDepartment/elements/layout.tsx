import Accordion from '../../../../elements/Accordion';
import { FormSubsectionUpdateReuse } from '../../../../elements/forms/FormSubsectionUpdateReuse';
import { DeptStructure, SelectCriteriaStructure } from '../utils/structure';
import { handle_dept_details_submit, handle_select_criteria_submit } from '../utils/handlers';
import { IDepartment } from '../../../../utils/types/redux_types';
import { CreateDepartmentSchema } from '../../../group_manage_record/ManageDepartments/utils/schema';
import { ISelectCriteria } from '../../../../utils/types/redux_types';
import { UpdateSelectCriteriaSchema } from '../utils/schema';
//  ==========    Section: Dept Details   ==========



//  remarks: the section container of Dept details
export function SectionDetails({
  targetDept,
  setIsLoading
}: {
  targetDept: IDepartment | null;
  setIsLoading: (prev: boolean) => void;
}): JSX.Element {

  //  remarks: submission handler
    const handleSubmit = (data: any) => {
    if (targetDept?._id) {
        return handle_dept_details_submit(String(targetDept._id), data, setIsLoading);
      }
    };

  //  remarks: display
  return (
    <Accordion title="Department Details" titleSize="text-xl">
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

//  ==========    Section: Select Criteria  ==========

export function SectionSelectCriteria({
  targetDept,
  selectCriteria,
  setIsLoading
}: {
  targetDept: IDepartment | null;
  selectCriteria: ISelectCriteria | null;
  setIsLoading: (isLoading: boolean) => void;
}): JSX.Element{

  //  remarks: submission handler
    const handleSubmit = (data: any) => {
    if (targetDept?._id) {
        return handle_select_criteria_submit(String(targetDept._id), data, setIsLoading);
      }
    };

  return (
     <Accordion title="Selection Criteria" titleSize="text-xl">
        <FormSubsectionUpdateReuse
        key={selectCriteria?._id}
        sect_state={selectCriteria}
        form_schema={UpdateSelectCriteriaSchema}
        submit_handler={handleSubmit}
        form_structure={SelectCriteriaStructure}
        form_subtitle="Please provide the criteria for selecting candidates."
      />
     </Accordion>
  )
}