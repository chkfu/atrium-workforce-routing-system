import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDepartment } from '../../../redux/slices/DepartmentSlice';
import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Accordion from '../../../elements/Accordion';
import LoadSpinner from '../../../elements/LoadSpinner';
import { API } from '../../../config/api';
import { DepartmentContext } from './utils/context';
import { PanelFromContainer } from './elements/layout';
import { useSearchParams } from 'react-router-dom';

//  remarks: main page for manage Department
export default function ManageDepartment(): JSX.Element {
  //  search params
  const [searchParams, setSearchParams] = useSearchParams();

  //  hooks
  const dispatch: Dispatch = useDispatch();

  //  1. GET
  //  1a. receive general data
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  //  1b. receive pagination data
  const [totalPage, setTotalPage] = useState<number>(1);
  //  1c. receive sorted data
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [sortTarget, setSortTarget] = useState<string>('_id');
  const [triggerSort, setTriggerSort] = useState<boolean>(false);
  //  1d. receive filtered data
  const [triggerFilter, setTriggerFilter] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>('');
  const [filterCapacityFrom, setFilterCapacityFrom] = useState<number>(0);
  const [filterCapacityTo, setFilterCapacityTo] = useState<number>(0);
  const [filterWeightFrom, setFilterWeightFrom] = useState<number>(0);
  const [filterWeightTo, setFilterWeightTo] = useState<number>(0);
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
    const filter_capacity_from = searchParams.get('filter_capacity_from');
    const filter_capacity_to = searchParams.get('filter_capacity_to');
    const filter_weight_from = searchParams.get('filter_weight_from');
    const filter_weight_to = searchParams.get('filter_weight_to');
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
    if (filter_capacity_from) params.filter_capacity_from = filter_capacity_from;
    if (filter_capacity_to) params.filter_capacity_to = filter_capacity_to;
    if (filter_weight_from) params.filter_weight_from = filter_weight_from;
    if (filter_weight_to) params.filter_weight_to = filter_weight_to;
    if (filter_is_active) params.filter_is_active = filter_is_active;
    if (filter_created_from) params.filter_created_from = filter_created_from;
    if (filter_created_to) params.filter_created_to = filter_created_to;
    if (filter_updated_from) params.filter_updated_from = filter_updated_from;
    if (filter_updated_to) params.filter_updated_to = filter_updated_to;

    //  remarks: getting data by querying database
    axios
      .get(API.DEPARTMENTS, {
        params,
      })
      .then((res) => {
        const DepartmentEls = res.data.data.result;
        const totalPages = res.data.data.total_pages;
        dispatch(setDepartment(DepartmentEls));
        setTotalPage(totalPages);
        setIsGetting(false);
      })
      .catch((err: any) => {
        console.error('[ManageDepartment] error: fetching Department:', err);
        // learnt: state change for re-render, as throw error did not trigger
        dispatch(setDepartment([]));
        setGetError(
          err.message || '[ManageDepartment] error: Failed to load Department',
        );
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
      id='manage-department-container'
      className='w-full'
    >
      <Accordion title='Department List'>
        <DepartmentContext.Provider
          value={{
            //  1.  GET

            //  1a. receive general data
            selectedDepartments,
            setSelectedDepartments,
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
            filterCapacityFrom,
            setFilterCapacityFrom,
            filterCapacityTo,
            setFilterCapacityTo,
            filterWeightFrom,
            setFilterWeightFrom,
            filterWeightTo,
            setFilterWeightTo,
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
        </DepartmentContext.Provider>
      </Accordion>
    </div>
  );
}
