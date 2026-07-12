import Accordion from '../../../../elements/Accordion';
import { FormSubsectionUpdateReuse } from '../../../../elements/forms/FormSubsectionUpdateReuse';
import {
  CandidateDetailStructure,
  CandidateEduStructrure,
  CandidateExpStructrure,
  CandidateTestStructrure,
  getCandidatePrefStructure
} from '../utils/structures';
import { BoxSubsectionCreateReuse } from '../../../../elements/forms/BoxSubsectionCreateReuse';
import { useContext } from 'react';
import { ICandidate, ICandidateEdu, ICandidatePref, ICandidateTest, IDepartment } from '../../../../utils/types/redux_types';
import { CandidateEduContext, CandidateExpContext } from '../utils/context';
import { UpdateCandidateSchema } from '../../../group_manage_record/ManageCandidates/utils/schema';
import { handle_candidate_details_submit, handle_candidate_pref_submit } from '../utils/handlers';
import { UpdateCandidateEduSchema, UpdateCandidateExpSchema, UpdateCandidateTestSchema, UpdateCandidatePrefSchema } from '../utils/schema';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useParams } from 'react-router-dom';

//  ==========    Section: Candidate Details   ==========

//  remarks: the section container of candidate details
export function SectionDetails({
  targetCandidate,
}: {
  targetCandidate: ICandidate | null;
}): JSX.Element {

  const handleSubmit = (data: any) => {
    if (targetCandidate?._id) {
      handle_candidate_details_submit(String(targetCandidate._id), data);
    }
  };

  return (
    <Accordion title="(1) Patron Details" titleSize="text-xl">
      <FormSubsectionUpdateReuse
        key={targetCandidate?._id}
        sect_state={targetCandidate}
        form_schema={UpdateCandidateSchema}
        submit_handler={handleSubmit}
        form_structure={CandidateDetailStructure}
        form_subtitle=""
      />
    </Accordion>
  );
}

//  ==========    Section: Candidate Qualification    ==========

//  remarks: the section container of candidate qualification
export function SectionEducation({ targetCandidateEdu }: { targetCandidateEdu: ICandidateEdu | null; }): JSX.Element {
  const context = useContext(CandidateEduContext);
  return (
    <Accordion title="(2) Qualification" titleSize="text-xl">
      <BoxSubsectionCreateReuse
        sect_state={context?.targetCandidateEdu || null}
        sect_structure={CandidateEduStructrure}
        form_title="Create New Qualification"
        form_subtitle="Add new record to educational history."
      />
      {/*  ===============================  */}
      {/*  TODO: display exisiting results  */}
      {/*  ===============================  */}
    </Accordion>
  );
}

//  ==========    Section: Candidate Experience    ==========

export function SectionExperience({ targetCandidateExp }: { targetCandidateExp: ICandidateEdu | null; }): JSX.Element {
  const context = useContext(CandidateExpContext);
  return (
    <Accordion title="(3) Experience" titleSize="text-xl">
      <BoxSubsectionCreateReuse
        sect_state={context?.targetCandidateExp || null}
        sect_structure={CandidateExpStructrure}
        form_title="Create New Work Experience"
        form_subtitle="Add new record to work history."
      />
      {/*  ===============================  */}
      {/*  TODO: display exisiting results  */}
      {/*  ===============================  */}
    </Accordion>
  );
}

//  ==========    Section: Candidate Test Score   ==========

// remarks: test score
export function SectionTestScore({
  targetCandidateTest,
}: {
  targetCandidateTest: ICandidateTest | null;
}): JSX.Element {

  //  remarks: extract candidate id from params
  const { id } = useParams();

  const handleSubmit = (data: any) => {
    if (targetCandidateTest?._id) {
      //  TODO: to be follo-up
    }
  };

  return (
    <Accordion title="(4) Test Score" titleSize="text-xl">
      <FormSubsectionUpdateReuse
        key={targetCandidateTest?._id}
        sect_state={targetCandidateTest}
        form_schema={UpdateCandidateTestSchema}
        submit_handler={handleSubmit}
        form_structure={CandidateTestStructrure}
        form_subtitle=""
      />
    </Accordion>
  );
}

//  ==========    Section: Candidate Preference   ==========

// remarks: preferences - get departments from Redux (fetched in parent), get pref data from Context
export function SectionPreference({
  targetCandidatePref,
}: {
  targetCandidatePref: ICandidatePref | null;
}): JSX.Element {

  //  remarks: extract candidate id from params
  const { id: candidate_id } = useParams();

  //  reamrks: updated departments list for preference options
  const departments: IDepartment[] = useSelector((state: RootState) => state.department.value);

  //  remarks: form submission handler
  const handleSubmit = async (data: any) => {
    if (candidate_id) {
      await handle_candidate_pref_submit(candidate_id, data)
    }
  };

  //  remarks: temp state for interface
  const temp_pref_state = targetCandidatePref && {
    ...targetCandidatePref,
    pref_dept_1st: targetCandidatePref.pref_dept_1st === null ? '' : String(targetCandidatePref.pref_dept_1st),
    pref_dept_2nd: targetCandidatePref.pref_dept_2nd === null ? '' : String(targetCandidatePref.pref_dept_2nd),
    pref_dept_3rd: targetCandidatePref.pref_dept_3rd === null ? '' : String(targetCandidatePref.pref_dept_3rd),
  };

  return (
    <Accordion title="(5) Preferences" titleSize="text-xl">
      <FormSubsectionUpdateReuse
        key={targetCandidatePref?._id}
        sect_state={temp_pref_state}
        form_schema={UpdateCandidatePrefSchema}
        submit_handler={handleSubmit}
        form_structure={getCandidatePrefStructure(departments)}
        form_title='Update Preferences'
        form_subtitle='Select the first three options for enrolling the selection'
      />
    </Accordion>
  );
}