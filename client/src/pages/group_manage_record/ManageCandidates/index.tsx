import { useState, useEffect } from 'react';
import { setCandidates } from '../../../redux/slices/CandidateSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Accordion from '../../../elements/Accordion';
import LoadSpinner from '../../../elements/LoadSpinner';
import { API } from '../../../config/api';
import { CandidateContext } from './utils/context';
import { PanelFromContainer } from './elements/layout';
import { useSearchParams } from 'react-router-dom';
import { enum_gender, enum_prob_status } from '../../../utils/types/page_enums';

//  remarks: main page for manage candidates
export default function ManageCandidates(): JSX.Element {
  //  search params
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  //  hooks

  //  1. GET
  //  1a. receive general data
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  //  1b. receive pagination data
  const [totalPage, setTotalPage] = useState<number>(1);
  //  1c. receive sorted data
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [sortTarget, setSortTarget] = useState<string>('_id');
  const [triggerSort, setTriggerSort] = useState<boolean>(false);
  //  1d. receive filtered data
  const [triggerFilter, setTriggerFilter] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>('');
  const [filterEmail, setFilterEmail] = useState<string>('');
  const [filterGender, setFilterGender] = useState<enum_gender | null>(null);
  const [filterProbStatus, setFilterProbStatus] = useState<enum_prob_status | null>(null);
  const [filterIsActive, setFilterIsActive] = useState<boolean | null>(null);
  const [filterCreatedFrom, setFilterCreatedFrom] = useState<string>('');
  const [filterCreatedTo, setFilterCreatedTo] = useState<string>('');
  const [filterUpdatedFrom, setFilterUpdatedFrom] = useState<string>('');
  const [filterUpdatedTo, setFilterUpdatedTo] = useState<string>('');

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
    const filter_name = searchParams.get('filter_name');
    const filter_email = searchParams.get('filter_email');
    const filter_gender = searchParams.get('filter_gender');
    const filter_prob_status = searchParams.get('filter_prob_status');
    const filter_is_active = searchParams.get('filter_is_active');
    const filter_created_from = searchParams.get('filter_created_from');
    const filter_created_to = searchParams.get('filter_created_to');
    const filter_updated_from = searchParams.get('filter_updated_from');
    const filter_updated_to = searchParams.get('filter_updated_to');

    const params: Record<string, any> = {
      page,
      limit,
      sort_target,
      sort_order,
    };

    if (filter_name) params.filter_name = filter_name;
    if (filter_email) params.filter_email = filter_email;
    if (filter_gender) params.filter_gender = filter_gender;
    if (filter_prob_status) params.filter_prob_status = filter_prob_status;
    if (filter_is_active) params.filter_is_active = filter_is_active;
    if (filter_created_from) params.filter_created_from = filter_created_from;
    if (filter_created_to) params.filter_created_to = filter_created_to;
    if (filter_updated_from) params.filter_updated_from = filter_updated_from;
    if (filter_updated_to) params.filter_updated_to = filter_updated_to;

    //  remarks: getting data by querying database
    const fetch_candidates = async() => ( await axios
      .get(API.CANDIDATES, {
        params,
      })
      .then((res) => {
        const candidateEls = res.data.data.result;
        const totalPages = res.data.data.total_pages;
        dispatch(setCandidates(candidateEls));
        setTotalPage(totalPages);
        setIsGetting(false);
      })
      .catch((err: any) => {
        console.error('[ManageCandidates] error: fetching candidates:', err);
        // learnt: state change for re-render, as throw error did not trigger
        dispatch(setCandidates([]));
        setGetError(err.message || '[ManageCandidates] error: Failed to load candidates');
        setIsGetting(false);
      }))
      fetch_candidates()

  }, [searchParams.toString()]);
  //  loading spinner for pending status
  if (isGetting && !isInitialised) {
    return <LoadSpinner />;
  }
  //  error handling
  if (getError) {
    return <div className="p-4 text-red-600">Error: {getError}</div>;
  }

  //  display
  return (
    <div id="manage-candidates-container" className="w-full">
      <Accordion title="Candidate List">
        <CandidateContext.Provider
          value={{
            //  1.  GET

            //  1a. receive general data
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
            triggerFilter,
            setTriggerFilter,
            filterName,
            setFilterName,
            filterEmail,
            setFilterEmail,
            filterGender,
            setFilterGender,
            filterProbStatus,
            setFilterProbStatus,
            filterIsActive,
            setFilterIsActive,
            filterCreatedFrom,
            setFilterCreatedFrom,
            filterCreatedTo,
            setFilterCreatedTo,
            filterUpdatedFrom,
            setFilterUpdatedFrom,
            filterUpdatedTo,
            setFilterUpdatedTo,

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
