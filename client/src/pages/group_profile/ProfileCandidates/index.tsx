import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  SectionDetails,
  SectionEducation,
  SectionExperience,
  SectionTestScore,
} from './elements/layout';
import Accordion from '../../../elements/Accordion';
import axios from 'axios';
import { API } from '../../../config/api';
import { ICandidate, ICandidateEdu } from '../../../utils/types/redux_types';
import {
  CandidateEduContext,
  CandidateExpContext,
  CandidateTestContext,
  CandidatePrefContext,
} from './utils/context';

export default function ProfileCandidateP(): JSX.Element {
  //  remarks: identify the specific candidate profile to be viewed
  const { id } = useParams<{ id: string }>();

  //  remarks: local state management
  const [targetCandidate, setTargetCandidate] = useState<ICandidate | null>(null);
  const [targetCandidateEdu, setTargetCandidateEdu] = useState<ICandidateEdu | null>(null);
  const [targetCandidateExp, setTargetCandidateExp] = useState<any>(null);
  const [targetCandidateTest, setTargetCandidateTest] = useState<any>(null);
  const [targetCandidatePref, setTargetCandidatePref] = useState<any>(null);
  const [getError, setGetError] = useState<any | null>(null);

  //  remarks: querying data from SQL
  //  (1) section: candidate details
  useEffect(() => {
    axios
      .get(`${API.CANDIDATES}/${id}`)
      .then((res) => {
        const data = res.data.data.record;
        setTargetCandidate(data);
      })
      .catch((err: any) => {
        console.error('[ProfileCandidate] error: fetching targert candidate:', err);
        // remarks: state change for re-render
        setTargetCandidate(null);
        setGetError(err.message || '[ProfileCandidate] error: Failed to load candidates');
      });
  }, [id]);

  return (
    <CandidateEduContext.Provider value={{ targetCandidateEdu, setTargetCandidateEdu }}>
      <CandidateExpContext.Provider value={{ targetCandidateExp, setTargetCandidateExp }}>
        <CandidateTestContext.Provider value={{ targetCandidateTest, setTargetCandidateTest }}>
          <CandidatePrefContext.Provider value={{ targetCandidatePref, setTargetCandidatePref }}>
            <div id="candidate-profile-container">
              <Accordion title="Candidate Profile">
                <SectionDetails targetCandidate={targetCandidate} />
                <SectionEducation />
                <SectionExperience />
                <SectionTestScore />
              </Accordion>
            </div>
          </CandidatePrefContext.Provider>
        </CandidateTestContext.Provider>
      </CandidateExpContext.Provider>
    </CandidateEduContext.Provider>
  );
}
