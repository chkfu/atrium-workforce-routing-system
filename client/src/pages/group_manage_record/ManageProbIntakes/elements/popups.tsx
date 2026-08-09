import { useIntakesContext } from '../utils/context';
import {
  ButtonConvertSubmit,
  ButtonConvertCancel,
  ButtonCandidateStatusSubmit,
  ButtonCandidateStatusCancel,
} from './buttons';
import { FormCreate } from './forms';
import ButtonClose from '../../../../elements/ButtonClose';
import { handle_candidates_status_cancel } from '../utils/handlers.ts';

//  remarks: popups for create new candidates record
export const PopupCreate = (): JSX.Element => {
  const { triggerCreate, setTriggerCreate } = useIntakesContext();
  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 pointer-events-none ${
        triggerCreate ? 'bg-opacity-20 opacity-100 pointer-events-auto' : 'bg-opacity-0 opacity-0'
      }`}
    >
      {triggerCreate && (
        <div className="relative bg-white rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] pointer-events-auto overflow-y-auto">
          <ButtonClose fn={() => setTriggerCreate(false)} />
          <FormCreate />
        </div>
      )}
    </div>
  );
};

//  remarks: popups for update candidates active status
export const PopupConvertActive = (): JSX.Element => {
  const { convertStatus, setConvertStatus, triggerConvert, setTriggerConvert } =
    useIntakesContext();
  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-900 pointer-events-none ${
        triggerConvert ? 'bg-opacity-20 opacity-100 pointer-events-auto' : 'bg-opacity-0 opacity-0'
      }`}
    >
      {triggerConvert && (
        <div className="relative bg-white rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 pointer-events-auto">
          <ButtonClose fn={() => setTriggerConvert(false)} />
          <h2 className="text-xl font-bold mb-3 text-gray-800">Convert Active</h2>
          <p className="text-gray-600 mb-4">Select a new status for the selected candidates.</p>
          {/* form elements */}
          <div className="mb-6 flex gap-12">
            <label className="p-2 flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="active"
                checked={convertStatus === true}
                onChange={() => setConvertStatus(true)}
                className="p-2 w-4 h-4 cursor-pointer"
              />
              <span className="text-gray-700 font-medium">Active</span>
            </label>

            <label className="p-2 flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={convertStatus === false}
                onChange={() => setConvertStatus(false)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-gray-700 font-medium">Inactive</span>
            </label>
          </div>
          <div className="flex gap-4 justify-end">
            <ButtonConvertSubmit />
            <ButtonConvertCancel />
          </div>
        </div>
      )}
    </div>
  );
};

//  remarks: popups for update candidates probation status
export const PopupCandidatesStatus = (): JSX.Element => {
  const { updateDetails, setUpdateDetails, isUpdating, triggerUpdate, setTriggerUpdate } =
    useIntakesContext();
  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-900 pointer-events-none ${
        triggerUpdate ? 'bg-opacity-20 opacity-100 pointer-events-auto' : 'bg-opacity-0 opacity-0'
      }`}
    >
      {triggerUpdate && (
        <div className="relative bg-white rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 pointer-events-auto">
          <ButtonClose
            fn={() => handle_candidates_status_cancel(isUpdating, setTriggerUpdate, setUpdateDetails)}
          />
          <h2 className="text-xl font-bold mb-3 text-gray-800">Update Progress</h2>
          <p className="text-gray-600 mb-4">Select a new probation status for the selected candidates.</p>
          {/* form elements */}
          <div className="mb-6">
            <select
              name="prob_status"
              value={updateDetails || ''}
              disabled={isUpdating}
              onChange={(el) => setUpdateDetails(el.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="selecting">Selecting</option>
              <option value="training">Training</option>
              <option value="completed">Completed</option>
              <option value="postponed">Postponed</option>
              <option value="withdrawn">Withdrawn</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="flex gap-4 justify-end">
            <ButtonCandidateStatusSubmit />
            <ButtonCandidateStatusCancel />
          </div>
        </div>
      )}
    </div>
  );
};