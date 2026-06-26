import Accordion from '../../../../elements/Accordion';
import { FormCandidateDetails, FormSectionCreateReuse } from './forms';
import { CandidateEduStructrure, CandidateExpStructrure, CandidateTestStructrure, getCandidatePrefStructrure } from '../utils/structures';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useContext } from 'react';
import { ICandidate } from '../../../../utils/types/redux_types';
import { CandidateEduContext, CandidateExpContext, CandidateTestContext, CandidatePrefContext } from '../utils/context';
import { ButtonCandidateTrigger } from './buttons';
import { useSelector } from 'react-redux';

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

  return (
    <Accordion title="(1) Patron Details" titleSize="text-xl">
      <FormCandidateDetails targetCandidate={targetCandidate} />
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
  const context = useContext(CandidateTestContext);
  return (
    <Accordion title="(4) Section Test Score" titleSize="text-xl">
      {/*  TODO: append update form  */}
    </Accordion>
  );
}


//  ==========    Section: Candidate Preference   ==========

// remarks: preferences
export function SectionPreference(): JSX.Element {
  const context = useContext(CandidatePrefContext);
  const departments = useSelector((state: any) => state.department.value);
  return (
    <Accordion title="(5) Section Preferences" titleSize="text-xl">
      {/*  TODO: append update form  */}
    </Accordion>
  );
}


//  ==========    Section: Reuse Component   ==========
 
function BoxSubsectionCreateReuse<T extends Record<string, any> = any>({
  sect_state,
  sect_structure,
  form_title,
  form_subtitle,
  form_schema,
}: {
  sect_state: T | null;
  sect_structure: Record<string, any>;
  form_title: string;
  form_subtitle: string;
  form_schema?: any;
}): JSX.Element {
  const [triggerCreateForm, setTriggerCreateForm] = useState<boolean>(false);
  return (
    <div className="flex flex-col">
      <div className="flex justify-end mt-4">
        <ButtonCandidateTrigger
          triggerCreateForm={triggerCreateForm}
          setTriggerCreateForm={setTriggerCreateForm}
        />
      </div>
      {triggerCreateForm && (
        <FormSectionCreateReuse
          sect_state={sect_state}
          form_trigger={setTriggerCreateForm}
          form_title={form_title}
          form_subtitle={form_subtitle}
          form_structure={sect_structure}
          form_schema={form_schema}
        />
      )}
    </div>
  );
}





