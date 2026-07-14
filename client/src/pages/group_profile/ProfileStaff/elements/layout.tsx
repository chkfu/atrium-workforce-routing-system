import Accordion from '../../../../elements/Accordion';
import { FormSubsectionUpdateReuse } from '../../../../elements/forms/FormSubsectionUpdateReuse';
import { getStaffDetailStructure } from '../utils/structure';
import { handle_staff_details_submit } from '../utils/handlers';
import { UpdateStaffSchema } from '../../../group_manage_record/ManageStaff/utils/schema';
import { IStaff, IDepartment } from '../../../../utils/types/redux_types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

//  ==========    Section: Staff Details   ==========

//  remarks: the section container of staff details
export function SectionDetails({
  targetStaff,
}: {
  targetStaff: IStaff | null;
}): JSX.Element {
  //  reamrks: departments list for the department select options
  const departments: IDepartment[] = useSelector((state: RootState) => state.department.value);

  const handleSubmit = (data: any) => {
    if (targetStaff?._id) {
      handle_staff_details_submit(String(targetStaff._id), data);
    }
  };

  return (
    <Accordion title="(1) Staff Details" titleSize="text-xl">
      <FormSubsectionUpdateReuse
        key={targetStaff?._id}
        sect_state={targetStaff}
        form_schema={UpdateStaffSchema}
        submit_handler={handleSubmit}
        form_structure={getStaffDetailStructure(departments)}
        form_subtitle=""
      />
    </Accordion>
  );
}