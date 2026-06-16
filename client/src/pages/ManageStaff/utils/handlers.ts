import { useStaffContext } from './context';
import axios from 'axios';
import * as yup from 'yup';
import { API } from '../../../config/api';
import { CreateStaffSchema, UpdateStaffSchema } from './schema';
import { SetURLSearchParams } from 'react-router-dom';

//  ==========  checkbox status  ==========

//  remarks

export const handle_selected = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { staff, setSelectedStaff } = useStaffContext();
  if (event.target.checked) {
    setSelectedStaff(staff.map((item: any) => item._id));
  } else {
    setSelectedStaff([]);
  }
};

//  remarks: manage record checkbox status (main table)
export const handle_checkbox_status = (id: number) => {
  const { setSelectedStaff } = useStaffContext();
  setSelectedStaff((checklist) => {
    const selected = checklist.includes(id);
    if (selected) {
      return checklist.filter((item) => item !== id);
    } else {
      return [...checklist, id];
    }
  });
};

//  remarks: manage overall select all (main table)
export const handle_checkbox_select_all = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const { staff, setSelectedStaff } = useStaffContext();
  const checked = event.target.checked;
  if (checked && staff && staff.length > 0) {
    const id_list = staff.map((Staff) => Staff._id as number);
    setSelectedStaff(id_list);
  } else {
    setSelectedStaff([]);
  }
};

//  ==========  create Staff  ==========

export const handle_create_popup = () => {
  const { setTriggerCreate } = useStaffContext();
  try {
    setTriggerCreate(true);
  } catch (err: any) {
    // remarks: error handling
    console.error('Batch Create Error:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageStaff] error: Failed to create Staff'}`,
    );
  }
};

//  remarks: manage form submission (create Staff)
export const handle_create_submit = async (
  data: yup.InferType<typeof CreateStaffSchema>,
  setIsCreating: (val: boolean) => void,
  setStaff: (val: any[]) => void,
  setTriggerCreate: (val: boolean) => void,
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
    //           must be added manually after Staff creation
    setIsCreating(true);
    await axios.post(API.STAFF, {
      Staff: [new_data],
    });
    alert(`[ManageStaff] succeed: new Staff record has been created.`);
    const res = await axios.get(API.STAFF);
    const createdStaff = res?.data?.data?.result || [];

    //  remarks: refresh Staff list
    setStaff(createdStaff);
    setTriggerCreate(false);
  } catch (err: any) {
    console.error('[ManageStaff] error: create Staff:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || 'Error: Failed to create Staff. Please try again later.'}`,
    );
  } finally {
    setIsCreating(false);
  }
};

//  ==========  update Staff  ==========

//  remarks: manage update popup (update Staff)
export const handle_update_popup = () => {
  const { selectedStaff, setTriggerUpdate } = useStaffContext();
  //  remarks: case of no selection
  if (selectedStaff.length === 0) {
    alert('Please select any Staff.');
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
      `Error: ${err.response?.data?.message || err.message || '[ManageStaff] error: Failed to update Staff'}`,
    );
  }
};

//  remarks: cancel button inside update popup (update Staff)
export const handle_update_cancel = () => {
  const { isUpdating, setTriggerUpdate } = useStaffContext();
  if (isUpdating) return;
  setTriggerUpdate(false);
};

//  remarks: manage form submission (update Staff)
export const handle_update_submit = async (
  data: yup.InferType<typeof UpdateStaffSchema>,
  selectedStaff: number[],
  setIsUpdating: (val: boolean) => void,
  setStaff: (val: any[]) => void,
  setSelectedStaff: (val: any) => void,
  setTriggerUpdate: (val: boolean) => void,
) => {
  try {
    //  remarks: invalid case with no selection
    if (selectedStaff.length === 0) {
      alert('Please select Staff to update.');
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
    await axios.patch(API.STAFF, {
      _ids: selectedStaff.map((id) => String(id)),
      ...updateData,
    });
    alert(`[ManageStaff] succeed: new user information has been updated.`);

    //  remarks: refresh Staff list
    const res = await axios.get(API.STAFF);
    const updatedStaff = res?.data?.data?.result || [];
    setStaff(updatedStaff);
    setSelectedStaff([]);
    setTriggerUpdate(false);
  } catch (err: any) {
    console.error('[ManageStaff] error: update Staff:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || 'Error: Failed to update Staff status. Please try again later.'}`,
    );
  } finally {
    setIsUpdating(false);
  }
};

//  ==========  convert active status  ==========

//  remarks: manage convert active popup (convert active)
export const handle_convert_popup = (
  selectedStaff: number[],
  setTriggerConvert: (val: boolean) => void,
) => {
  //  remarks: case of no selection
  if (selectedStaff.length === 0) {
    alert('Please select any Staff.');
    return;
  }
  try {
    //  remarks: popup window, action works on popup window
    setTriggerConvert(true);
  } catch (err: any) {
    //  remarks: error handling
    console.error('[ManageStaff] error: convert status:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageStaff] error: Failed to update Staff status'}`,
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
  selectedStaff: number[],
  isConverting: boolean,
  setIsConverting: (val: boolean) => void,
  setStaff: (val: any[]) => void,
  setSelectedStaff: (val: any) => void,
  setConvertStatus: (val: null) => void,
  setTriggerConvert: (val: boolean) => void,
) => {
  if (isConverting) return;
  try {
    //  remarks:  no selected Staff
    if (!selectedStaff || selectedStaff.length === 0) {
      alert('Please select any Staff.');
      return;
    }
    setIsConverting(true);
    // remarks: update status with assignated status
    await axios.patch(API.STAFF_ACTIVATE, {
      _ids: selectedStaff.map((id) => String(id)),
      is_active: convertStatus,
    });
    // remarks: refresh with updated data
    const res = await axios.get(API.STAFF);
    const data = res?.data?.data?.result || [];
    setStaff(data);
    setSelectedStaff([]);
    setConvertStatus(null);
    setTriggerConvert(false);
  } catch (err: any) {
    // remarks: error handling
    console.error('[ManageStaff] error: Error updating status:', err);
    const errorMsg =
      err.response?.data?.message ||
      err.message ||
      '[ManageStaff] error: Failed to update Staff status';
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
  setFilterGender: (val: string) => void,
  setFilterEmail: (val: string) => void,
  setFilterDepartment: (val: string) => void,
  setFilterPosition: (val: string) => void,
  setFilterGrade: (val: string) => void,
  setFilterExtension: (val: string) => void,
  setFilterIsActive: (val: any) => void,
  setFilterDateHiredFrom: (val: string) => void,
  setFilterDateHiredTo: (val: string) => void,
  setFilterDateQuitFrom: (val: string) => void,
  setFilterDateQuitTo: (val: string) => void,
  setFilterCreatedFrom: (val: string) => void,
  setFilterCreatedTo: (val: string) => void,
  setFilterUpdatedFrom: (val: string) => void,
  setFilterUpdatedTo: (val: string) => void,
) => {
  setFilterName('');
  setFilterGender('');
  setFilterEmail('');
  setFilterDepartment('');
  setFilterPosition('');
  setFilterGrade('');
  setFilterExtension('');
  setFilterIsActive(null);
  setFilterDateHiredFrom('');
  setFilterDateHiredTo('');
  setFilterDateQuitFrom('');
  setFilterDateQuitTo('');
  setFilterCreatedFrom('');
  setFilterCreatedTo('');
  setFilterUpdatedFrom('');
  setFilterUpdatedTo('');
};

export const handle_temp_filter_reset = (
  setFilterName: (val: string) => void,
  setFilterGender: (val: string) => void,
  setFilterEmail: (val: string) => void,
  setFilterDepartment: (val: string) => void,
  setFilterPosition: (val: string) => void,
  setFilterGrade: (val: string) => void,
  setFilterExtension: (val: string) => void,
  setFilterIsActive: (val: any) => void,
  setFilterDateHiredFrom: (val: string) => void,
  setFilterDateHiredTo: (val: string) => void,
  setFilterDateQuitFrom: (val: string) => void,
  setFilterDateQuitTo: (val: string) => void,
  setFilterCreatedFrom: (val: string) => void,
  setFilterCreatedTo: (val: string) => void,
  setFilterUpdatedFrom: (val: string) => void,
  setFilterUpdatedTo: (val: string) => void,
  setTriggerFilter: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  handle_temp_filter_clear(
    setFilterName,
    setFilterGender,
    setFilterEmail,
    setFilterDepartment,
    setFilterPosition,
    setFilterGrade,
    setFilterExtension,
    setFilterIsActive,
    setFilterDateHiredFrom,
    setFilterDateHiredTo,
    setFilterDateQuitFrom,
    setFilterDateQuitTo,
    setFilterCreatedFrom,
    setFilterCreatedTo,
    setFilterUpdatedFrom,
    setFilterUpdatedTo,
  );
  setTriggerFilter(false);
};

export const handle_filter_submit = (
  filterName: string,
  filterGender: string,
  filterEmail: string,
  filterDepartment: string,
  filterPosition: string,
  filterGrade: string,
  filterExtension: string,
  filterIsActive: boolean | null,
  filterDateHiredFrom: string,
  filterDateHiredTo: string,
  filterDateQuitFrom: string,
  filterDateQuitTo: string,
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
    if (filterGender) params.set('filter_gender', filterGender);
    else params.delete('filter_gender');
    if (filterEmail) params.set('filter_email', filterEmail);
    else params.delete('filter_email');
    if (filterDepartment) params.set('filter_department', filterDepartment);
    else params.delete('filter_department');
    if (filterPosition) params.set('filter_position', filterPosition);
    else params.delete('filter_position');
    if (filterGrade) params.set('filter_grade', filterGrade);
    else params.delete('filter_grade');
    if (filterExtension) params.set('filter_ext', filterExtension);
    else params.delete('filter_ext');
    if (filterIsActive !== null)
      params.set('filter_is_active', String(filterIsActive));
    else params.delete('filter_is_active');
    if (filterDateHiredFrom)
      params.set('filter_date_hired_from', filterDateHiredFrom);
    else params.delete('filter_date_hired_from');
    if (filterDateHiredTo)
      params.set('filter_date_hired_to', filterDateHiredTo);
    else params.delete('filter_date_hired_to');
    if (filterDateQuitFrom)
      params.set('filter_date_quit_from', filterDateQuitFrom);
    else params.delete('filter_date_quit_from');
    if (filterDateQuitTo) params.set('filter_date_quit_to', filterDateQuitTo);
    else params.delete('filter_date_quit_to');
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
