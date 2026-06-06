import { useCandidateContext } from '../utils/context';
import { COLORS } from '../../../styles/color';
import { PopupCreate, PopupUpdate, PopupConvertActive } from './popups';
import ButtonConfirm from '../../../elements/ButtonConfirm';
import sort_asc from '../../../assets/svg/sort-asc.svg';
import {
  handle_convert_submit,
  handle_convert_popup,
  handle_convert_cancel,
  handle_temp_sort_reset,
  handle_sort_submit,
} from '../utils/handlers';
import filter from '../../../assets/svg/filter_icon.svg';

//  POST: candidates

//  remarks: button for batch create

export const ButtonCreate = (): JSX.Element => {
  const { setTriggerCreate } = useCandidateContext();
  return (
    <>
      <ButtonConfirm
        label='Create'
        onClick={() => setTriggerCreate(true)}
        style={{ backgroundColor: COLORS.dark_teal, color: 'white' }}
      />
      <PopupCreate />
    </>
  );
};

export const ButtonCreateCancel = (): JSX.Element => {
  const { isCreating, setTriggerCreate } = useCandidateContext();
  return (
    <ButtonConfirm
      label='Cancel'
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
  const { isCreating } = useCandidateContext();
  return (
    <ButtonConfirm
      label={isCreating ? 'Loading...' : 'Confirm'}
      onClick={onClick}
      type='submit'
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

//  PATCH: candidates

//  remarks: button for batch update
export const ButtonUpdate = (): JSX.Element => {
  const { selectedCandidates, setTriggerUpdate } = useCandidateContext();
  const handleClick = () => {
    if (selectedCandidates.length === 0) {
      alert('Please select any candidate.');
      return;
    }
    setTriggerUpdate(true);
  };
  return (
    <>
      <ButtonConfirm
        label='Update'
        onClick={handleClick}
        style={{ backgroundColor: COLORS.light_gray, color: COLORS.dark_teal }}
      />
      {/* remarks: pop up content */}
      <PopupUpdate />
    </>
  );
};

//  remarks: cancel button for update candidate popup
export const ButtonUpdateCancel = (): JSX.Element => {
  const { isUpdating, setTriggerUpdate } = useCandidateContext();
  return (
    <ButtonConfirm
      label='Cancel'
      onClick={() => {
        if (!isUpdating) setTriggerUpdate(false);
      }}
      style={{
        transition: 'all 0.5s ease',
        backgroundColor: COLORS.light_gray,
        color: COLORS.dark_teal,
        cursor: isUpdating ? 'none' : 'pointer',
      }}
    />
  );
};

//  remarks: submit button for update candidate popup
export const ButtonUpdateSubmit = ({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element => {
  const { isUpdating } = useCandidateContext();
  return (
    <ButtonConfirm
      label={isUpdating ? 'Loading...' : 'Update'}
      onClick={onClick}
      style={{
        transition: 'all 0.5s ease',
        backgroundColor: '#4a90a4',
        color: '#f5f5f5',
        cursor: isUpdating ? 'none' : 'pointer',
      }}
      disabled={isUpdating}
    />
  );
};

//  PATCH: active status

//  remarks:  button for batch update active status
export const ButtonConvertActive = (): JSX.Element => {
  const { selectedCandidates, setTriggerConvert } = useCandidateContext();
  return (
    <>
      <ButtonConfirm
        label='Convert Active'
        onClick={() =>
          handle_convert_popup(selectedCandidates, setTriggerConvert)
        }
        style={{ backgroundColor: COLORS.light_gray, color: COLORS.dark_teal }}
      />
      {/* remarks: pop up content */}
      <PopupConvertActive />
    </>
  );
};

//  remarks: buttons inside convert active popup
export const ButtonConvertCancel = (): JSX.Element => {
  const { isConverting, setTriggerConvert, setConvertStatus } =
    useCandidateContext();
  return (
    <ButtonConfirm
      label='Cancel'
      onClick={() =>
        handle_convert_cancel(isConverting, setTriggerConvert, setConvertStatus)
      }
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
    selectedCandidates,
    setIsConverting,
    setCandidates,
    setSelectedCandidates,
    setConvertStatus,
    setTriggerConvert,
  } = useCandidateContext();
  return (
    <ButtonConfirm
      label={isConverting ? 'Loading...' : 'Confirm'}
      onClick={() =>
        handle_convert_submit(
          convertStatus,
          selectedCandidates,
          isConverting,
          setIsConverting,
          setCandidates,
          setSelectedCandidates,
          setConvertStatus,
          setTriggerConvert,
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

//  SORTING

export const ButtonSort = (): JSX.Element => {
  const {
    triggerSort,
    setTriggerSort,
    sortAsc,
    sortTarget,
    setTempSortAsc,
    setTempSortTarget,
  } = useCandidateContext();
  //  display
  return (
    <button
      onClick={() =>
        handle_temp_sort_reset(
          sortAsc,
          sortTarget,
          setTempSortAsc,
          setTempSortTarget,
          setTriggerSort,
        )
      }
      type='button'
      className={`w-10 h-10 flex items-center justify-center shadow-sm rounded-full bg-gray-300 cursor-pointer active:scale-95 transition duration-300 ${triggerSort ? 'bg-teal-100' : ''}`}
    >
      <img
        src={sort_asc}
        alt='sort ascendingly'
        width='24'
        height='24'
        className='text-teal-800'
      />
    </button>
  );
};

export const ButtonSortSubmit = (): JSX.Element => {
  const {
    tempSortAsc,
    tempSortTarget,
    setSortAsc,
    setSortTarget,
    setTriggerSort,
  } = useCandidateContext();
  return (
    <ButtonConfirm
      label='Confirm'
      onClick={() => handle_sort_submit(tempSortAsc, tempSortTarget, setSortAsc, setSortTarget, setTriggerSort)}
      type='button'
      style={{
        backgroundColor: COLORS.dark_teal,
        color: COLORS.light_gray,
      }}
    />
  );
};

//  FILTERING

export const ButtonFilter = (): JSX.Element => {
  return (
    <button
      type='button'
      className='w-10 h-10 flex items-center justify-center shadow-sm rounded-full bg-gray-300 cursor-pointer active:scale-95 transition duration-200'
    >
      <img
        src={filter}
        alt='filter_active'
        width='24'
        height='24'
        className='text-teal-800'
      />
    </button>
  );
};
