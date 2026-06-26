import { useCandidateContext } from './context';
import { useSelector } from 'react-redux';
import { setCandidates } from '../../../../redux/slices/CandidateSlice';
import { RootState } from '../../../../redux/store';
import type { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import * as yup from 'yup';
import { API } from '../../../../config/api';
import { CreateCandidateSchema, UpdateCandidateSchema } from './schema';
import { SetURLSearchParams } from 'react-router-dom';

//  ==========  checkbox status  ==========

//  remarks

export const handle_selected = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { setSelectedCandidates } = useCandidateContext();
  const candidates = useSelector((state: RootState) => state.candidates.value);
  if (event.target.checked) {
    setSelectedCandidates(candidates.map((item: any) => item.id));
  } else {
    setSelectedCandidates([]);
  }
};

//  remarks: manage record checkbox status (main table)
export const handle_checkbox_status = (id: number) => {
  const { setSelectedCandidates } = useCandidateContext();
  setSelectedCandidates((checklist) => {
    const selected = checklist.includes(id);
    if (selected) {
      return checklist.filter((item) => item !== id);
    } else {
      return [...checklist, id];
    }
  });
};

//  remarks: manage overall select all (main table)
export const handle_checkbox_select_all = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { setSelectedCandidates } = useCandidateContext();
  const candidates = useSelector((state: RootState) => state.candidates.value);
  const checked = event.target.checked;
  if (checked && candidates && candidates.length > 0) {
    const id_list = candidates.map((candidate) => candidate._id as number);
    setSelectedCandidates(id_list);
  } else {
    setSelectedCandidates([]);
  }
};

//  ==========  create candidates  ==========

export const handle_create_popup = () => {
  const { setTriggerCreate } = useCandidateContext();
  try {
    setTriggerCreate(true);
  } catch (err: any) {
    // remarks: error handling
    console.error('Batch Create Error:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageCandidates] error: Failed to create candidates'}`
    );
  }
};

//  remarks: manage form submission (create candidates)
export const handle_create_submit = async (
  data: yup.InferType<typeof CreateCandidateSchema>,
  setIsCreating: (val: boolean) => void,
  setTriggerCreate: (val: boolean) => void,
  dispatch: Dispatch
) => {
  try {
    //  learnt: remove empty string values for enum fields
    const new_data: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== '') {
        new_data[key] = value;
      }
    }
    new_data['is_active'] = true;

    //  remarks: valid case for create
    //  remarks: sub-table records are listed separately (not nested);
    //           must be added manually after candidate creation
    setIsCreating(true);
    await axios.post(API.CANDIDATES, {
      candidates: [new_data],
    });
    alert(`[ManageCandidates] succeed: new candidate record has been created.`);
    const res = await axios.get(API.CANDIDATES);
    const createdCandidates = res?.data?.data?.result || [];

    //  remarks: refresh candidates list
    dispatch(setCandidates(createdCandidates));
    setTriggerCreate(false);
  } catch (err: any) {
    console.error('[ManageCandidates] error: create candidates:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || 'Error: Failed to create candidate. Please try again later.'}`
    );
  } finally {
    setIsCreating(false);
  }
};

//  ==========  update candidates  ==========

//  remarks: manage update popup (update candidates)
export const handle_update_popup = () => {
  const { selectedCandidates, setTriggerUpdate } = useCandidateContext();
  //  remarks: case of no selection
  if (selectedCandidates.length === 0) {
    alert('Please select any candidate.');
    return;
  }
  //  remarks: case of selection
  try {
    setTriggerUpdate(true);
  } catch (err: any) {
    // remarks: error handling
    console.error('Batch Update Error:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageCandidates] error: Failed to update candidates'}`
    );
  }
};

//  remarks: cancel button inside update popup (update candidates)
export const handle_update_cancel = () => {
  const { isUpdating, setTriggerUpdate } = useCandidateContext();
  if (isUpdating) return;
  setTriggerUpdate(false);
};

//  remarks: manage form submission (update candidates)
export const handle_update_submit = async (
  data: yup.InferType<typeof UpdateCandidateSchema>,
  selectedCandidates: number[],
  setIsUpdating: (val: boolean) => void,
  setSelectedCandidates: (val: any) => void,
  setTriggerUpdate: (val: boolean) => void,
  dispatch: Dispatch
) => {
  try {
    //  remarks: invalid case with no selection
    if (selectedCandidates.length === 0) {
      alert('Please select candidates to update.');
      return;
    }
    //  learnt: remove empty string values for enum fields
    const updateData: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== '') {
        updateData[key] = value;
      }
    }
    //  remarks: valid case for update
    setIsUpdating(true);
    await axios.patch(API.CANDIDATES, {
      _ids: selectedCandidates.map((id) => String(id)),
      ...updateData,
    });
    alert(`[ManageCandidates] succeed: new user information has been updated.`);

    //  remarks: refresh candidates list
    const res = await axios.get(API.CANDIDATES);
    const updatedCandidates = res?.data?.data?.result || [];
    dispatch(setCandidates(updatedCandidates));
    setSelectedCandidates([]);
    setTriggerUpdate(false);
  } catch (err: any) {
    console.error('[ManageCandidates] error: update candidates:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || 'Error: Failed to update candidate status. Please try again later.'}`
    );
  } finally {
    setIsUpdating(false);
  }
};

//  ==========  convert active status  ==========

//  remarks: manage convert active popup (convert active)
export const handle_convert_popup = (
  selectedCandidates: number[],
  setTriggerConvert: (val: boolean) => void
) => {
  //  remarks: case of no selection
  if (selectedCandidates.length === 0) {
    alert('Please select any candidate.');
    return;
  }
  try {
    //  remarks: popup window, action works on popup window
    setTriggerConvert(true);
  } catch (err: any) {
    //  remarks: error handling
    console.error('[ManageCandidates] error: convert status:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageCandidates] error: Failed to update candidate status'}`
    );
  }
};

//  remarks: cancel button inside convert active popup
export const handle_convert_cancel = (
  isConverting: boolean,
  setTriggerConvert: (val: boolean) => void,
  setConvertStatus: (val: null) => void
) => {
  if (isConverting) return;
  setTriggerConvert(false);
  setConvertStatus(null);
};

//  remarks: manage form submission (convert active)
export const handle_convert_submit = async (
  convertStatus: boolean | null,
  selectedCandidates: number[],
  isConverting: boolean,
  setIsConverting: (val: boolean) => void,
  setSelectedCandidates: (val: any) => void,
  setConvertStatus: (val: null) => void,
  setTriggerConvert: (val: boolean) => void,
  dispatch: Dispatch
) => {
  if (isConverting) return;
  try {
    //  remarks:  no selected candidates
    if (!selectedCandidates || selectedCandidates.length === 0) {
      alert('Please select any candidate.');
      return;
    }
    setIsConverting(true);
    // remarks: update status with assignated status
    await axios.patch(API.CANDIDATES_ACTIVATE, {
      _ids: selectedCandidates.map((id) => String(id)),
      is_active: convertStatus,
    });
    // remarks: refresh with updated data
    const res = await axios.get(API.CANDIDATES);
    const data = res?.data?.data?.result || [];
    dispatch(setCandidates(data));
    setSelectedCandidates([]);
    setConvertStatus(null);
    setTriggerConvert(false);
  } catch (err: any) {
    // remarks: error handling
    console.error('[ManageCandidates] error: Error updating status:', err);
    const errorMsg =
      err.response?.data?.message ||
      err.message ||
      '[ManageCandidates] error: Failed to update candidate status';
    alert(`Error: ${errorMsg}`);
  } finally {
    setIsConverting(false);
  }
};

//  ==========    sorting    ==========

//  remarks: reset temp sort options by closing popup
export const handle_temp_sort_reset = (
  setSortAsc: (val: boolean) => void,
  setSortTarget: (val: string) => void,
  setTriggerSort: React.Dispatch<React.SetStateAction<boolean>>,
  searchParams: URLSearchParams
) => {
  const sort_order = searchParams.get('sort_order') === 'true';
  const sort_target = searchParams.get('sort_target') || '_id';
  setSortAsc(sort_order);
  setSortTarget(sort_target);
  setTriggerSort(false);
};

export const handle_sort_submit = (
  sortAsc: boolean,
  sortTarget: string,
  setTriggerSort: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchParams: SetURLSearchParams
) => {
  setSearchParams((prev: URLSearchParams) => {
    const params = new URLSearchParams(prev);
    params.set('sort_order', String(sortAsc));
    params.set('sort_target', String(sortTarget));
    return params;
  });
  setTriggerSort(false);
};

//  ==========    filtering    ==========

export const handle_temp_filter_clear = (
  setFilterName: (val: string) => void,
  setFilterEmail: (val: string) => void,
  setFilterGender: (val: any) => void,
  setFilterProbStatus: (val: any) => void,
  setFilterIsActive: (val: any) => void,
  setFilterCreatedFrom: (val: string) => void,
  setFilterCreatedTo: (val: string) => void,
  setFilterUpdatedFrom: (val: string) => void,
  setFilterUpdatedTo: (val: string) => void,
  setSearchParams: SetURLSearchParams
) => {
  setFilterName('');
  setFilterEmail('');
  setFilterGender(null);
  setFilterProbStatus(null);
  setFilterIsActive(null);
  setFilterCreatedFrom('');
  setFilterCreatedTo('');
  setFilterUpdatedFrom('');
  setFilterUpdatedTo('');

  setSearchParams((prev: URLSearchParams) => {
    const params = new URLSearchParams(prev);
    params.delete('filter_name');
    params.delete('filter_email');
    params.delete('filter_gender');
    params.delete('filter_prob_status');
    params.delete('filter_is_active');
    params.delete('filter_created_from');
    params.delete('filter_created_to');
    params.delete('filter_updated_from');
    params.delete('filter_updated_to');
    return params;
  });
};

export const handle_temp_filter_reset = (
  setFilterName: (val: string) => void,
  setFilterEmail: (val: string) => void,
  setFilterGender: (val: any) => void,
  setFilterProbStatus: (val: any) => void,
  setFilterIsActive: (val: any) => void,
  setFilterCreatedFrom: (val: string) => void,
  setFilterCreatedTo: (val: string) => void,
  setFilterUpdatedFrom: (val: string) => void,
  setFilterUpdatedTo: (val: string) => void,
  setTriggerFilter: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchParams: SetURLSearchParams
) => {
  handle_temp_filter_clear(
    setFilterName,
    setFilterEmail,
    setFilterGender,
    setFilterProbStatus,
    setFilterIsActive,
    setFilterCreatedFrom,
    setFilterCreatedTo,
    setFilterUpdatedFrom,
    setFilterUpdatedTo,
    setSearchParams
  );
  setTriggerFilter(false);
};

export const handle_filter_submit = (
  filterName: string,
  filterEmail: string,
  filterGender: string | null,
  filterProbStatus: string | null,
  filterIsActive: boolean | null,
  filterCreatedFrom: string,
  filterCreatedTo: string,
  filterUpdatedFrom: string,
  filterUpdatedTo: string,
  setTriggerFilter: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchParams: SetURLSearchParams
) => {
  setSearchParams((prev: URLSearchParams) => {
    const params = new URLSearchParams(prev);
    if (filterName) params.set('filter_name', filterName);
    else params.delete('filter_name');
    if (filterEmail) params.set('filter_email', filterEmail);
    else params.delete('filter_email');
    if (filterGender) params.set('filter_gender', filterGender);
    else params.delete('filter_gender');
    if (filterProbStatus) params.set('filter_prob_status', filterProbStatus);
    else params.delete('filter_prob_status');
    if (filterIsActive !== null) params.set('filter_is_active', String(filterIsActive));
    else params.delete('filter_is_active');
    if (filterCreatedFrom) params.set('filter_created_from', filterCreatedFrom);
    else params.delete('filter_created_from');
    if (filterCreatedTo) params.set('filter_created_to', filterCreatedTo);
    else params.delete('filter_created_to');
    if (filterUpdatedFrom) params.set('filter_updated_from', filterUpdatedFrom);
    else params.delete('filter_updated_from');
    if (filterUpdatedTo) params.set('filter_updated_to', filterUpdatedTo);
    else params.delete('filter_updated_to');
    return params;
  });
  setTriggerFilter(false);
};
