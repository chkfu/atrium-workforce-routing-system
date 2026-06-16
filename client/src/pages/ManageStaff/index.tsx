import { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '../../elements/Accordion';
import LoadSpinner from '../../elements/LoadSpinner';
import { API } from '../../config/api';
import { StaffContext } from './utils/context';
import { PanelFromContainer } from './elements/layout';
import { useSearchParams } from 'react-router-dom';

//  remarks: main page for manage Staff
export default function ManageStaff(): JSX.Element {
  //  search params
  const [searchParams, setSearchParams] = useSearchParams();

  //  hooks

  //  1. GET
  //  1a. receive general data
  const [staff, setStaff] = useState<any[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
  //  1b. receive pagination data
  const [totalPage, setTotalPage] = useState<number>(1);
  //  1c. receive sorted data
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [sortTarget, setSortTarget] = useState<string>('_id');
  const [triggerSort, setTriggerSort] = useState<boolean>(false);
  //  1d. receive filtered data
  const [triggerFilter, setTriggerFilter] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>('');
  const [filterGender, setFilterGender] = useState<string>('');
  const [filterPosition, setFilterPosition] = useState<string>('');
  const [filterDepartment, setFilterDepartment] = useState<string>('');
  const [filterGrade, setFilterGrade] = useState<string>('');
  const [filterEmail, setFilterEmail] = useState<string>('');
  const [filterExtension, setFilterExtension] = useState<string>('');
  const [filterDeptId, setFilterDeptId] = useState<string | null>(null);
  const [filterDateHiredFrom, setFilterDateHiredFrom] = useState<string>('');
  const [filterDateHiredTo, setFilterDateHiredTo] = useState<string>('');
  const [filterDateQuitFrom, setFilterDateQuitFrom] = useState<string>('');
  const [filterDateQuitTo, setFilterDateQuitTo] = useState<string>('');
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
    const filter_gender = searchParams.get('filter_gender');
    const filter_department = searchParams.get('filter_department');
    const filter_position = searchParams.get('filter_position');
    const filter_grade = searchParams.get('filter_grade');
    const filter_email = searchParams.get('filter_email');
    const filter_extension = searchParams.get('filter_ext');
    const filter_dept_id = searchParams.get('filter_dept_id');
    const filter_date_hired_from = searchParams.get('filter_date_hired_from');
    const filter_date_hired_to = searchParams.get('filter_date_hired_to');
    const filter_date_quit_from = searchParams.get('filter_date_quit_from');
    const filter_date_quit_to = searchParams.get('filter_date_quit_to');
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
    if (filter_gender) params.filter_gender = filter_gender;
    if (filter_department) params.filter_department = filter_department;
    if (filter_position) params.filter_position = filter_position;
    if (filter_grade) params.filter_grade = filter_grade;
    if (filter_email) params.filter_email = filter_email;
    if (filter_extension) params.filter_ext = filter_extension;
    if (filter_dept_id) params.filter_dept_id = filter_dept_id;
    if (filter_date_hired_from)
      params.filter_date_hired_from = filter_date_hired_from;
    if (filter_date_hired_to)
      params.filter_date_hired_to = filter_date_hired_to;
    if (filter_date_quit_from)
      params.filter_date_quit_from = filter_date_quit_from;
    if (filter_date_quit_to) params.filter_date_quit_to = filter_date_quit_to;
    if (filter_is_active) params.filter_is_active = filter_is_active;
    if (filter_created_from) params.filter_created_from = filter_created_from;
    if (filter_created_to) params.filter_created_to = filter_created_to;
    if (filter_updated_from) params.filter_updated_from = filter_updated_from;
    if (filter_updated_to) params.filter_updated_to = filter_updated_to;

    //  remarks: getting data by querying database
    axios
      .get(API.STAFF, {
        params,
      })
      .then((res) => {
        const StaffEls = res.data.data.result;
        const totalPages = res.data.data.total_pages;
        console.log('[DEBUG] Response:', {
          count: StaffEls.length,
          totalPages,
          data: res.data,
        });
        setStaff(StaffEls);
        setTotalPage(totalPages);
        setIsGetting(false);
      })
      .catch((err: any) => {
        console.error('[ManageStaff] error: fetching Staff:', err);
        // learnt: state change for re-render, as throw error did not trigger
        setStaff([]);
        setGetError(err.message || '[ManageStaff] error: Failed to load Staff');
        setIsGetting(false);
      });
  }, [searchParams.toString()]);
  //  loading spinner for pending status
  if (isGetting && !isInitialised) {
    return <LoadSpinner />;
  }
  //  error handling
  if (getError) {
    return <div className='p-4 text-red-600'>Error: {getError}</div>;
  }

  //  display
  return (
    <div
      id='manage-Staff-container'
      className='w-full'
    >
      <Accordion title='Staff List'>
        <StaffContext.Provider
          value={{
            //  1.  GET

            //  1a. receive general data
            staff,
            setStaff,
            selectedStaff,
            setSelectedStaff,
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
            filterGender,
            setFilterGender,
            filterDepartment,
            setFilterDepartment,
            filterPosition,
            setFilterPosition,
            filterGrade,
            setFilterGrade,
            filterEmail,
            setFilterEmail,
            filterExtension,
            setFilterExtension,
            filterDeptId,
            setFilterDeptId,
            filterDateHiredFrom,
            setFilterDateHiredFrom,
            filterDateHiredTo,
            setFilterDateHiredTo,
            filterDateQuitFrom,
            setFilterDateQuitFrom,
            filterDateQuitTo,
            setFilterDateQuitTo,
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
        </StaffContext.Provider>
      </Accordion>
    </div>
  );
}
