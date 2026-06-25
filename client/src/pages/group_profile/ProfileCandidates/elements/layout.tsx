import Accordion from '../../../../elements/Accordion';
import { FormCandidateDetails, FormCandidateEducation } from './forms';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useContext } from 'react';
import { ICandidate } from '../../../../utils/types/redux_types';
import { CandidateEduContext } from '../utils/context';
import { ButtonCandidateTrigger } from './buttons';


//  ==========    section: candidate details   ==========

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
    <Accordion
      title='(1) Patron Details'
      titleSize='text-xl'
    >
      <FormCandidateDetails targetCandidate={targetCandidate} />
    </Accordion>
  );
}

//  ==========    section: candidate qualification    ==========

//  remarks: the section container of candidate qualification
export function SectionEducation(): JSX.Element {
  //  remarks: display
  return (
    <Accordion
      title='(2) Section Qualification'
      titleSize='text-xl'
    >
      <BoxCreateCandidateEdu />
    </Accordion>
  );
}


function BoxCreateCandidateEdu(): JSX.Element {
  const [triggerCreateForm, setTriggerCreateForm] = useState<boolean>(false);
  const context = useContext(CandidateEduContext);
  return (
    <div className='flex flex-col'>
      <div className='flex justify-end mt-4'>
        <ButtonCandidateTrigger
          triggerCreateForm={triggerCreateForm}
          setTriggerCreateForm={setTriggerCreateForm}
        />
      </div>
      {triggerCreateForm && <FormCandidateEducation targetCandidateEdu={context?.targetCandidateEdu || null} setTriggerCreateForm={setTriggerCreateForm} />}
    </div>
  );
}


//  ==========    section: candidate experience    ==========

export function SectionExperience(): JSX.Element {
  return (
    <Accordion
      title='(3) Section Experience'
      titleSize='text-xl'
    >
      Section Experience
    </Accordion>
  );
}

// remarks: experience
export function SectionTestScore(): JSX.Element {
  return (
    <Accordion
      title='(4) Section Test Score'
      titleSize='text-xl'
    >
      Test Scores
    </Accordion>
  );
}
