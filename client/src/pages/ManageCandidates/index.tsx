import { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '../../elements/Accordion';
import LoadSpinner from '../../elements/LoadSpinner';
import { API } from '../../config/api';
import { CandidateContext } from './utils/context';
import { PanelFromContainer } from './elements/layout';
import { handle_update_submit } from './utils/handlers';

//  remarks: main page for manage candidates
export default function ManageCandidates(): JSX.Element {
  //  hooks
  //  1. interface handling
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isGetting, setIsGetting] = useState<boolean>(true);
  const [getError, setGetError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  //  2. get: all
  const [candidates, setCandidates] = useState<any[]>([]);
  //  3. update: all
  const [triggerUpdate, setTriggerUpdate] = useState<boolean>(false);
  const [updateDetails, setUpdateDetails] = useState<any>(null);
  //  4. update: convert
  const [triggerConvert, setTriggerConvert] = useState<boolean>(false);
  const [convertStatus, setConvertStatus] = useState<boolean | null>(null);

  useEffect(() => {
    axios
      .get(API.CANDIDATES)
      .then((response) => {
        const cadidateEls = response.data.data.result;
        setCandidates(cadidateEls);
        setIsGetting(false);
      })
      .catch((err: any) => {
        console.error('[ManageCandidates] error: fetching candidates:', err);
        setGetError(
          err.message || '[ManageCandidates] error: Failed to load candidates',
        );
        setIsGetting(false);
      });
  }, []);
  //  loading state
  if (isGetting) {
    return <LoadSpinner />;
  }
  //  error handling
  if (getError) {
    return <div className='p-4 text-red-600'>Error: {getError}</div>;
  }
  if (candidates.length === 0) {
    return <div className='p-4 text-gray-500'>No candidates found</div>;
  }
  //  display
  return (
    <div
      id='manage-candidates-container'
      className='w-full'
    >
      <Accordion title='Candidate List'>
        <CandidateContext.Provider
          value={{
            candidates,
            setCandidates,
            selectedCandidates,
            setSelectedCandidates,
            updateDetails,
            setUpdateDetails,
            isUpdating,
            setIsUpdating,
            triggerUpdate,
            setTriggerUpdate,
            convertStatus,
            setConvertStatus,
            triggerConvert,
            setTriggerConvert,
            isGetting,
            setIsGetting,
            isConverting,
            setIsConverting,
            searchText,
            setSearchText,
          }}
        >
          <PanelFromContainer />
        </CandidateContext.Provider>
      </Accordion>
    </div>
  );
}
