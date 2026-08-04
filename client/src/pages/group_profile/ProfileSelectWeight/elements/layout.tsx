import Accordion from '../../../../elements/Accordion';
import { FormSubsectionUpdateReuse } from '../../../../elements/forms/FormSubsectionUpdateReuse';
import { SelectWeightStructure } from '../utils/structure';
import { handle_dept_details_submit } from '../utils/handlers';
import { ISelectWeight } from '../../../../utils/types/redux_types';
import { CreateSelectWeightSchema } from '../../../group_manage_record/ManageSelectWeight/utils/schema';
//  ==========    Section: Dept Details   ==========



//  remarks: the section container of Dept details
export function SectionDetails({
  targetSelectWeight,
  setIsLoading
}: {
  targetSelectWeight: ISelectWeight | null;
  setIsLoading: (prev: boolean) => void;
}): JSX.Element {

  //  remarks: submission handler
    const handleSubmit = (data: any) => {
    if (targetSelectWeight?._id) {
        return handle_dept_details_submit(String(targetSelectWeight._id), data, setIsLoading);
      }
    };

  //  remarks: display
  return (
    <Accordion title="Selection Weight Details" titleSize="text-xl">
      <FormSubsectionUpdateReuse
        key={targetSelectWeight?._id}
        sect_state={targetSelectWeight}
        form_schema={CreateSelectWeightSchema}
        submit_handler={handleSubmit}
        form_structure={SelectWeightStructure}
        form_subtitle=""
      />
    </Accordion>
  );
}
