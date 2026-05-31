import axios from 'axios';
import * as yup from 'yup';
import { API } from '../../../config/api';

//  ==========  checkbox status  ==========

//  remarks: manage record checkbox status (main table)
export const handle_checkbox_status = (
  id: number,
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>,
) => {
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
export const handle_checkbox_select_all = (
  event: React.ChangeEvent<HTMLInputElement>,
  candidates: any[],
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  const checked = event.target.checked;
  if (checked && candidates && candidates.length > 0) {
    const id_list = candidates.map((candidate) => candidate._id as number);
    setSelectedCandidates(id_list);
  } else {
    setSelectedCandidates([]);
  }
};

//  ==========  create candidates  ==========

export const handle_create_popup = (
  setTriggerCreate: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setTriggerCreate(true);
  } catch (err: any) {
    // remarks: error handling
    console.error('Batch Create Error:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || '[ManageCandidates] error: Failed to create candidates'}`,
    );
  }
};

//  remarks: manage form submission (create candidates)
export const handle_create_submit = async (
  data: yup.InferType<typeof CreateCandidateSchema>,
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>,
  setCandidates: React.Dispatch<React.SetStateAction<any[]>>,
  setTriggerCreate: React.Dispatch<React.SetStateAction<boolean>>,
  CreateCandidateSchema: any,
) => {
  try {
    //  learnt: remove empty string values for enum fields
    const new_data: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== '') {
        new_data[key] = value;
        new_data['is_active'] = true;
      }
    }

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
    setCandidates(createdCandidates);
    setTriggerCreate(false);
  } catch (err: any) {
    console.error('[ManageCandidates] error: create candidates:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || 'Error: Failed to create candidate. Please try again later.'}`,
    );
  } finally {
    setIsCreating(false);
  }
};

//  ==========  update candidates  ==========

//  remarks: manage update popup (update candidates)
export const handle_update_popup = (
  selectedCandidates: number[],
  setTriggerUpdate: React.Dispatch<React.SetStateAction<boolean>>,
) => {
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
      `Error: ${err.response?.data?.message || err.message || '[ManageCandidates] error: Failed to update candidates'}`,
    );
  }
};

//  remarks: cancel button inside update popup (update candidates)
export const handle_update_cancel = (
  isUpdating: boolean,
  setTriggerUpdate: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (isUpdating) return;
  setTriggerUpdate(false);
};

//  remarks: manage form submission (update candidates)
export const handle_update_submit = async (
  data: yup.InferType<typeof UpdateCandidateSchema>, // learnt: compile data from yup format
  selectedCandidates: number[],
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  setCandidates: React.Dispatch<React.SetStateAction<any[]>>,
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>,
  setTriggerUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  UpdateCandidateSchema: any,
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
    setCandidates(updatedCandidates);
    setSelectedCandidates([]);
    setTriggerUpdate(false);
  } catch (err: any) {
    console.error('[ManageCandidates] error: update candidates:', {
      error: err,
      message: err.message,
    });
    alert(
      `Error: ${err.response?.data?.message || err.message || 'Error: Failed to update candidate status. Please try again later.'}`,
    );
  } finally {
    setIsUpdating(false);
  }
};

//  ==========  convert active status  ==========

//  remarks: manage convert active popup (convert active)
export const handle_convert_popup = (
  selectedCandidates: number[],
  setTriggerConvert: React.Dispatch<React.SetStateAction<boolean>>,
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
      `Error: ${err.response?.data?.message || err.message || '[ManageCandidates] error: Failed to update candidate status'}`,
    );
  }
};

//  remarks: cancel button inside convert active popup
export const handle_convert_cancel = (
  isConverting: boolean,
  setTriggerConvert: React.Dispatch<React.SetStateAction<boolean>>,
  setConvertStatus: React.Dispatch<React.SetStateAction<boolean | null>>,
) => {
  if (isConverting) return;
  setTriggerConvert(false);
  setConvertStatus(null);
};

//  remarks: manage form submission (convert active)
export const handle_convert_submit = async (
  selectedCandidates: number[],
  convertStatus: boolean | null,
  isConverting: boolean,
  setIsConverting: React.Dispatch<React.SetStateAction<boolean>>,
  setCandidates: React.Dispatch<React.SetStateAction<any[]>>,
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>,
  setConvertStatus: React.Dispatch<React.SetStateAction<boolean | null>>,
  setTriggerConvert: React.Dispatch<React.SetStateAction<boolean>>,
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
    setCandidates(data);
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
