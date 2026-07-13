import Accordion from '../../../../elements/Accordion';
import { FormSubsectionUpdateReuse } from '../../../../elements/forms/FormSubsectionUpdateReuse';
import {
  CandidateDetailStructure,
  CandidateEduStructure,
  CandidateExpStructure,
  CandidateTestStructure,
  getCandidatePrefStructure,
} from '../utils/structures';
import { BoxSubsectionCreateReuse } from '../../../../elements/forms/BoxSubsectionCreateReuse';
import { useContext } from 'react';
import {
  ICandidate,
  ICandidateEdu,
  ICandidateExp,
  IDepartment,
} from '../../../../utils/types/redux_types';
import {
  CandidateEduContext,
  CandidateExpContext,
  CandidateTestContext,
  CandidatePrefContext,
  useProfileCandidateContext,
} from '../utils/context';
import { UpdateCandidateSchema } from '../../../group_manage_record/ManageCandidates/utils/schema';
import {
  create_candidate_subsection,
  handle_candidate_details_submit,
  update_candidate_subsection,
} from '../utils/handlers';
import {
  UpdateCandidateEduSchema,
  UpdateCandidateExpSchema,
  UpdateCandidateTestSchema,
  UpdateCandidatePrefSchema,
} from '../utils/schema';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useParams } from 'react-router-dom';
import { API } from '../../../../config/api';

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
export function SectionEducation(): JSX.Element {
   //  remarks: extract candidate id from params
  const { id: candidate_id } = useParams();
  //  remarks: extract data from context
  //  learnt: `userPofileCandidateContext` hook refers only one record, requries to get the record list and spread out
    const context = useContext(CandidateEduContext);

  //  remarks: submission handler
  const handle_create_submit = async (data: any) => {
    if (!candidate_id) return false;
    return await create_candidate_subsection(
      'CandidateEdu',
      API.CANDIDATES_EDU,
      candidate_id,
      data
    );
  };
  const handle_update_submit = async (data: any) => {
    if (!candidate_id) return false;
    return await update_candidate_subsection(
      'CandidateEdu',
      API.CANDIDATES_EDU,
      candidate_id,
      data
    );
  };
  //  remakrs: display
  return (
    <Accordion title="(3) Qualification" titleSize="text-xl">
      {/*  remarks: (1) create form in extendable container */}
      <BoxSubsectionCreateReuse
        sect_state={null}
        sect_structure={CandidateEduStructure}
        submit_handler={handle_create_submit}
        form_title="Create New Qualification"
        form_subtitle="Add new record to qualification."
        form_schema={UpdateCandidateEduSchema}
      />
      {/*  remarks: (2) update forms listed with decending order  */}
      <div>
        {context?.targetCandidateEdu
          .sort((a: ICandidateEdu, b: ICandidateEdu) => {
            return new Date(b.year_issued).getTime() - new Date(a.year_issued).getTime();
          })
          .map((el: ICandidateEdu, index: number) => {
            return (
              <FormSubsectionUpdateReuse
                key={el._id}
                sect_state={{
                  ...el,
                  date_start: el.year_issued ? String(el.year_issued).slice(0, 10) : '',
                  date_end: el.year_issued ? String(el.year_issued).slice(0, 10) : '',
                  is_verified: String(el.is_verified),
                }}
                form_schema={UpdateCandidateEduSchema}
                submit_handler={handle_update_submit}
                form_structure={CandidateEduStructure}
                form_title={`Edit Qualification Record (${index + 1})`}
              />
            );
          })}
      </div>
    </Accordion>
  );
}

//  ==========    Section: Candidate Experience    ==========

export function SectionExperience(): JSX.Element {
  //  remarks: extract candidate id from params
  const { id: candidate_id } = useParams();
  //  remarks: extract data from context
  //  learnt: `userPofileCandidateContext` hook refers only one record, requries to get the record list and spread out
    const context = useContext(CandidateExpContext)

  //  remarks: submission handler
  const handle_create_submit = async (data: any) => {
    if (!candidate_id) return false;
    return await create_candidate_subsection(
      'CandidateExp',
      API.CANDIDATES_EXP,
      candidate_id,
      data
    );
  };
  const handle_update_submit = async (data: any) => {
    if (!candidate_id) return false;
    return await update_candidate_subsection(
      'CandidateExp',
      API.CANDIDATES_EXP,
      candidate_id,
      data
    );
  };
  //  remakrs: display
  return (
    <Accordion title="(3) Experience" titleSize="text-xl">
      {/*  remarks: (1) create form in extendable container */}
      <BoxSubsectionCreateReuse
        sect_state={null}
        sect_structure={CandidateExpStructure}
        submit_handler={handle_create_submit}
        form_title="Create New Work Experience"
        form_subtitle="Add new record to work history."
        form_schema={UpdateCandidateExpSchema}
      />
      {/*  remarks: (2) update forms listed with decending order  */}
      <div>
        {context?.targetCandidateExp
          .sort((a: ICandidateExp, b: ICandidateExp) => {
            return new Date(b.date_start).getTime() - new Date(a.date_start).getTime();
          })
          .map((el: ICandidateExp, index: number) => {
            return (
              <FormSubsectionUpdateReuse
                key={el._id}
                sect_state={{
                  ...el,
                  date_start: el.date_start ? String(el.date_start).slice(0, 10) : '',
                  date_end: el.date_end ? String(el.date_end).slice(0, 10) : '',
                  is_verified: String(el.is_verified),
                }}
                form_schema={UpdateCandidateExpSchema}
                submit_handler={handle_update_submit}
                form_structure={CandidateExpStructure}
                form_title={`Edit Experience Record (${index + 1})`}
              />
            );
          })}
      </div>
    </Accordion>
  );
}

//  ==========    Section: Candidate Test Score   ==========

// remarks: test score
export function SectionTestScore(): JSX.Element {
  //  remarks: extract candidate id from params
  const { id: candidate_id } = useParams();
  //  remarks: get context data
  const { targetCandidateTest } = useProfileCandidateContext('CandidateTest', CandidateTestContext);

  const handle_submit = async (data: any) => {
    if (candidate_id) {
      await update_candidate_subsection('CandidateTest', API.CANDIDATES_TEST, candidate_id, data);
    }
  };

  //  remarks: temp state for interface
  const temp_test_state = targetCandidateTest && {
    ...targetCandidateTest,
    score_aptitude:
      targetCandidateTest.score_aptitude === null ? '' : String(targetCandidateTest.score_aptitude),
    score_interview_1st:
      targetCandidateTest.score_interview_1st === null
        ? ''
        : String(targetCandidateTest.score_interview_1st),
    score_interview_2nd:
      targetCandidateTest.score_interview_2nd === null
        ? ''
        : String(targetCandidateTest.score_interview_2nd),
  };

  return (
    <Accordion title="(4) Test Score" titleSize="text-xl">
      <FormSubsectionUpdateReuse
        key={targetCandidateTest?._id}
        sect_state={temp_test_state}
        form_schema={UpdateCandidateTestSchema}
        submit_handler={handle_submit}
        form_structure={CandidateTestStructure}
        form_title="Update Test Score"
        form_subtitle="Review the test score for enrolling the selection."
      />
    </Accordion>
  );
}

//  ==========    Section: Candidate Preference   ==========

// remarks: preferences - get departments from Redux (fetched in parent), get pref data from Context
export function SectionPreference(): JSX.Element {
  //  remarks: extract candidate id from params
  const { id: candidate_id } = useParams();

  //  remarks: get context data
  const { targetCandidatePref } = useProfileCandidateContext('CandidatePref', CandidatePrefContext);

  //  reamrks: updated departments list for preference options
  const departments: IDepartment[] = useSelector((state: RootState) => state.department.value);

  //  remarks: form submission handler
  const handle_submit = async (data: any) => {
    if (candidate_id) {
      await update_candidate_subsection('CandidatePref', API.CANDIDATES_PREF, candidate_id, data);
    }
  };

  //  remarks: temp state for interface
  const temp_pref_state = targetCandidatePref && {
    ...targetCandidatePref,
    pref_dept_1st:
      targetCandidatePref.pref_dept_1st === null ? '' : String(targetCandidatePref.pref_dept_1st),
    pref_dept_2nd:
      targetCandidatePref.pref_dept_2nd === null ? '' : String(targetCandidatePref.pref_dept_2nd),
    pref_dept_3rd:
      targetCandidatePref.pref_dept_3rd === null ? '' : String(targetCandidatePref.pref_dept_3rd),
  };

  return (
    <Accordion title="(5) Preferences" titleSize="text-xl">
      <FormSubsectionUpdateReuse
        key={targetCandidatePref?._id}
        sect_state={temp_pref_state}
        form_schema={UpdateCandidatePrefSchema}
        submit_handler={handle_submit}
        form_structure={getCandidatePrefStructure(departments)}
        form_title="Update Preferences"
        form_subtitle="Select the first three options for enrolling the selection."
      />
    </Accordion>
  );
}
