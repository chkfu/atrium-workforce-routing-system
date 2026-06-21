import { useDepartmentContext } from './context';
import { useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../../redux/store';
import { setDepartment } from '../../../../redux/slices/DepartmentSlice';
import axios from 'axios';
import * as yup from 'yup';
import { API } from '../../../../config/api';
import { CreateDepartmentSchema, UpdateDepartmentSchema } from './schema';
import { SetURLSearchParams } from 'react-router-dom';

//  ==========  checkbox status  ==========

//  remarks

export const handle_selected = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { setSelectedDepartments } = useDepartmentContext();
  const departments = useSelector((state: RootState) => state.department.value);
  if (event.target.checked) {
    setSelectedDepartments(departments.map((item: any) => item._id));
  } else {
    setSelectedDepartments([]);
  }
};

//  remarks: manage record checkbox status (main table)
export const handle_checkbox_status = (id: number) => {
  const { setSelectedDepartments } = useDepartmentContext();
  setSelectedDepartments((checklist: any) => {
    const selected = checklist.includes(id);
    if (selected) {
      return checklist.filter((item: any) => item !== id);
    } else {
      return [...checklist, id];
    }
  });
};

//  remarks: manage overall select all (main table)
export const handle_checkbox_select_all = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const { setSelectedDepartments } = useDepartmentContext();
  const departments = useSelector((state: RootState) => state.department.value);
  const checked = event.target.checked;
  if (checked && departments && departments.length > 0) {
    const id_list = departments.map((dept) => dept._id as number);
    setSelectedDepartments(id_list);
  } else {
    setSelectedDepartments([]);
  }
};

//  ==========  create Departments  ==========

export const handle_create_popup = () => {
  const { setTriggerCreate } = useDepartmentContext();
  try {
    setTriggerCreate(true);
  } catch (err: any) {
    // remarks: error handling
    console.error('Batch Create Error:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageDepartments] error: Failed to create Departments'}`,
    );
  }
};

//  remarks: manage form submission (create Departments)
export const handle_create_submit = async (
  data: yup.InferType<typeof CreateDepartmentSchema>,
  setIsCreating: (val: boolean) => void,
  setTriggerCreate: (val: boolean) => void,
  dispatch: Dispatch,
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
    //           must be added manually after Departments creation
    setIsCreating(true);
    await axios.post(API.DEPARTMENTS, {
      departments: [new_data],
    });
    alert(
      `[ManageDepartments] succeed: new department record has been created.`,
    );
    const res = await axios.get(API.DEPARTMENTS);
    const createdDepartments = res?.data?.data?.result || [];
    //  remarks: refresh Departments list
    dispatch(setDepartment(createdDepartments));
    setTriggerCreate(false);
  } catch (err: any) {
    //  remarks: error handling
    console.error('[ManageDepartments] error: create departments:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageDepartments] Failed to create departments. Please try again later.'}`,
    );
  } finally {
    setIsCreating(false);
  }
};

//  ==========  update Departments  ==========

//  remarks: manage update popup (update Departments)
export const handle_update_popup = () => {
  const { selectedDepartments, setTriggerUpdate } = useDepartmentContext();
  //  remarks: case of no selection
  if (selectedDepartments.length === 0) {
    alert('Please select any departments.');
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
      `Error: ${err.response?.data?.message || err.message || '[ManageDepartments] error: Failed to update departments'}`,
    );
  }
};

//  remarks: cancel button inside update popup (update Departments)
export const handle_update_cancel = () => {
  const { isUpdating, setTriggerUpdate } = useDepartmentContext();
  if (isUpdating) return;
  setTriggerUpdate(false);
};

//  remarks: manage form submission (update Departments)
export const handle_update_submit = async (
  data: yup.InferType<typeof UpdateDepartmentSchema>,
  selectedDepartments: number[],
  setIsUpdating: (val: boolean) => void,
  setSelectedDepartments: (val: any) => void,
  setTriggerUpdate: (val: boolean) => void,
  dispatch: Dispatch,
) => {
  try {
    //  remarks: invalid case with no selection
    if (selectedDepartments.length === 0) {
      alert('Please select Departments to update.');
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
    await axios.patch(API.DEPARTMENTS, {
      _ids: selectedDepartments.map((id) => String(id)),
      ...updateData,
    });
    alert(
      `[ManageDepartments] succeed: new user information has been updated.`,
    );

    //  remarks: refresh Departments list
    const res = await axios.get(API.DEPARTMENTS);
    const updatedDepartments = res?.data?.data?.result || [];
    dispatch(setDepartment(updatedDepartments));
    setSelectedDepartments([]);
    setTriggerUpdate(false);
  } catch (err: any) {
    console.error('[ManageDepartments] error: update Departments:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageDepartments] error: Failed to update Departments status. Please try again later.'}`,
    );
  } finally {
    setIsUpdating(false);
  }
};

//  ==========  convert active status  ==========

//  remarks: manage convert active popup (convert active)
export const handle_convert_popup = (
  selectedDepartments: number[],
  setTriggerConvert: (val: boolean) => void,
) => {
  //  remarks: case of no selection
  if (selectedDepartments.length === 0) {
    alert('Please select any Departments.');
    return;
  }
  try {
    //  remarks: popup window, action works on popup window
    setTriggerConvert(true);
  } catch (err: any) {
    //  remarks: error handling
    console.error('[ManageDepartments] error: convert status:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageDepartments] error: Failed to update Departments status'}`,
    );
  }
};

//  remarks: cancel button inside convert active popup
export const handle_convert_cancel = (
  isConverting: boolean,
  setTriggerConvert: (val: boolean) => void,
  setConvertStatus: (val: null) => void,
) => {
  if (isConverting) return;
  setTriggerConvert(false);
  setConvertStatus(null);
};

//  remarks: manage form submission (convert active)
export const handle_convert_submit = async (
  convertStatus: boolean | null,
  selectedDepartments: number[],
  isConverting: boolean,
  setIsConverting: (val: boolean) => void,
  setSelectedDepartments: (val: any) => void,
  setConvertStatus: (val: null) => void,
  setTriggerConvert: (val: boolean) => void,
  dispatch: Dispatch,
) => {
  if (isConverting) return;
  try {
    //  remarks:  no selected Departments
    if (!selectedDepartments || selectedDepartments.length === 0) {
      alert('Please select any Departments.');
      return;
    }
    setIsConverting(true);
    // remarks: update status with assignated status
    await axios.patch(API.DEPARTMENTS_ACTIVATE, {
      _ids: selectedDepartments.map((id) => String(id)),
      is_active: convertStatus,
    });
    // remarks: refresh with updated data
    const res = await axios.get(API.DEPARTMENTS);
    const data = res?.data?.data?.result || [];
    dispatch(setDepartment(data));
    setSelectedDepartments([]);
    setConvertStatus(null);
    setTriggerConvert(false);
  } catch (err: any) {
    // remarks: error handling
    console.error('[ManageDepartments] error: Error updating status:', err);
    const errorMsg =
      err.response?.data?.message ||
      err.message ||
      '[ManageDepartments] error: Failed to update Departments status';
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
  searchParams: URLSearchParams,
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
  setSearchParams: SetURLSearchParams,
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
  setFilterCapacityFrom:  (val: number) => void,
  setFilterCapacityTo:  (val: number) => void,
  setFilterWeightFrom:  (val: number) => void,
  setFilterWeightTo:  (val: number) => void,
  setFilterIsActive: (val: null) => void,
  setFilterCreatedFrom: (val: string) => void,
  setFilterCreatedTo: (val: string) => void,
  setFilterUpdatedFrom: (val: string) => void,
  setFilterUpdatedTo: (val: string) => void,
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
  setSearchParams?: (updater: (prev: URLSearchParams) => URLSearchParams) => void,
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
    setFilterUpdatedTo,
  );
  // 清除 URL 中的所有 filter 参数
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
  setSearchParams: SetURLSearchParams,
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
