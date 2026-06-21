import Accordion from '../../../../elements/Accordion';
import { FormCandidateDetails } from './forms';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ICandidate } from '../../../../utils/types/redux_types';

// remarks: candidate detials
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

// remarks: Education
export function SectionEducation(): JSX.Element {
  return (
    <Accordion
      title='(2) Section Qualification'
      titleSize='text-xl'
    >
      Qualification
    </Accordion>
  );
}

// remarks: experience
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
