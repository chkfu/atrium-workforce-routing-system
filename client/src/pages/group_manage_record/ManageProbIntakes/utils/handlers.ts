import { useIntakesContext } from './context';
import { useSelector } from 'react-redux';
import { setCandidates } from '../../../../redux/slices/CandidateSlice';
import { RootState } from '../../../../redux/store';
import type { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import * as yup from 'yup';
import { API } from '../../../../config/api';
import { CreateIntakeSchema } from './schema';
import { SetURLSearchParams } from 'react-router-dom';

//  ==========  checkbox status  ==========

//  remarks

export const handle_selected = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { setSelectedIntakes } = useIntakesContext();
  const candidates = useSelector((state: RootState) => state.candidates.value);
  if (event.target.checked) {
    setSelectedIntakes(candidates.map((item: any) => item.id));
  } else {
    setSelectedIntakes([]);
  }
};

//  remarks: manage record checkbox status (main table)
export const handle_checkbox_status = (id: number) => {
  const { setSelectedIntakes } = useIntakesContext();
  setSelectedIntakes((checklist) => {
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
  const { setSelectedIntakes } = useIntakesContext();
  const candidates = useSelector((state: RootState) => state.candidates.value);
  const checked = event.target.checked;
  if (checked && candidates && candidates.length > 0) {
    const id_list = candidates.map((candidate) => candidate._id as number);
    setSelectedIntakes(id_list);
  } else {
    setSelectedIntakes([]);
  }
};

//  ==========  create intakes  ==========

export const handle_create_popup = () => {
  const { setTriggerCreate } = useIntakesContext();
  try {
    setTriggerCreate(true);
  } catch (err: any) {
    // remarks: error handling
    console.error('Batch Create Error:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageIntakes] error: Failed to create intake'}`
    );
  }
};

//  remarks: manage form submission (create intakes)
export const handle_create_submit = async (
  data: yup.InferType<typeof CreateIntakeSchema>,
  setIsCreating: (val: boolean) => void,
  setTriggerCreate: (val: boolean) => void,
  dispatch: Dispatch
) => {
  try {
    //  learnt: remove empty string values for enum fields
    const new_data: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if ((value as unknown) !== '') {
        new_data[key] = value;
      }
    }

    //  remarks: valid case for create
    setIsCreating(true);
    await axios.post(API.PBT_INTAKES, {
      probation_intakes: [new_data],
    });
    alert(`[ManageIntakes] succeed: new intake record has been created.`);
    const res = await axios.get(API.PBT_INTAKES);
    const createdIntakes = res?.data?.data?.result || [];

    //  remarks: refresh intakes list
    dispatch(setCandidates(createdIntakes));
    setTriggerCreate(false);
  } catch (err: any) {
    console.error('[ManageIntakes] error: create intake:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || 'Error: Failed to create intake. Please try again later.'}`
    );
  } finally {
    setIsCreating(false);
  }
};

//  ==========  convert active status  ==========

//  remarks: manage convert active popup (convert active)
export const handle_convert_popup = (
  selectedIntakes: number[],
  setTriggerConvert: (val: boolean) => void
) => {
  //  remarks: case of no selection
  if (selectedIntakes.length === 0) {
    alert('Please select any intake.');
    return;
  }
  try {
    //  remarks: popup window, action works on popup window
    setTriggerConvert(true);
  } catch (err: any) {
    //  remarks: error handling
    console.error('[ManageIntakes] error: convert status:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageIntakes] error: Failed to update intake status'}`
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
  selectedIntakes: number[],
  isConverting: boolean,
  setIsConverting: (val: boolean) => void,
  setSelectedIntakes: (val: any) => void,
  setConvertStatus: (val: null) => void,
  setTriggerConvert: (val: boolean) => void,
  dispatch: Dispatch
) => {
  if (isConverting) return;
  try {
    //  remarks:  no selected intakes
    if (!selectedIntakes || selectedIntakes.length === 0) {
      alert('Please select any intake.');
      return;
    }
    setIsConverting(true);
    // remarks: update status with assignated status
    await axios.patch(API.PBT_INTAKES_ACTIVATE, {
      _ids: selectedIntakes.map((id) => String(id)),
      is_active: convertStatus,
    });
    // remarks: refresh with updated data
    const res = await axios.get(API.PBT_INTAKES);
    const data = res?.data?.data?.result || [];
    dispatch(setCandidates(data));
    setSelectedIntakes([]);
    setConvertStatus(null);
    setTriggerConvert(false);
  } catch (err: any) {
    // remarks: error handling
    console.error('[ManageIntakes] error: Error updating status:', err);
    const errorMsg =
      err.response?.data?.message ||
      err.message ||
      '[ManageIntakes] error: Failed to update intake status';
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
  setFilterGender: (val: any) => void,
  setFilterProbStatus: (val: any) => void,
  setFilterDept: (val: string) => void,
  setFilterStrategy: (val: string) => void,
  setFilterIsActive: (val: any) => void,
  setFilterCreatedFrom: (val: string) => void,
  setFilterCreatedTo: (val: string) => void,
  setFilterUpdatedFrom: (val: string) => void,
  setFilterUpdatedTo: (val: string) => void,
  setSearchParams: SetURLSearchParams
) => {
  setFilterName('');
  setFilterGender(null);
  setFilterProbStatus(null);
  setFilterDept('');
  setFilterStrategy('');
  setFilterIsActive(null);
  setFilterCreatedFrom('');
  setFilterCreatedTo('');
  setFilterUpdatedFrom('');
  setFilterUpdatedTo('');

  setSearchParams((prev: URLSearchParams) => {
    const params = new URLSearchParams(prev);
    Array.from(params.keys()).forEach((key) => {
      if (key.startsWith('filter_')) {
        params.delete(key);
      }
    });
    return params;
  });
};

export const handle_temp_filter_reset = (
  setFilterName: (val: string) => void,
  setFilterGender: (val: any) => void,
  setFilterProbStatus: (val: any) => void,
  setFilterDept: (val: string) => void,
  setFilterStrategy: (val: string) => void,
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
    setFilterGender,
    setFilterProbStatus,
    setFilterDept,
    setFilterStrategy,
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
  filterGender: string | null,
  filterProbStatus: string | null,
  filterDept: string,
  filterStrategy: string,
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
    if (filterGender) params.set('filter_gender', filterGender);
    else params.delete('filter_gender');
    if (filterProbStatus) params.set('filter_prob_status', filterProbStatus);
    else params.delete('filter_prob_status');
    if (filterDept) params.set('filter_dept', filterDept);
    else params.delete('filter_dept');
    if (filterStrategy) params.set('filter_strategy', filterStrategy);
    else params.delete('filter_strategy');
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
