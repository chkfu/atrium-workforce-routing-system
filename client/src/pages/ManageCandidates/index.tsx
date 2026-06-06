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

  //  1. GET
  //  1a. receive general data
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  //  1b. receive pagination data
  const [totalPage, setTotalPage] = useState<number>(1);
  //  1c. receive sorted data
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [sortTarget, setSortTarget] = useState<string>('_id');
  const [triggerSort, setTriggerSort] = useState<boolean>(false);
  //  1d. receive filtered data

  //  2. POST
  //  2a. create new records
  const [triggerCreate, setTriggerCreate] = useState<boolean>(false);

  //  3. PATCH
  //  3a. update general details
  const [updateDetails, setUpdateDetails] = useState<any>(null);
  const [triggerUpdate, setTriggerUpdate] = useState<boolean>(false);

  //  3b. update active status
  const [convertStatus, setConvertStatus] = useState<boolean | null>(null);
  const [triggerConvert, setTriggerConvert] = useState<boolean>(false);

  //  4. TEMP STATE
  const [isInitialised, setIsInitialised] = useState<boolean>(false);
  const [isGetting, setIsGetting] = useState<boolean>(true);
  const [getError, setGetError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  useEffect(() => {
    console.log(
      '[DEBUG] Initial mount - current searchParams:',
      searchParams.toString(),
    );
    setSearchParams((prev) => {
      if (!prev.get('page')) prev.set('page', '1');
      if (!prev.get('limit')) prev.set('limit', '20');
      if (!prev.get('sort_target')) prev.set('sort_target', '_id');
      if (!prev.get('sort_order')) prev.set('sort_order', 'true');
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
    const sort_target = searchParams.get('sort_target') || '_id';
    const sort_order = searchParams.get('sort_order') === 'true';
    console.log('[DEBUG] Sending request:', {
      page,
      limit,
      sort_target,
      sort_order,
    });

    //  remarks: getting data by querying database
    axios
      .get(API.CANDIDATES, {
        params: {
          page,
          limit,
          sort_target,
          sort_order,
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
            //  1.  GET

            //  1a. receive general data
            candidates,
            setCandidates,
            selectedCandidates,
            setSelectedCandidates,
            //  1b. receive pagination data
            totalPage,
            setTotalPage,
            //  1c. receive sorted data
            sortTarget,
            setSortTarget,
            sortAsc,
            setSortAsc,
            triggerSort,
            setTriggerSort,
            //  1d. receive filted data

            //  2. POST
            //  2a. create new records
            triggerCreate,
            setTriggerCreate,

            //  3. PATCH
            //  3a. update general details
            updateDetails,
            setUpdateDetails,
            triggerUpdate,
            setTriggerUpdate,
            //  3b. update active status
            convertStatus,
            setConvertStatus,
            triggerConvert,
            setTriggerConvert,

            //  4. TEMP STATE
            isInitialised,
            setIsInitialised,
            isGetting,
            setIsGetting,
            isCreating,
            setIsCreating,
            isUpdating,
            setIsUpdating,
            isConverting,
            setIsConverting,
          }}
        >
          <PanelFromContainer />
        </CandidateContext.Provider>
      </Accordion>
    </div>
  );
}
