import { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '../../elements/Accordion';
import LoadSpinner from '../../elements/LoadSpinner';
import { API } from '../../config/api';
import { CandidateContext } from './utils/context';
import { PanelFromContainer } from './elements/layout';
import { useSearchParams } from 'react-router-dom';

//  remarks: main page for manage candidates
export default function ManageCandidates(): JSX.Element {
  //  search params
  const [searchParams, setSearchParams] = useSearchParams();
  //  hooks
  //  0. pagination
  const [totalPage, setTotalPage] = useState<number>(1);
  //  1. loading
  const [isInitialised, setIsInitialised] = useState<boolean>(false);
  const [isGetting, setIsGetting] = useState<boolean>(true);
  const [getError, setGetError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  //  2. checkbox, search, filter, sort and pagination
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [filtered, setFiltered] = useState<boolean>(false);
  //  2a. sorting
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [tempSortAsc, setTempSortAsc] = useState<boolean>(true);
  const [sortTarget, setSortTarget] = useState<string>('_id');
  const [tempSortTarget, setTempSortTarget] = useState<string>('_id');
  const [triggerSort, setTriggerSort] = useState<boolean>(false);
  //  2. get: all
  const [candidates, setCandidates] = useState<any[]>([]);
  //  3. create: all
  const [triggerCreate, setTriggerCreate] = useState<boolean>(false);
  //  4. update: all
  const [triggerUpdate, setTriggerUpdate] = useState<boolean>(false);
  const [updateDetails, setUpdateDetails] = useState<any>(null);
  //  5. update: convert
  const [triggerConvert, setTriggerConvert] = useState<boolean>(false);
  const [convertStatus, setConvertStatus] = useState<boolean | null>(null);

  useEffect(() => {
    console.log(
      '[DEBUG] Initial mount - current searchParams:',
      searchParams.toString(),
    );
    setSearchParams((prev) => {
      if (!prev.get('page')) {
        prev.set('page', '1');
      }
      if (!prev.get('limit')) {
        prev.set('limit', '20');
      }
      console.log('[DEBUG] After init set:', prev.toString());
      return prev;
    });
  }, []);

  useEffect(() => {
    //  remarks: use for trigger re-rendering
    setIsGetting(true);
    setGetError(null);
    //  remarks: get data
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';
    console.log('[DEBUG] Sending request:', {
      page,
      limit,
      sortTarget,
      sortAsc,
    });
    axios
      .get(API.CANDIDATES, {
        params: {
          page,
          limit,
          sortTarget,
          sortAsc,
        },
      })
      .then((res) => {
        const candidateEls = res.data.data.result;
        const totalPages = res.data.data.total_pages;
        console.log('[DEBUG] Response:', {
          count: candidateEls.length,
          totalPages,
          data: res.data,
        });
        setCandidates(candidateEls);
        setTotalPage(totalPages);
        setIsGetting(false);
      })
      .catch((err: any) => {
        console.error('[ManageCandidates] error: fetching candidates:', err);
        setGetError(
          err.message || '[ManageCandidates] error: Failed to load candidates',
        );
        setIsGetting(false);
      });
  }, [searchParams.toString(), sortTarget, sortAsc]);
  //  loading spinner for pending status
  if (isGetting && !isInitialised) {
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
            //  get state
            candidates,
            setCandidates,
            selectedCandidates,
            setSelectedCandidates,
            // create state
            isCreating,
            setIsCreating,
            triggerCreate,
            setTriggerCreate,
            // update state
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
            //  sorting
            sortTarget,
            tempSortTarget,
            setSortTarget,
            setTempSortTarget,
            sortAsc,
            tempSortAsc,
            setSortAsc,
            setTempSortAsc,
            triggerSort,
            setTriggerSort,
            //  filtering
            filtered,
            setFiltered,
            //  pagination
            totalPage,
            setTotalPage,
            //  loading state
            isInitialised,
            setIsInitialised,
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
