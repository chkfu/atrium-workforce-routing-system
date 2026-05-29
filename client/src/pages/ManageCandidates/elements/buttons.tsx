import { useCandidateContext } from '../utils/context';
import { COLORS } from '../../../styles/color';
import { PopupUpdate, PopupConvertActive } from './popups';
import ButtonConfirm from '../../../elements/ButtonConfirm';
import {
  handle_convert_submit,
  handle_convert_popup,
  handle_convert_cancel,
  handle_update_popup,
  handle_update_cancel,
} from '../utils/handlers';

//  remarks: button for batch update
export const ButtonUpdate = (): JSX.Element => {
  const { selectedCandidates, setTriggerUpdate } = useCandidateContext();
  return (
    <>
      <ButtonConfirm
        label='Update'
        onClick={() =>
          handle_update_popup(selectedCandidates, setTriggerUpdate)
        }
        style={{ backgroundColor: COLORS.light_gray, color: COLORS.dark_teal }}
      />
      {/* remarks: pop up content */}
      <PopupUpdate />
    </>
  );
};

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
  const { setTriggerConvert, setConvertStatus, isConverting } =
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
    selectedCandidates,
    convertStatus,
    isConverting,
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
          selectedCandidates,
          convertStatus,
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

//  remarks: cancel button for update candidate popup
export const ButtonUpdateCancel = (): JSX.Element => {
  const { isUpdating, setTriggerUpdate } = useCandidateContext();
  return (
    <ButtonConfirm
      label='Cancel'
      onClick={() => handle_update_cancel(isUpdating, setTriggerUpdate)}
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
