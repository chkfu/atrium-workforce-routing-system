import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonUpdateCancel,
  ButtonUpdateSubmit,
  ButtonCreateCancel,
  ButtonCreateSubmit,
  ButtonSortSubmit,
} from './buttons';
import FormTextField from '../../../elements/FormTextField';
import FormSelectInput from '../../../elements/FormSelectInput';
import ButtonClose from '../../../elements/ButtonClose';
import { CreateCandidateSchema, UpdateCandidateSchema } from '../utils/schema';
import {
  handle_create_submit,
  handle_temp_sort_reset,
  handle_update_submit,
} from '../utils/handlers';
import { useCandidateContext } from '../utils/context';
import { useSearchParams } from 'react-router-dom';

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

//  FILTERING

export const FormFiltering = (): JSX.Element => {
  return <></>;
};

//  SORTING

//  remarks: main form for sorting
export const FormSorting = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const { setSortAsc, setSortTarget, triggerSort, setTriggerSort } =
    useCandidateContext();
  //  display
  return (
    <form
      className={`fixed left-1/2 -translate-x-1/2 top-1/3 p-8 pb-5 lg:absolute lg:top-full lg:translate-y-[-4%] lg:right-0 lg:left-auto lg:translate-x-0 mt-3 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transform duration-300 ease-in-out ${triggerSort ? '-translate-y-8 opacity-100 visible' : 'translate-y-0 opacity-0 invisible'}`}
    >
      <ButtonClose
        fn={() =>
          handle_temp_sort_reset(setSortAsc, setSortTarget, setTriggerSort, searchParams)
        }
      />
      <OptionSortOrder />
      <div className='flex justify-center mt-2'>
        <ButtonSortSubmit />
      </div>
    </form>
  );
};

//  remarks: popup for sorting options
export const OptionSortOrder = (): JSX.Element => {
  const { sortAsc, setSortAsc, sortTarget, setSortTarget } =
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

//  remarks: dropdown selection for target page ranges
export const OptionPageLimit = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  //  display
  return (
    <select
      name='limit'
      value={searchParams.get('limit') || '20'}
      onChange={(el) => {
        setSearchParams((prev) => {
          prev.set('limit', el.target.value);
          prev.set('page', '1');
          return prev;
        });
      }}
      className='px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 cursor-pointer'
    >
      <option value='10'>10</option>
      <option value='15'>15</option>
      <option value='20'>20</option>
      <option value='50'>50</option>
    </select>
  );
};

//  remarks: dropdown selection for spec page
export const OptionPageSelect = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalPage } = useCandidateContext();
  const currentPage = parseInt(searchParams.get('page') || '1');
  //  display
  return (
    <select
      name='page'
      value={currentPage}
      onChange={(el) =>
        setSearchParams((prev) => {
          prev.set('page', el.target.value);
          return prev;
        })
      }
      className='px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 cursor-pointer'
    >
      {totalPage > 0 &&
        Array.from({ length: totalPage }, (_, index) => (
          <option
            key={index + 1}
            value={index + 1}
          >
            {index + 1}
          </option>
        ))}
    </select>
  );
};
