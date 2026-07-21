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
import axios from 'axios';

//  ==========    Section: Candidate Details   ==========

//  remarks: the section container of candidate details
export function SectionDetails({
  targetCandidate,
}: {
  targetCandidate: ICandidate | null;
}): JSX.Element {
  //  remarks: a candidate self-editing their own profile may not touch staff-only administrative fields
  const curr_user_role = useSelector((state: RootState) => state.auth.user?.user_role);
  const is_self_service = curr_user_role === 'candidate';

  const form_structure = is_self_service
    ? Object.fromEntries(
        Object.entries(CandidateDetailStructure).filter(
          ([key]) => key !== 'prob_status' && key !== 'is_active',
        ),
      )
    : CandidateDetailStructure;

  const handleSubmit = (data: any) => {
    if (targetCandidate?._id) {
      const { prob_status, is_active, ...self_payload } = data;
      handle_candidate_details_submit(
        String(targetCandidate._id),
        is_self_service ? self_payload : data,
      );
    }
  };

  return (
    <Accordion title="Patron Details" titleSize="text-xl">
      <FormSubsectionUpdateReuse
        key={targetCandidate?._id}
        sect_state={targetCandidate}
        form_schema={UpdateCandidateSchema}
        submit_handler={handleSubmit}
        form_structure={form_structure}
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
  //  remarks: a candidate self-editing their own qualification may not touch staff-only verification/activation fields
  const curr_user_role = useSelector((state: RootState) => state.auth.user?.user_role);
  const is_self_service = curr_user_role === 'candidate';
  const form_structure = is_self_service
    ? Object.fromEntries(
        Object.entries(CandidateEduStructure).filter(
          ([key]) => key !== 'is_verified' && key !== 'is_active',
        ),
      )
    : CandidateEduStructure;

  //  remarks: submission handler
  const handle_create_submit = async (data: any) => {
    if (!candidate_id) return false;

    const { is_verified, is_active, ...self_payload } = data;
    const is_created = await create_candidate_subsection(
      'CandidateEdu',
      API.CANDIDATES_EDU,
      candidate_id,
      is_self_service ? self_payload : data
    );
    if (!is_created) return false;

    //  remarks: fetch the updated list, so the new record shows up right away
    const res = await axios.get(`${API.CANDIDATES_EDU}/column-list/candidate_id/${candidate_id}`);
    context?.setTargetCandidateEdu(res.data.data.records);
    return true;
  };
  const handle_update_submit = async (data: any) => {
    if (!candidate_id) return false;
    const { is_verified, is_active, ...self_payload } = data;
    return await update_candidate_subsection(
      'CandidateEdu',
      API.CANDIDATES_EDU,
      candidate_id,
      is_self_service ? self_payload : data
    );
  };
  //  remarks: delete an existing qualification record, then refresh the list
  const handle_delete = async (record_id: string) => {
    if (!candidate_id) return;

    try {
      await axios.delete(API.CANDIDATES_EDU, { data: { _ids: [String(record_id)] } });

      const res = await axios.get(`${API.CANDIDATES_EDU}/column-list/candidate_id/${candidate_id}`);
      context?.setTargetCandidateEdu(res.data.data.records);
    } catch (err: any) {
      alert(`[CandidateEdu] error: ${err.response?.data?.message || err.message}`);
    }
  };
  //  remakrs: display
  return (
    <Accordion title="Qualification" titleSize="text-xl">
      {/*  remarks: (1) create form in extendable container */}
      <BoxSubsectionCreateReuse
        sect_state={null}
        sect_structure={form_structure}
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
                form_structure={form_structure}
                form_title={`Edit Qualification Record (${index + 1})`}
                on_delete={() => handle_delete(String(el._id))}
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
  //  remarks: a candidate self-editing their own experience may not touch staff-only verification/activation fields
  const curr_user_role = useSelector((state: RootState) => state.auth.user?.user_role);
  const is_self_service = curr_user_role === 'candidate';
  const form_structure = is_self_service
    ? Object.fromEntries(
        Object.entries(CandidateExpStructure).filter(
          ([key]) => key !== 'is_verified' && key !== 'is_active',
        ),
      )
    : CandidateExpStructure;

  //  remarks: submission handler
  const handle_create_submit = async (data: any) => {
    if (!candidate_id) return false;

    const { is_verified, is_active, ...self_payload } = data;
    const is_created = await create_candidate_subsection(
      'CandidateExp',
      API.CANDIDATES_EXP,
      candidate_id,
      is_self_service ? self_payload : data
    );
    if (!is_created) return false;

    //  remarks: fetch the updated list, so the new record shows up right away
    const res = await axios.get(`${API.CANDIDATES_EXP}/column-list/candidate_id/${candidate_id}`);
    context?.setTargetCandidateExp(res.data.data.records);
    return true;
  };
  const handle_update_submit = async (data: any) => {
    if (!candidate_id) return false;
    const { is_verified, is_active, ...self_payload } = data;
    return await update_candidate_subsection(
      'CandidateExp',
      API.CANDIDATES_EXP,
      candidate_id,
      is_self_service ? self_payload : data
    );
  };
  //  remarks: delete an existing experience record, then refresh the list
  const handle_delete = async (record_id: string) => {
    if (!candidate_id) return;

    try {
      await axios.delete(API.CANDIDATES_EXP, { data: { _ids: [String(record_id)] } });

      const res = await axios.get(`${API.CANDIDATES_EXP}/column-list/candidate_id/${candidate_id}`);
      context?.setTargetCandidateExp(res.data.data.records);
    } catch (err: any) {
      alert(`[CandidateExp] error: ${err.response?.data?.message || err.message}`);
    }
  };
  //  remakrs: display
  return (
    <Accordion title="Experience" titleSize="text-xl">
      {/*  remarks: (1) create form in extendable container */}
      <BoxSubsectionCreateReuse
        sect_state={null}
        sect_structure={form_structure}
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
                form_structure={form_structure}
                form_title={`Edit Experience Record (${index + 1})`}
                on_delete={() => handle_delete(String(el._id))}
              />
            );
          })}
      </div>
    </Accordion>
  );
}

//  ==========    Section: Candidate Test Score   ==========

// remarks: test score
export function SectionTestScore(): JSX.Element | null {
  //  remarks: extract candidate id from params
  const { id: candidate_id } = useParams();
  //  remarks: get context data
  const { targetCandidateTest } = useProfileCandidateContext('CandidateTest', CandidateTestContext);
  //  remarks: candidate should not see their own test score
  const user_role = useSelector((state: RootState) => state.auth.user?.user_role);

  const handle_submit = async (data: any) => {
    if (candidate_id) {
      await update_candidate_subsection('CandidateTest', API.CANDIDATES_TEST, candidate_id, data);
    }
  };

  if (user_role === 'candidate') {
    return null;
  }

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
    <Accordion title="Test Score" titleSize="text-xl">
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
  //  remarks: a candidate self-editing their own preferences may not touch the staff-only activation field
  const curr_user_role = useSelector((state: RootState) => state.auth.user?.user_role);
  const is_self_service = curr_user_role === 'candidate';
  const pref_structure = is_self_service
    ? Object.fromEntries(
        Object.entries(getCandidatePrefStructure(departments)).filter(
          ([key]) => key !== 'is_active',
        ),
      )
    : getCandidatePrefStructure(departments);

  //  remarks: form submission handler
  const handle_submit = async (data: any) => {
    if (candidate_id) {
      const { is_active, ...self_payload } = data;
      await update_candidate_subsection(
        'CandidatePref',
        API.CANDIDATES_PREF,
        candidate_id,
        is_self_service ? self_payload : data,
      );
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
    <Accordion title="Preferences" titleSize="text-xl">
      <FormSubsectionUpdateReuse
        key={targetCandidatePref?._id}
        sect_state={temp_pref_state}
        form_schema={UpdateCandidatePrefSchema}
        submit_handler={handle_submit}
        form_structure={pref_structure}
        form_title="Update Preferences"
        form_subtitle="Select the first three options for enrolling the selection."
      />
    </Accordion>
  );
}
