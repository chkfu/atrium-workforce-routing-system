import Accordion from '../../../../elements/Accordion';
import { FormSubsectionUpdateReuse } from './forms';
import { CandidateDetailStructure, CandidateEduStructrure, CandidateExpStructrure } from '../utils/structures';
import { BoxSubsectionCreateReuse } from '../../shared/BoxSubsectionCreateReuse';
import { useForm } from 'react-hook-form';
import { useEffect, useContext } from 'react';
import { ICandidate } from '../../../../utils/types/redux_types';
import { CandidateEduContext, CandidateExpContext } from '../utils/context';
import { UpdateCandidateSchema } from '../../../group_manage_record/ManageCandidates/utils/schema';
import { handle_candidate_details_submit } from '../utils/handlers';

//  ==========    Section: Candidate Details   ==========

//  remarks: the section container of candidate details
export function SectionDetails({
  targetCandidate,
}: {
  targetCandidate: ICandidate | null;
}): JSX.Element {
  const { reset } = useForm<ICandidate>({
    defaultValues: targetCandidate || {},
  });
  //  learnt: `reset` is used for sync the existing data
  //  remarks: set to reset data based on curr targetCandidate, if it has been updated
  useEffect(() => {
    if (targetCandidate) {
      reset(targetCandidate);
    }
  }, [targetCandidate]);

  const handleSubmit = (data: any) => {
    if (targetCandidate?._id) {
      handle_candidate_details_submit(String(targetCandidate._id), data);
    }
  };

  return (
    <Accordion title="(1) Patron Details" titleSize="text-xl">
      <FormSubsectionUpdateReuse sect_state={targetCandidate} form_schema={UpdateCandidateSchema} submit_handler={handleSubmit} form_structure={CandidateDetailStructure} form_subtitle="" />
    </Accordion>
  );
}

//  ==========    Section: Candidate Qualification    ==========

//  remarks: the section container of candidate qualification
export function SectionEducation(): JSX.Element {
  const context = useContext(CandidateEduContext);
  return (
    <Accordion title="(2) Section Qualification" titleSize="text-xl">
      <BoxSubsectionCreateReuse
        sect_state={context?.targetCandidateEdu || null}
        sect_structure={CandidateEduStructrure}
        form_title="Create New Qualification"
        form_subtitle="Add new record to educational history."
      />
    </Accordion>
  );
}


//  ==========    Section: Candidate Experience    ==========

export function SectionExperience(): JSX.Element {
  const context = useContext(CandidateExpContext);
  return (
    <Accordion title="(3) Section Experience" titleSize="text-xl">
      <BoxSubsectionCreateReuse
        sect_state={context?.targetCandidateExp || null}
        sect_structure={CandidateExpStructrure}
        form_title="Create New Work Experience"
        form_subtitle="Add new record to work history."
      />
    </Accordion>
  );
}

//  ==========    Section: Candidate Test Score   ==========

// remarks: test score
export function SectionTestScore(): JSX.Element {
  return (
    <Accordion title="(4) Section Test Score" titleSize="text-xl">
      {/*  TODO: append update form  */}
    </Accordion>
  );
}


//  ==========    Section: Candidate Preference   ==========

// remarks: preferences
export function SectionPreference(): JSX.Element {
  return (
    <Accordion title="(5) Section Preferences" titleSize="text-xl">
      {/*  TODO: append update form  */}
    </Accordion>
  );
}




