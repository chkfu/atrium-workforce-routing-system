import { useSelectWeightContext } from './context';
import { useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../../redux/store';
import { setSelectWeight } from '../../../../redux/slices/SelectWeightSlice';
import axios from 'axios';
import * as yup from 'yup';
import { API } from '../../../../config/api';
import { CreateSelectWeightSchema, UpdateSelectWeightSchema } from './schema';
import { SetURLSearchParams } from 'react-router-dom';

//  remarks: refine based on the earlier templates of candidates, staff and departments with structure updates

export const handle_selected = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { setSelectedWeight } = useSelectWeightContext();
  const SltWeight = useSelector((state: RootState) => state.select_weight.value);
  if (event.target.checked) {
    setSelectedWeight(SltWeight.map((item: any) => item._id));
  } else {
    setSelectedWeight([]);
  }
};

//  remarks: manage record checkbox status (main table)
export const handle_checkbox_status = (id: number) => {
  const { setSelectedWeight } = useSelectWeightContext();
  setSelectedWeight((checklist: any) => {
    const selected = checklist.includes(id);
    if (selected) {
      return checklist.filter((item: any) => item !== id);
    } else {
      return [...checklist, id];
    }
  });
};

//  remarks: manage overall select all (main table)
export const handle_checkbox_select_all = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { setSelectedWeight } = useSelectWeightContext();
  const SltWeight = useSelector((state: RootState) => state.select_weight.value);
  const checked = event.target.checked;
  if (checked && SltWeight && SltWeight.length > 0) {
    const id_list = SltWeight.map((dept) => dept._id as number);
    setSelectedWeight(id_list);
  } else {
    setSelectedWeight([]);
  }
};

//  ==========  create SltWeight  ==========

export const handle_create_popup = () => {
  const { setTriggerCreate } = useSelectWeightContext();
  try {
    setTriggerCreate(true);
  } catch (err: any) {
    // remarks: error handling
    console.error('Batch Create Error:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageSltWeight] error: Failed to create SltWeight'}`
    );
  }
};

//  remarks: manage form submission (create SltWeight)
export const handle_create_submit = async (
  data: yup.InferType<typeof CreateSelectWeightSchema>,
  setIsCreating: (val: boolean) => void,
  setTriggerCreate: (val: boolean) => void,
  dispatch: Dispatch
) => {
  try {
    //  learnt: remove empty/null values so unset fields fall back to the DB column DEFAULT
    const new_data: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      //  learnt: also need to check if null or undefined for not filled fields
      if (value !== '' && value !== null && value !== undefined) {
        new_data[key] = value;
      }
    }
    new_data['is_active'] = true;

    //  remarks: valid case for create
    //  remarks: sub-table records are listed separately (not nested);
    //           must be added manually after SltWeight creation
    setIsCreating(true);
    await axios.post(API.SELECT_WEIGHTING, {
      select_weighting: [new_data],
    });
    alert(`[ManageSltWeight] succeed: new SltWeight record has been created.`);
    const res = await axios.get(API.SELECT_WEIGHTING);
    const createdSltWeight = res?.data?.data?.result || [];
    //  remarks: refresh SltWeight list
    dispatch(setSelectWeight(createdSltWeight));
    setTriggerCreate(false);
  } catch (err: any) {
    //  remarks: error handling
    console.error('[ManageSltWeight] error: create SltWeight:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageSltWeight] Failed to create SltWeight. Please try again later.'}`
    );
  } finally {
    setIsCreating(false);
  }
};

//  ==========  update SltWeight  ==========

//  remarks: manage update popup (update SltWeight)
export const handle_update_popup = () => {
  const { selectedWeight, setTriggerUpdate } = useSelectWeightContext();
  //  remarks: case of no selection
  if (selectedWeight.length === 0) {
    alert('Please select any SltWeight.');
    return;
  }
  //  remarks: case of selection
  try {
    setTriggerUpdate(true);
  } catch (err: any) {
    // remarks: error handling
    console.error('Batch update error:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageSltWeight] error: Failed to update SltWeight'}`
    );
  }
};

//  remarks: cancel button inside update popup (update SltWeight)
export const handle_update_cancel = () => {
  const { isUpdating, setTriggerUpdate } = useSelectWeightContext();
  if (isUpdating) return;
  setTriggerUpdate(false);
};

//  remarks: manage form submission (update SltWeight)
export const handle_update_submit = async (
  data: yup.InferType<typeof UpdateSelectWeightSchema>,
  selectedSltWeight: number[],
  setIsUpdating: (val: boolean) => void,
  setSelectedSltWeight: (val: any) => void,
  setTriggerUpdate: (val: boolean) => void,
  dispatch: Dispatch
) => {
  try {
    //  remarks: invalid case with no selection
    if (selectedSltWeight.length === 0) {
      alert('Please select SltWeight to update.');
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
    await axios.patch(API.SELECT_WEIGHTING, {
      _ids: selectedSltWeight.map((id) => String(id)),
      ...updateData,
    });
    alert(`[ManageSltWeight] succeed: new user information has been updated.`);

    //  remarks: refresh SltWeight list
    const res = await axios.get(API.SELECT_WEIGHTING);
    const updatedSltWeight = res?.data?.data?.result || [];
    dispatch(setSelectWeight(updatedSltWeight));
    setSelectedSltWeight([]);
    setTriggerUpdate(false);
  } catch (err: any) {
    console.error('[ManageSltWeight] error: update SltWeight:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageSltWeight] error: Failed to update SltWeight status. Please try again later.'}`
    );
  } finally {
    setIsUpdating(false);
  }
};

//  ==========  convert active status  ==========

//  remarks: manage convert active popup (convert active)
export const handle_convert_popup = (
  selectedSltWeight: number[],
  setTriggerConvert: (val: boolean) => void
) => {
  //  remarks: case of no selection
  if (selectedSltWeight.length === 0) {
    alert('Please select any SltWeight.');
    return;
  }
  try {
    //  remarks: popup window, action works on popup window
    setTriggerConvert(true);
  } catch (err: any) {
    //  remarks: error handling
    console.error('[ManageSltWeight] error: convert status:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageSltWeight] error: Failed to update SltWeight status'}`
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
  selectedSltWeight: number[],
  isConverting: boolean,
  setIsConverting: (val: boolean) => void,
  setSelectedSltWeight: (val: any) => void,
  setConvertStatus: (val: null) => void,
  setTriggerConvert: (val: boolean) => void,
  dispatch: Dispatch
) => {
  if (isConverting) return;
  try {
    //  remarks:  no selected SltWeight
    if (!selectedSltWeight || selectedSltWeight.length === 0) {
      alert('Please select any SltWeight.');
      return;
    }
    setIsConverting(true);
    // remarks: update status with assignated status
    await axios.patch(API.SELECT_WEIGHTING_ACTIVATE, {
      _ids: selectedSltWeight.map((id) => String(id)),
      is_active: convertStatus,
    });
    // remarks: refresh with updated data
    const res = await axios.get(API.SELECT_WEIGHTING);
    const data = res?.data?.data?.result || [];
    dispatch(setSelectWeight(data));
    setSelectedSltWeight([]);
    setConvertStatus(null);
    setTriggerConvert(false);
  } catch (err: any) {
    // remarks: error handling
    console.error('[ManageSltWeight] error: Error updating status:', err);
    const errorMsg =
      err.response?.data?.message ||
      err.message ||
      '[ManageSltWeight] error: Failed to update SltWeight status';
    alert(`Error: ${errorMsg}`);
  } finally {
    setIsConverting(false);
  }
};

//  ==========    delete    ==========

export const handle_delete_submit = async (
  selectedSltWeight: number[],
  setIsDeleting: (val: boolean) => void,
  setSelectedSltWeight: (val: any) => void,
  dispatch: Dispatch
) => {
  try {
    //  remarks: no selected SltWeight
    if (!selectedSltWeight || selectedSltWeight.length === 0) {
      alert('Please select any SltWeight.');
      return;
    }
    setIsDeleting(true);
    // remarks: delete selected SltWeight
    await axios.delete(API.SELECT_WEIGHTING, {
      data: { _ids: selectedSltWeight.map((id) => String(id)) },
    });
    // remarks: refresh with updated data
    const res = await axios.get(API.SELECT_WEIGHTING);
    const data = res?.data?.data?.result || [];
    dispatch(setSelectWeight(data));
    setSelectedSltWeight([]);
  } catch (err: any) {
    // remarks: error handling
    console.error('[ManageSltWeight] error: Error deleting SltWeight:', err);
    const errorMsg =
      err.response?.data?.message ||
      err.message ||
      '[ManageSltWeight] error: Failed to delete SltWeight records';
    alert(`Error: ${errorMsg}`);
  } finally {
    setIsDeleting(false);
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
  setFilterCapacityFrom: (val: number) => void,
  setFilterCapacityTo: (val: number) => void,
  setFilterWeightFrom: (val: number) => void,
  setFilterWeightTo: (val: number) => void,
  setFilterIsActive: (val: null) => void,
  setFilterCreatedFrom: (val: string) => void,
  setFilterCreatedTo: (val: string) => void,
  setFilterUpdatedFrom: (val: string) => void,
  setFilterUpdatedTo: (val: string) => void
) => {
  setFilterName('');
  setFilterCapacityFrom(0);
  setFilterCapacityTo(0);
  setFilterWeightFrom(0);
  setFilterWeightTo(0);
  setFilterIsActive(null);
  setFilterCreatedFrom('');
  setFilterCreatedTo('');
  setFilterUpdatedFrom('');
  setFilterUpdatedTo('');
};

export const handle_temp_filter_reset = (
  setFilterName: (val: string) => void,
  setFilterCapacityFrom: (val: number) => void,
  setFilterCapacityTo: (val: number) => void,
  setFilterWeightFrom: (val: number) => void,
  setFilterWeightTo: (val: number) => void,
  setFilterIsActive: (val: null) => void,
  setFilterCreatedFrom: (val: string) => void,
  setFilterCreatedTo: (val: string) => void,
  setFilterUpdatedFrom: (val: string) => void,
  setFilterUpdatedTo: (val: string) => void,
  setTriggerFilter: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchParams?: (updater: (prev: URLSearchParams) => URLSearchParams) => void
) => {
  handle_temp_filter_clear(
    setFilterName,
    setFilterCapacityFrom,
    setFilterCapacityTo,
    setFilterWeightFrom,
    setFilterWeightTo,
    setFilterIsActive,
    setFilterCreatedFrom,
    setFilterCreatedTo,
    setFilterUpdatedFrom,
    setFilterUpdatedTo
  );
  if (setSearchParams) {
    setSearchParams((prev: URLSearchParams) => {
      const params = new URLSearchParams(prev);
      Array.from(params.keys()).forEach((key) => {
        if (key.startsWith('filter_')) {
          params.delete(key);
        }
      });
      return params;
    });
  }
  setTriggerFilter(false);
};

export const handle_filter_submit = (
  filterName: string,
  filterCapacityFrom: number,
  filterCapacityTo: number,
  filterWeightFrom: number,
  filterWeightTo: number,
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
    if (filterCapacityFrom) params.set('filter_capacity_from', String(filterCapacityFrom));
    else params.delete('filter_capacity_from');
    if (filterCapacityTo) params.set('filter_capacity_to', String(filterCapacityTo));
    else params.delete('filter_capacity_to');
    if (filterWeightFrom) params.set('filter_weight_from', String(filterWeightFrom));
    else params.delete('filter_weight_from');
    if (filterWeightTo) params.set('filter_weight_to', String(filterWeightTo));
    else params.delete('filter_weight_to');
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
