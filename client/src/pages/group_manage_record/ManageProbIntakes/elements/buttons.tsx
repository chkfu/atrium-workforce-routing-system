import { useState } from 'react';
import { useIntakesContext } from '../utils/context';
import { useSearchParams } from 'react-router-dom';
import { COLORS } from '../../../../styles/color';
import { PopupCreate, PopupConvertActive, PopupCandidatesStatus, PopupExportData } from './popups';
import ButtonConfirm from '../../../../elements/ButtonConfirm';
import sort_asc from '../../../../assets/svg/sort-asc.svg';
import {
  handle_convert_submit,
  handle_convert_popup,
  handle_convert_cancel,
  handle_candidates_status_popup,
  handle_candidates_status_submit,
  handle_candidates_status_cancel,
  handle_sort_submit,
  handle_filter_submit,
  handle_temp_filter_clear,
  handle_delete_submit,
} from '../utils/handlers';
import type { UpdateCandidateSchema } from '../utils/schema';
import type * as yup from 'yup';
import filter from '../../../../assets/svg/filter_icon.svg';

//  POST: candidates

//  remarks: button for batch create

export const ButtonCreate = (): JSX.Element => {
  const { setTriggerCreate } = useIntakesContext();
  return (
    <>
      <ButtonConfirm
        label="Create"
        onClick={() => setTriggerCreate(true)}
        style={{ backgroundColor: COLORS.dark_teal, color: 'white' }}
      />
      <PopupCreate />
    </>
  );
};

export const ButtonCreateCancel = (): JSX.Element => {
  const { isCreating, setTriggerCreate } = useIntakesContext();
  return (
    <ButtonConfirm
      label="Cancel"
      onClick={() => {
        if (!isCreating) setTriggerCreate(false);
      }}
      style={{
        transition: 'all 0.5s ease',
        backgroundColor: COLORS.light_gray,
        color: COLORS.dark_teal,
        cursor: isCreating ? 'none' : 'pointer',
      }}
    />
  );
};

export const ButtonCreateSubmit = ({
  onClick,
}: {
  onClick?: () => void;
} = {}): JSX.Element => {
  const { isCreating } = useIntakesContext();
  return (
    <ButtonConfirm
      label={isCreating ? 'Loading...' : 'Confirm'}
      onClick={onClick}
      type="submit"
      style={{
        transition: 'all 0.5s ease',
        backgroundColor: COLORS.dark_teal,
        color: COLORS.light_gray,
        cursor: isCreating ? 'none' : 'pointer',
      }}
      disabled={isCreating}
    />
  );
};


//  PATCH: active status

//  remarks:  button for batch update active status
export const ButtonConvertActive = (): JSX.Element => {
  const { selectedIntakes, setTriggerConvert } = useIntakesContext();
  return (
    <>
      <ButtonConfirm
        label="Convert Active"
        onClick={() => handle_convert_popup(selectedIntakes, setTriggerConvert)}
        style={{ backgroundColor: COLORS.light_gray, color: COLORS.dark_teal }}
      />
      {/* remarks: pop up content */}
      <PopupConvertActive />
    </>
  );
};

//  remarks: buttons inside convert active popup
export const ButtonConvertCancel = (): JSX.Element => {
  const { isConverting, setTriggerConvert, setConvertStatus } = useIntakesContext();
  return (
    <ButtonConfirm
      label="Cancel"
      onClick={() => handle_convert_cancel(isConverting, setTriggerConvert, setConvertStatus)}
      style={{
        transition: 'all 1s ease',
        backgroundColor: COLORS.light_gray,
        color: COLORS.dark_teal,
        cursor: isConverting ? 'none' : 'pointer',
      }}
    />
  );
};

//  remarks: submit button inside convert active popup
export const ButtonConvertSubmit = (): JSX.Element => {
  const {
    convertStatus,
    isConverting,
    selectedIntakes,
    setIsConverting,
    setSelectedIntakes,
    setConvertStatus,
    setTriggerConvert,
    setRawIntakes,
  } = useIntakesContext();
  return (
    <ButtonConfirm
      label={isConverting ? 'Loading...' : 'Confirm'}
      onClick={() =>
        handle_convert_submit(
          convertStatus,
          selectedIntakes,
          isConverting,
          setIsConverting,
          setSelectedIntakes,
          setConvertStatus,
          setTriggerConvert,
          setRawIntakes
        )
      }
      style={{
        transition: 'all 0.5s ease',
        backgroundColor: COLORS.dark_teal,
        color: COLORS.light_gray,
        opacity: convertStatus === null ? 0 : 1,
        cursor: isConverting ? 'none' : 'pointer',
      }}
      disabled={convertStatus === null || isConverting}
    />
  );
};

//  DELETE
export const ButtonDelete = (): JSX.Element => {
  const { selectedIntakes, setSelectedIntakes, isDeleting, setIsDeleting, setRawIntakes } = useIntakesContext();
  return (
    <ButtonConfirm
      label={isDeleting ? 'Loading...' : 'Delete'}
      onClick={() =>
        handle_delete_submit(selectedIntakes, setIsDeleting, setSelectedIntakes, setRawIntakes)
      }
      style={{
        backgroundColor: COLORS.light_gray,
        color: COLORS.dark_teal,
        cursor: isDeleting ? 'none' : 'pointer',
      }}
      disabled={isDeleting}
    />
  );
}

//  SWITCH CANDIDATE STATUS

export const ButtonCandidateStatusTrigger = (): JSX.Element => {
  const { selectedIntakes, setTriggerUpdate } = useIntakesContext();
  return (
    <>
      <ButtonConfirm
        label="Update Progress"
        onClick={() => handle_candidates_status_popup(selectedIntakes, setTriggerUpdate)}
        style={{ backgroundColor: COLORS.light_gray, color: COLORS.dark_teal }}
      />
      <PopupCandidatesStatus />
    </>
  );
};

//  remarks: cancel button inside candidate status popup
export const ButtonCandidateStatusCancel = (): JSX.Element => {
  const { isUpdating, setTriggerUpdate, setUpdateDetails } = useIntakesContext();
  return (
    <ButtonConfirm
      label="Cancel"
      onClick={() => handle_candidates_status_cancel(isUpdating, setTriggerUpdate, setUpdateDetails)}
      style={{
        transition: 'all 1s ease',
        backgroundColor: COLORS.light_gray,
        color: COLORS.dark_teal,
        cursor: isUpdating ? 'none' : 'pointer',
      }}
    />
  );
};

//  remarks: save button inside candidate status popup
export const ButtonCandidateStatusSubmit = (): JSX.Element => {
  const { rawIntakes } = useIntakesContext()
  const {
    updateDetails,
    isUpdating,
    selectedIntakes,
    setIsUpdating,
    setSelectedIntakes,
    setTriggerUpdate,
    setRawIntakes
  } = useIntakesContext();
  return (
    <ButtonConfirm
      label={isUpdating ? 'Loading...' : 'Save'}
      onClick={() => {
        //  learnt: patch targets `candidates`, but selection tracks intake rows -
        //  translate via the joined `candidate_id` before submitting
        const candidateIds = rawIntakes
          .filter((row: any) => selectedIntakes.includes(row.intake_id))
          .map((row: any) => row.candidate_id);
        handle_candidates_status_submit(
          { prob_status: updateDetails } as yup.InferType<typeof UpdateCandidateSchema>,
          candidateIds,
          setIsUpdating,
          setSelectedIntakes,
          setTriggerUpdate,
          setRawIntakes
        );
      }}
      style={{
        transition: 'all 0.5s ease',
        backgroundColor: COLORS.dark_teal,
        color: COLORS.light_gray,
        opacity: updateDetails ? 1 : 0,
        cursor: isUpdating ? 'none' : 'pointer',
      }}
      disabled={!updateDetails || isUpdating}
    />
  );
};

export const ButtonSwitchStatus = ({
  onClick,
  isConverting,
}: {
  onClick: () => void;
  isConverting: boolean;
}): JSX.Element => {
  return (
    <ButtonConfirm
      label={isConverting ? 'Loading...' : 'Confirm'}
      onClick={onClick}
      style={{
        transition: 'all 0.5s ease',
        backgroundColor: COLORS.dark_teal,
        color: COLORS.light_gray,
        cursor: isConverting ? 'none' : 'pointer',
      }}
      disabled={isConverting}
    />
  );
}

//  EXPORT DATA

export const ButtonExportDataTrigger = (): JSX.Element => {
  const { selectedIntakes, rawIntakes } = useIntakesContext();
  const [triggerPopup, setTriggerPopup] = useState<boolean>(false);
  const intake_arr = rawIntakes.filter((el) => selectedIntakes.includes(el.intake_id));
  return (
    <>
      <ButtonConfirm
        label="Export Data"
        type="button"
        style={{ backgroundColor: COLORS.light_gray, color: COLORS.dark_teal }}
        onClick={() => setTriggerPopup(true)}
        disabled={selectedIntakes.length === 0}
      />
      <PopupExportData trigger={triggerPopup} setTrigger={setTriggerPopup} data={intake_arr} />
    </>
  );
}

//  SORTING

//  remarks: trigger of sorting form
export const ButtonSort = (): JSX.Element => {
  const { setTriggerFilter, triggerSort, setTriggerSort } = useIntakesContext();
  //  display
  return (
    <button
      onClick={() => {
        setTriggerFilter(false);
        setTriggerSort(!triggerSort);
      }}
      type="button"
      className={`w-10 h-10 flex items-center justify-center shadow-sm rounded-full bg-gray-300 cursor-pointer active:scale-95 transition duration-300 ${triggerSort ? 'bg-teal-100' : ''}`}
    >
      <img src={sort_asc} alt="sort ascendingly" width="24" height="24" className="text-teal-800" />
    </button>
  );
};

//  remarks: submit button inside sorting form
export const ButtonSortSubmit = (): JSX.Element => {
  const [_, setSearchParams] = useSearchParams();
  const { sortAsc, sortTarget, setTriggerSort } = useIntakesContext();
  //  display
  return (
    <ButtonConfirm
      label="Confirm"
      onClick={() => handle_sort_submit(sortAsc, sortTarget, setTriggerSort, setSearchParams)}
      type="button"
      style={{
        backgroundColor: COLORS.dark_teal,
        color: COLORS.light_gray,
      }}
    />
  );
};

//  FILTERING

//  remarks: trigger of filtering form
export const ButtonFilter = (): JSX.Element => {
  const { setTriggerSort, triggerFilter, setTriggerFilter } = useIntakesContext();
  return (
    <button
      type="button"
      className={`w-10 h-10 flex items-center justify-center shadow-sm rounded-full bg-gray-300 cursor-pointer active:scale-95 transition duration-300 ${triggerFilter ? 'bg-teal-100' : ''}`}
      onClick={() => {
        setTriggerSort(false);
        setTriggerFilter(!triggerFilter);
      }}
    >
      <img src={filter} alt="filter_active" width="24" height="24" className="text-teal-800" />
    </button>
  );
};

//  remarks: clear all filter values and params
export const ButtonFilterClear = (): JSX.Element => {
  const [_, setSearchParams] = useSearchParams();
  const {
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
  } = useIntakesContext();

  return (
    <ButtonConfirm
      label="Clear"
      onClick={() =>
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
        )
      }
      style={{ backgroundColor: COLORS.light_gray, color: COLORS.dark_teal }}
    />
  );
};

//  remarks: submit button inside filtering form
export const ButtonFilterSubmit = (): JSX.Element => {
  const [_, setSearchParams] = useSearchParams();
  const {
    filterName,
    filterGender,
    filterProbStatus,
    filterDept,
    filterStrategy,
    filterIsActive,
    filterCreatedFrom,
    filterCreatedTo,
    filterUpdatedFrom,
    filterUpdatedTo,
    setTriggerFilter,
    setTriggerSort,
  } = useIntakesContext();
  return (
    <ButtonConfirm
      label="Confirm"
      onClick={() => {
        handle_filter_submit(
          filterName,
          filterGender,
          filterProbStatus,
          filterDept,
          filterStrategy,
          filterIsActive,
          filterCreatedFrom,
          filterCreatedTo,
          filterUpdatedFrom,
          filterUpdatedTo,
          setTriggerFilter,
          setSearchParams
        );
        setTriggerSort(false);
      }}
      type="button"
      style={{
        backgroundColor: COLORS.dark_teal,
        color: COLORS.light_gray,
      }}
    />
  );
};
