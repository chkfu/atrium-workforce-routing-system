import { useCandidateContext } from '../utils/context';
import { ButtonConvertSubmit, ButtonConvertCancel } from './buttons';
import { FormUpdate, FormCreate } from './forms';

//  remarks: popups for create new candidates record
export const PopupCreate = (): JSX.Element => {
  const { triggerCreate } = useCandidateContext();
  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 pointer-events-none ${
        triggerCreate
          ? 'bg-opacity-20 opacity-100 pointer-events-auto'
          : 'bg-opacity-0 opacity-0'
      }`}
    >
      {triggerCreate && (
        <div className='bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 pointer-events-auto'>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>
            Create New Candidates
          </h2>
          <p className='text-gray-600 mb-6'>
            Fill in the details to create new candidates.
          </p>
          {/* form elements */}
          <div className='space-y-4'>
            <FormCreate />
          </div>
        </div>
      )}
    </div>
  );
};

//  remarks: popups for update candidates details

export const PopupUpdate = (): JSX.Element => {
  const { triggerUpdate } = useCandidateContext();
  return (
    <div
      className={`fixed inset-0 bg-gray-500 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 pointer-events-none ${
        triggerUpdate
          ? 'bg-opacity-20 opacity-100 pointer-events-auto'
          : 'bg-opacity-0 opacity-0'
      }`}
    >
      {triggerUpdate && (
        <div className='bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 pointer-events-auto'>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>
            Update Candidates Details
          </h2>
          <p className='text-gray-600 mb-6'>
            Fill in the details to update the selected candidates.
          </p>
          {/* form elements */}
          <div className='space-y-4'>
            <FormUpdate />
          </div>
        </div>
      )}
    </div>
  );
};

//  remarks: popups for update candidates active status

export const PopupConvertActive = (): JSX.Element => {
  const { convertStatus, setConvertStatus, triggerConvert } =
    useCandidateContext();
  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-900 pointer-events-none ${
        triggerConvert
          ? 'bg-opacity-20 opacity-100 pointer-events-auto'
          : 'bg-opacity-0 opacity-0'
      }`}
    >
      {triggerConvert && (
        <div className='bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 pointer-events-auto'>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>
            Convert Active
          </h2>
          <p className='text-gray-600 mb-6'>
            Select a new status for the selected candidates.
          </p>
          {/* form elements */}
          <div className='mb-6 flex gap-12'>
            <label className='flex items-center gap-3 cursor-pointer'>
              <input
                type='radio'
                name='status'
                value='active'
                checked={convertStatus === true}
                onChange={() => setConvertStatus(true)}
                className='w-4 h-4 cursor-pointer'
              />
              <span className='text-gray-700 font-medium'>Active</span>
            </label>

            <label className='flex items-center gap-3 cursor-pointer'>
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
