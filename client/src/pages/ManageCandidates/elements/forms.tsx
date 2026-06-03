import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonUpdateCancel,
  ButtonUpdateSubmit,
  ButtonCreateCancel,
  ButtonCreateSubmit,
} from './buttons';
import FormTextField from '../../../elements/FormTextField';
import FormSelectInput from '../../../elements/FormSelectInput';
import { CreateCandidateSchema, UpdateCandidateSchema } from '../utils/schema';
import { handle_create_submit, handle_update_submit } from '../utils/handlers';
import { useCandidateContext } from '../utils/context';
import { COLORS } from '../../../styles/color';
import close from '../../../assets/svg/close_icon.svg';

//  CREATE

export function FormCreate() {
  //  declaration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateCandidateSchema),
  });
  const { setIsCreating, setCandidates, setTriggerCreate } =
    useCandidateContext();

  function recalling(data: any) {
    handle_create_submit(data, setIsCreating, setCandidates, setTriggerCreate);
  }
  //  display
  return (
    <form onSubmit={handleSubmit(recalling)}>
      {/*  section: field inputs  */}
      <FormTextField
        label='First Name'
        register={register('first_name')}
        error={errors.first_name}
        required={true}
      />
      <FormTextField
        label='Last Name'
        register={register('last_name')}
        error={errors.last_name}
        required={true}
      />
      <FormTextField
        label='Email'
        type='email'
        register={register('email')}
        error={errors.email}
        required={true}
      />
      <FormSelectInput
        label='Gender'
        register={register('gender')}
        error={errors.gender}
        required={true}
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
      />
      <FormSelectInput
        label='Probation Status'
        register={register('prob_status')}
        error={errors.prob_status}
        required={true}
        options={[
          { value: 'selecting', label: 'Selecting' },
          { value: 'training', label: 'Training' },
          { value: 'completed', label: 'Completed' },
          { value: 'postponed', label: 'Postponed' },
          { value: 'withdrawn', label: 'Withdrawn' },
          { value: 'failed', label: 'Failed' },
        ]}
        className='mb-6'
      />

      {/*  section: buttons  */}
      <div className='flex gap-4 justify-end mt-6'>
        <ButtonCreateCancel />
        <ButtonCreateSubmit />
      </div>
    </form>
  );
}

//  UPDATE

export function FormUpdate() {
  //  declaration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UpdateCandidateSchema),
  });
  const {
    selectedCandidates,
    setIsUpdating,
    setCandidates,
    setSelectedCandidates,
    setTriggerUpdate,
  } = useCandidateContext();

  function recalling(data: any) {
    handle_update_submit(
      data,
      selectedCandidates,
      setIsUpdating,
      setCandidates,
      setSelectedCandidates,
      setTriggerUpdate,
    );
  }
  //  display
  return (
    <form onSubmit={handleSubmit(recalling)}>
      {/*  section: field inputs  */}
      <FormTextField
        label='First Name'
        register={register('first_name')}
        error={errors.first_name}
      />
      <FormTextField
        label='Last Name'
        register={register('last_name')}
        error={errors.last_name}
      />
      <FormTextField
        label='Email'
        type='email'
        register={register('email')}
        error={errors.email}
      />
      <FormSelectInput
        label='Gender'
        register={register('gender')}
        error={errors.gender}
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
      />
      <FormSelectInput
        label='Probation Status'
        register={register('prob_status')}
        error={errors.prob_status}
        options={[
          { value: 'selecting', label: 'Selecting' },
          { value: 'training', label: 'Training' },
          { value: 'completed', label: 'Completed' },
          { value: 'postponed', label: 'Postponed' },
          { value: 'withdrawn', label: 'Withdrawn' },
          { value: 'failed', label: 'Failed' },
        ]}
        className='mb-6'
      />

      {/*  section: buttons  */}
      <div className='flex gap-4 justify-end mt-6'>
        <ButtonUpdateCancel />
        <ButtonUpdateSubmit onClick={handleSubmit(recalling)} />
      </div>
    </form>
  );
}

//  SORTING

//  remarks: main form for sorting
export const FormSorting = (): JSX.Element => {
  const { triggerSort } = useCandidateContext();
  //  display
  return (
    <form
      className={`absolute p-8 pb-5 top-full translate-y-[-12%] right-0 mt-3 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transform duration-300 ease-in-out ${triggerSort ? '-translate-y-8 opacity-100 visible' : 'translate-y-0 opacity-0 invisible'}`}
    >
      <OptionSortTarget />
      <OptionSortOrder />
    </form>
  );
};

//  remarks: manage convert active popup (convert active)
export const OptionSortTarget = (): JSX.Element => {
  const { setTriggerSort } = useCandidateContext();
  //  display
  return (
    <button
      type='button'
      className='px-2 absolute top-4 right-2 text-gray-500 hover:text-gray-700 active:scale-95'
      onClick={() => setTriggerSort(false)}
    >
      <img
        src={close}
        alt='close'
        width='20'
        height='20'
        className='cursor-pointer hover:brightness-50 transition-all duration-600'
        style={{ color: COLORS.dark_teal }}
      />
    </button>
  );
};

//  remarks: popup for sorting options
export const OptionSortOrder = (): JSX.Element => {
  const { sortTarget, setSortTarget, sortAsc, setSortAsc } =
    useCandidateContext();
  //  display
  return (
    <div className='py-1'>
      {/*  section: box title  */}
      <div>
        <h4 className='text-md font-bold text-teal-800 font-serif mb-2'>
          Sorting Preferences
        </h4>
      </div>
      {/*  section: sorting options */}
      <div className='py-2 flex items-center justify-between'>
        {/*  option 1: sort target  */}
        <label className='text-sm font-medium text-gray-700'>Target:</label>
        <select
          className='w-36 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
          value={sortTarget}
          onChange={(el) => setSortTarget(el.target.value)}
        >
          <option value='_id'>ID</option>
          <option value='first_name'>Name</option>
          <option value='email'>Email</option>
          <option value='prob_status'>Status</option>
          <option value='created_at'>Created date</option>
          <option value='updated_at'>Updated date</option>
        </select>
      </div>
      {/*  option 2: sort order  */}
      <div className='py-1 flex items-center gap-3'>
        <label className='pr-6 text-sm font-medium text-gray-700'>Order:</label>
        <div className='flex gap-3'>
          {['asc', 'desc'].map((order) => (
            <label
              key={order}
              className='flex items-center gap-2 cursor-pointer'
            >
              <input
                type='radio'
                name='sort_order'
                value={order}
                checked={order === 'asc' ? sortAsc : !sortAsc}
                onChange={() => setSortAsc(order === 'asc')}
                className='w-4 h-4'
              />
              <span className='text-sm text-gray-700'>
                {order.charAt(0).toUpperCase() + order.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
