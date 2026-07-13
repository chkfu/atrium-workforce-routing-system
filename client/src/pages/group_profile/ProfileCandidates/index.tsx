import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDepartment } from '../../../redux/slices/DepartmentSlice';
import {
  SectionDetails,
  SectionEducation,
  SectionExperience,
  SectionPreference,
  SectionTestScore,
} from './elements/layout';
import Accordion from '../../../elements/Accordion';
import axios from 'axios';
import { API } from '../../../config/api';
import { ICandidate } from '../../../utils/types/redux_types';
import {
  CandidateEduContext,
  CandidateExpContext,
  CandidateTestContext,
  CandidatePrefContext,
} from './utils/context';

export default function ProfileCandidateP(): JSX.Element {
  //  remarks: identify the specific candidate profile to be viewed
  const { id } = useParams<{ id: string }>();

  //  remarks: dispatch for Redux
  const dispatch = useDispatch();

  //  remarks: local state management
  const [targetCandidate, setTargetCandidate] = useState<ICandidate | null>(null);
  const [targetCandidateEdu, setTargetCandidateEdu] = useState<any>([]);
  const [targetCandidateExp, setTargetCandidateExp] = useState<any>([]);
  const [targetCandidateTest, setTargetCandidateTest] = useState<any>(null);
  const [targetCandidatePref, setTargetCandidatePref] = useState<any>(null);
  const [getError, setGetError] = useState<any | null>(null);

  //  remarks: load departments on mount
  useEffect(() => {
    axios
      .get(API.DEPARTMENTS)
      .then((res) => {
        const departments = res.data.data.result;
        dispatch(setDepartment(departments));
      })
      .catch((err: any) => {
        console.error('[ProfileCandidate] error: fetching departments:', err);
        dispatch(setDepartment([]));
      });
  }, [dispatch]);

  //  remarks: querying candidate data from SQL
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

  //  remarks: query candidate education
  useEffect(() => {
    axios
      .get(`${API.CANDIDATES_EDU}/column-list/candidate_id/${id}`)
      .then((res) => {
        const target_list = res.data?.data?.records ?? [];
        setTargetCandidateEdu(target_list);
      })
      .catch((err: any) => {
        console.error('[ProfileCandidate] error: fetching target candidate education:', err);
        setTargetCandidateEdu([]);
      });
  }, [id]);

  //  remarks: query candidate experience
   useEffect(() => {
    axios
      .get(`${API.CANDIDATES_EXP}/column-list/candidate_id/${id}`)
      .then((res) => {
        const target_list = res.data?.data?.records ?? [];
        setTargetCandidateExp(target_list);
      })
      .catch((err: any) => {
        console.error('[ProfileCandidate] error: fetching target candidate experience:', err);
        setTargetCandidateExp([]);
      });
  }, [id]);

  //  remarks: query candidate test score
  useEffect(() => {
    axios
      .get(`${API.CANDIDATES_TEST}/column-list/candidate_id/${id}`)
      .then((res) => {
        const target_list = res.data?.data?.records ?? [];
        setTargetCandidateTest(target_list[0] || null);
      })
      .catch((err: any) => {
        console.error('[ProfileCandidate] error: fetching target candidate test score:', err);
        setTargetCandidateTest(null);
      });
  }, [id]);

  //  remarks: query candidate preference
  useEffect(() => {
    axios
      .get(`${API.CANDIDATES_PREF}/column-list/candidate_id/${id}`)
      .then((res) => {
        const target_list = res.data?.data?.records ?? [];
        setTargetCandidatePref(target_list[0] || null);
      })
      .catch((err: any) => {
        console.error('[ProfileCandidate] error: fetching target candidate preference:', err);
        setTargetCandidatePref(null);
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
                <SectionPreference />
              </Accordion>
            </div>
          </CandidatePrefContext.Provider>
        </CandidateTestContext.Provider>
      </CandidateExpContext.Provider>
    </CandidateEduContext.Provider>
  );
}
