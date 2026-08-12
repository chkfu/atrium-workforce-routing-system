import { useIntakesContext } from './context';
import axios from 'axios';
import * as yup from 'yup';
import { API } from '../../../../config/api';
import { CreateIntakeSchema, UpdateCandidateSchema } from './schema';
import { SetURLSearchParams } from 'react-router-dom';
import { IProbIntake } from '../../../../utils/types/redux_types';

//  ==========  checkbox status  ==========

//  remarks
export const handle_selected = (
  event: React.ChangeEvent<HTMLInputElement>,
  rawIntakes: IProbIntake[],
  setSelectedIntakes: (val: number[]) => void
) => {
  if (event.target.checked) {
    setSelectedIntakes(rawIntakes.map((item) => item.intake_id));
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
export const handle_checkbox_select_all = (
  event: React.ChangeEvent<HTMLInputElement>,
  rawIntakes: IProbIntake[],
  setSelectedIntakes: (val: number[]) => void
) => {
  const checked = event.target.checked;
  if (checked && rawIntakes && rawIntakes.length > 0) {
    const id_list = rawIntakes.map((intake) => intake.intake_id);
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
  setRawIntakes: (val: IProbIntake[]) => void
) => {
  try {
    //  remarks: valid case for create
    setIsCreating(true);
    await axios.post(API.PBT_INTAKES, {
      weight_id: data.select_weight_id,
    });
    alert(`[ManageIntakes] succeed: new intake record has been created.`);
    const res = await axios.get(API.PBT_INTAKES);
    const createdIntakes = res?.data?.data?.result || [];

    //  remarks: refresh intakes list
    setRawIntakes(createdIntakes);
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
  setRawIntakes: (val: IProbIntake[]) => void
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
    setRawIntakes(data);
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

//  ==========    delete    ==========
export const handle_delete_submit = async (
  selectedIntakes: number[],
  setIsDeleting: (val: boolean) => void,
  setSelectedIntakes: (val: any) => void,
  setRawIntakes: (val: IProbIntake[]) => void
) => {
  try {
    //  remarks: no selected intakes
    if (!selectedIntakes || selectedIntakes.length === 0) {
      alert('Please select any intake.');
      return;
    }
    setIsDeleting(true);
    // remarks: delete selected intakes
    await axios.delete(API.PBT_INTAKES, {
      data: { _ids: selectedIntakes.map((id) => String(id)) },
    });
    // remarks: refresh with updated data
    const res = await axios.get(API.PBT_INTAKES);
    const data = res?.data?.data?.result || [];
    setRawIntakes(data);
    setSelectedIntakes([]);
  } catch (err: any) {
    // remarks: error handling
    console.error('[ManageIntakes] error: Error deleting intakes:', err);
    const errorMsg =
      err.response?.data?.message ||
      err.message ||
      '[ManageIntakes] error: Failed to delete intake records';
    alert(`Error: ${errorMsg}`);
  } finally {
    setIsDeleting(false);
  }
}

//  ==========    switch candidate status    ==========

//  remarks: manage update popup (update candidates)
export const handle_candidates_status_popup = (
  selectedIntakes: number[],
  setTriggerUpdate: (val: boolean) => void
) => {
  //  remarks: case of no selection
  if (selectedIntakes.length === 0) {
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
export const handle_candidates_status_cancel = (
  isUpdating: boolean,
  setTriggerUpdate: (val: boolean) => void,
  setUpdateDetails: (val: any) => void
) => {
  if (isUpdating) return;
  setTriggerUpdate(false);
  setUpdateDetails(null);
};

//  remarks: manage form submission (update candidates)
export const handle_candidates_status_submit = async (
  data: yup.InferType<typeof UpdateCandidateSchema>,
  selectedCandidates: number[],
  setIsUpdating: (val: boolean) => void,
  setSelectedCandidates: (val: any) => void,
  setTriggerUpdate: (val: boolean) => void,
  setRawIntakes: (val: IProbIntake[]) => void
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
      prob_status: updateData.prob_status,    //  remarks: only allow prob_status to be updated
    });
    alert(`[ManageIntakes] succeed: new user status has been updated.`);

    //  remarks: refresh intakes list (this handler is used from the probation intakes table)
    const res = await axios.get(API.PBT_INTAKES);
    const updatedIntakes = res?.data?.data?.result || [];
    setRawIntakes(updatedIntakes);
    setSelectedCandidates([]);
    setTriggerUpdate(false);
  } catch (err: any) {
    console.error('[ManageIntakes] error: update candidates:', {
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


//   ==========    Export data   ==========

  //  remarks: convert javascript object into designated file format to be exported
  //  ref: https://stackoverflow.com/questions/55613438/reactwrite-to-json-file-or-export-download-no-server
  export const handle_download = (data: any, format: string, setTrigger: (bool: boolean) => void) => {

    const content =
      format === 'json'
        ? JSON.stringify(data)   //  remarks: stringify, convert from object to json format
        : [
            //  learnt:  (1) csv firstly require table head details
            Object.keys(data[0] ?? {}).join(','),   
            //  learnt:  (2) csv then require list of data by rows
            ...data.map((row: any) => Object.values(row).join(',')),
          ].join('\n');   //  learnt: convert to csv format

    //  remarks: build export route
    //  learnt: (1) convert to the binary format data chunks
    const blob = new Blob([content], {
      type: format === 'json' ? 'application/json' : 'text/csv',
    });
    //  leanrt: (2) create data links for download connection
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');   // learnt: (a) build the <a> html tag
    link.href = url;   // learnt: (b) inject the href link as the created download connection
    link.download = `prob_intakes.${format}`;   // learnt: (c) specify download filename
    //  leanrt: (3) append new component at client side
    //  leanrt: keep the blob data and its connection will lead to memory leaks,
    //          client can keep create the additional data which consume memory without releasing 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);    // learnt: inactivate the url and link connection after activated download, then close window
    URL.revokeObjectURL(url);
    setTrigger(false);
  };