import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterTextField from '../../../elements/FilterTextField';
import FilterSelectInput from '../../../elements/FilterSelectInput';
import FilterDateRangeInput from '../../../elements/FilterDateRangeInput';
import {
  ButtonUpdateCancel,
  ButtonUpdateSubmit,
  ButtonCreateCancel,
  ButtonCreateSubmit,
  ButtonSortSubmit,
  ButtonFilterClear,
  ButtonFilterSubmit,
} from './buttons';
import FormTextField from '../../../elements/FormTextField';
import FormSelectInput from '../../../elements/FormSelectInput';
import ButtonClose from '../../../elements/ButtonClose';
import { CreateCandidateSchema, UpdateCandidateSchema } from '../utils/schema';
import {
  handle_create_submit,
  handle_temp_sort_reset,
  handle_update_submit,
  handle_temp_filter_reset,
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
    <form onSubmit={handleSubmit(recalling)} className='flex flex-col h-96'>
      <h3 className='text-lg font-semibold text-gray-800 mb-4 shrink-0'>
        Create Candidate
      </h3>

      {/*  section: field inputs - scrollable  */}
      <div className='overflow-y-auto flex-1'>
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
        />
      </div>

      {/*  section: buttons - fixed at bottom  */}
      <div className='flex gap-4 justify-end mt-4 shrink-0'>
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
    <form onSubmit={handleSubmit(recalling)} className='flex flex-col h-96'>
      <h3 className='text-lg font-semibold text-gray-800 mb-4 shrink-0'>
        Update Candidate
      </h3>

      {/*  section: field inputs - scrollable  */}
      <div className='overflow-y-auto flex-1'>
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
        />
      </div>

      {/*  section: buttons - fixed at bottom  */}
      <div className='flex gap-4 justify-end mt-4 shrink-0'>
        <ButtonUpdateCancel />
        <ButtonUpdateSubmit onClick={handleSubmit(recalling)} />
      </div>
    </form>
  );
}

//  FILTERING

export const FormFiltering = (): JSX.Element => {
  const [_, setSearchParams] = useSearchParams();
  const {
    triggerFilter,
    setTriggerFilter,
    setFilterName,
    setFilterEmail,
    setFilterGender,
    setFilterProbStatus,
    setFilterIsActive,
    setFilterCreatedFrom,
    setFilterCreatedTo,
    setFilterUpdatedFrom,
    setFilterUpdatedTo,
  } = useCandidateContext();

  return (
    <form
      className={`fixed left-1/2 -translate-x-1/2 top-[48%] -translate-y-1/2 border-gray-300 p-8 pb-5 lg:absolute lg:top-full lg:-translate-y-2 lg:right-0 lg:left-auto lg:translate-x-0 mt-3 w-108 bg-white border rounded-lg shadow-lg z-50 transform duration-600 transition-all flex flex-col ${triggerFilter ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
    >
      <ButtonClose
        fn={() =>
          handle_temp_filter_reset(
            setFilterName,
            setFilterEmail,
            setFilterGender,
            setFilterProbStatus,
            setFilterIsActive,
            setFilterCreatedFrom,
            setFilterCreatedTo,
            setFilterUpdatedFrom,
            setFilterUpdatedTo,
            setTriggerFilter,
            setSearchParams,
          )
        }
      />
      <h4 className='text-md font-bold text-teal-800 font-serif mb-3 shrink-0'>
        Filtering Preferences
      </h4>
      <div className='overflow-y-auto max-h-60'>
        <OptionFilterOrder />
      </div>
      <div className='flex justify-center mt-4 gap-4 shrink-0'>
        <ButtonFilterClear />
        <ButtonFilterSubmit />
      </div>
    </form>
  );
};

//  remarks: popup for filtering options
export const OptionFilterOrder = (): JSX.Element => {
  //  declaration
  const {
    filterName,
    setFilterName,
    filterEmail,
    setFilterEmail,
    filterGender,
    setFilterGender,
    filterProbStatus,
    setFilterProbStatus,
    filterIsActive,
    setFilterIsActive,
    filterCreatedFrom,
    setFilterCreatedFrom,
    filterCreatedTo,
    setFilterCreatedTo,
    filterUpdatedFrom,
    setFilterUpdatedFrom,
    filterUpdatedTo,
    setFilterUpdatedTo,
  } = useCandidateContext();
  //  display
  return (
    <form className='p-2'>
      {/*  grid layout for filter items  */}
      <div
        className='grid gap-4 mb-4'
        style={{ gridTemplateColumns: 'auto 1fr' }}
      >
        {/*   section 1: name filtering  */}
        <FilterTextField
          id='filter_name'
          type='text'
          name='filter_name'
          label='Name'
          placeholder='Insert keywords...'
          onChange={(el) => setFilterName(el.target.value)}
          value={filterName}
        />
        {/*  section 2: email filtering */}
        <FilterTextField
          id='filter_email'
          type='text'
          name='filter_email'
          label='Email'
          placeholder='Insert keywords...'
          value={filterEmail}
          onChange={(el) => setFilterEmail(el.target.value)}
        />
        {/*  section 3:  Gender  */}
        <FilterSelectInput
          id='filter_gender'
          name='filter_gender'
          label='Gender'
          value={filterGender}
          onChange={(el) =>
            setFilterGender(
              el.target.value === '' ? null : (el.target.value as any),
            )
          }
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
        />
        {/*  section 4:  Probation Status  */}
        <FilterSelectInput
          id='filter_status'
          name='filter_status'
          label='Status'
          value={filterProbStatus}
          onChange={(el) =>
            setFilterProbStatus(
              el.target.value === '' ? null : (el.target.value as any),
            )
          }
          options={[
            { value: 'selecting', label: 'Selecting' },
            { value: 'training', label: 'Training' },
            { value: 'completed', label: 'Completed' },
            { value: 'postponed', label: 'Postponed' },
            { value: 'withdrawn', label: 'Withdrawn' },
            { value: 'failed', label: 'Failed' },
          ]}
        />
        {/*  section 5: Active Status  */}
        <FilterSelectInput
          id='filter_active'
          name='filter_active'
          label='Active'
          value={filterIsActive === null ? null : String(filterIsActive)}
          onChange={(el) =>
            setFilterIsActive(
              el.target.value === '' ? null : el.target.value === 'true',
            )
          }
          options={[
            { value: 'true', label: 'Active' },
            { value: 'false', label: 'Inactive' },
          ]}
        />
        {/*  section 6: Created At  */}
        <FilterDateRangeInput
          label='Created'
          fromId='filter_created_from'
          toId='filter_created_to'
          fromValue={filterCreatedFrom}
          toValue={filterCreatedTo}
          onFromChange={(el) => setFilterCreatedFrom(el.target.value)}
          onToChange={(el) => setFilterCreatedTo(el.target.value)}
        />
        {/*  section 7: Updated At  */}
        <FilterDateRangeInput
          label='Updated'
          fromId='filter_updated_from'
          toId='filter_updated_to'
          fromValue={filterUpdatedFrom}
          toValue={filterUpdatedTo}
          onFromChange={(el) => setFilterUpdatedFrom(el.target.value)}
          onToChange={(el) => setFilterUpdatedTo(el.target.value)}
        />
      </div>
    </form>
  );
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
      className={`fixed left-1/2 -translate-x-1/2 top-[35%] -translate-y-1/2 p-8 pb-5 border-gray-300 lg:absolute lg:top-full lg:translate-y-0 lg:right-0 lg:left-auto lg:translate-x-0 mt-3 w-72 bg-white border rounded-lg shadow-lg z-50 transform duration-600 transition-all ${triggerSort ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
    >
      <ButtonClose
        fn={() =>
          handle_temp_sort_reset(
            setSortAsc,
            setSortTarget,
            setTriggerSort,
            searchParams,
          )
        }
      />
      <OptionSortOrder />
      <div className='flex justify-center mt-2'>
        <ButtonFilterClear />
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
      <div className='py-2 flex items-center justify-between group'>
        {/*  option 1: sort target  */}
        <label className='text-sm font-medium text-gray-700 group-focus-within:text-teal-600 transition-all duration-600'>
          Target:
        </label>
        <select
          className='w-36 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 duration-600 transition-all'
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
      <div className='py-1 flex items-center gap-3 group'>
        <label className='pr-6 text-sm font-medium text-gray-700 group-focus-within:text-teal-600 transition-all duration-600'>
          Order:
        </label>
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
      className='px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 cursor-pointer duration-600 transition-all'
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
      className='px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 cursor-pointer duration-600 transition-all'
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
