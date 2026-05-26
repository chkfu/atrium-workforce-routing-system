import axios from 'axios';
import { useCandidateContext } from '../utils/context';
import { API } from '../../../config/api';
import { COLORS } from '../../../styles/color';
import { PopupUpdate, PopupConvertActive } from './popups';
import ButtonConfirm from '../../../elements/ButtonConfirm';

//  remarks: button for batch update
export const ButtonUpdate = (): JSX.Element => {
  const { selectedCandidates, setTriggerUpdate } = useCandidateContext();
  return (
    <>
      <ButtonConfirm
        label='Update'
        onClick={() => {
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
        }}
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
        onClick={async () => {
          //  remarks: case of no selection
          if (selectedCandidates.length === 0) {
            alert('Please select any candidate.');
            return;
          }
          try {
            //  1. popup window, action works on popup window
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
        }}
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
      onClick={() => {
        if (isConverting) return;
        setTriggerConvert(false);
        setConvertStatus(null);
      }}
      style={{
        transition: 'all 1s ease',
        backgroundColor: COLORS.light_gray,
        color: COLORS.dark_teal,
        cursor: isConverting ? 'none' : 'pointer',
      }}
    />
  );
};

//  remarks: confirm button inside convert active popup
export const ButtonConvertConfirm = (): JSX.Element => {
  const {
    setCandidates,
    selectedCandidates,
    setSelectedCandidates,
    convertStatus,
    setConvertStatus,
    setTriggerConvert,
    isConverting,
    setIsConverting,
  } = useCandidateContext();
  return (
    <ButtonConfirm
      label={isConverting ? 'Loading...' : 'Confirm'}
      onClick={async () => {
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
          console.error(
            '[ManageCandidates] error: Error updating status:',
            err,
          );
          const errorMsg =
            err.response?.data?.message ||
            err.message ||
            '[ManageCandidates] error: Failed to update candidate status';
          alert(`Error: ${errorMsg}`);
        } finally {
          setIsConverting(false);
        }
      }}
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
