import { useStaffContext } from '../utils/context';
import { ButtonConvertSubmit, ButtonConvertCancel } from './buttons';
import { FormUpdate, FormCreate } from './forms';
import ButtonClose from '../../../../elements/ButtonClose';

//  remarks: popups for create new staff record
export const PopupCreate = (): JSX.Element => {
  const { triggerCreate, setTriggerCreate } = useStaffContext();
  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 pointer-events-none ${
        triggerCreate
          ? 'bg-opacity-20 opacity-100 pointer-events-auto'
          : 'bg-opacity-0 opacity-0'
      }`}
    >
      {triggerCreate && (
        <div className='relative bg-white rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] pointer-events-auto overflow-y-auto'>
          <ButtonClose fn={() => setTriggerCreate(false)} />
          <FormCreate />
        </div>
      )}
    </div>
  );
};

//  remarks: popups for update Staff details

export const PopupUpdate = (): JSX.Element => {
  const { triggerUpdate, setTriggerUpdate } = useStaffContext();
  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 pointer-events-none ${
        triggerUpdate
          ? 'bg-opacity-20 opacity-100 pointer-events-auto'
          : 'bg-opacity-0 opacity-0'
      }`}
    >
      {triggerUpdate && (
        <div className='relative bg-white rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] pointer-events-auto overflow-y-auto'>
          <ButtonClose fn={() => setTriggerUpdate(false)} />
          <FormUpdate />
        </div>
      )}
    </div>
  );
};

//  remarks: popups for update Staff active status
export const PopupConvertActive = (): JSX.Element => {
  const { convertStatus, setConvertStatus, triggerConvert, setTriggerConvert } = useStaffContext();
  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-900 pointer-events-none ${
        triggerConvert
          ? 'bg-opacity-20 opacity-100 pointer-events-auto'
          : 'bg-opacity-0 opacity-0'
      }`}
    >
      {triggerConvert && (
        <div className='relative bg-white rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 pointer-events-auto'>
          <ButtonClose fn={() => setTriggerConvert(false)} />
          <h2 className='text-xl font-bold mb-3 text-gray-800'>
            Convert Active
          </h2>
          <p className='text-gray-600 mb-4'>
            Select a new status for the selected Staff.
          </p>
          {/* form elements */}
          <div className='mb-6 flex gap-12'>
            <label className='p-2 flex items-center gap-3 cursor-pointer'>
              <input
                type='radio'
                name='status'
                value='active'
                checked={convertStatus === true}
                onChange={() => setConvertStatus(true)}
                className='p-2 w-4 h-4 cursor-pointer'
              />
              <span className='text-gray-700 font-medium'>Active</span>
            </label>

            <label className='p-2 flex items-center gap-3 cursor-pointer'>
              <input
                type='radio'
                name='status'
                value='inactive'
                checked={convertStatus === false}
                onChange={() => setConvertStatus(false)}
                className='w-4 h-4 cursor-pointer'
              />
              <span className='text-gray-700 font-medium'>Inactive</span>
            </label>
          </div>
          <div className='flex gap-4 justify-end'>
            <ButtonConvertSubmit />
            <ButtonConvertCancel />
          </div>
        </div>
      )}
    </div>
  );
};
