import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import FilterTextField from '../../../../elements/FilterTextField';
import FilterSelectInput from '../../../../elements/FilterSelectInput';
import FilterDateRangeInput from '../../../../elements/FilterRangeInput';
import {
  ButtonUpdateCancel,
  ButtonUpdateSubmit,
  ButtonCreateCancel,
  ButtonCreateSubmit,
  ButtonSortSubmit,
  ButtonFilterClear,
  ButtonFilterSubmit,
} from './buttons';
import FormTextField from '../../../../elements/FormTextField';
import ButtonClose from '../../../../elements/ButtonClose';
import {
  handle_create_submit,
  handle_temp_sort_reset,
  handle_update_submit,
  handle_temp_filter_reset,
} from '../utils/handlers';
import { useSelectWeightContext } from '../utils/context';
import { useSearchParams } from 'react-router-dom';
import { CreateSelectWeightSchema, UpdateSelectWeightSchema } from '../utils/schema';
import FilterRangeInput from '../../../../elements/FilterRangeInput';

//  CREATE

export function FormCreate() {
  //  declaration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateSelectWeightSchema),
  });
  const dispatch = useDispatch();
  const { setIsCreating, setTriggerCreate } = useSelectWeightContext();

  function recalling(data: any) {
    handle_create_submit(data, setIsCreating, setTriggerCreate, dispatch);
  }
  //  display
  return (
    <form onSubmit={handleSubmit(recalling)} className="flex flex-col h-96" noValidate>
      <h3 className="text-lg font-semibold text-gray-800 mb-3 shrink-0">Create Select Weight Strategy</h3>

      {/*  section: field inputs - scrollable  */}
      <div className="overflow-y-auto flex-1">
        <FormTextField
          label="Strategy Name"
          register={register('strategy_name')}
          error={errors.strategy_name}
          required={true}
        />
        <FormTextField
          label="Strategy Goal"
          register={register('strategy_goal')}
          error={errors.strategy_goal}
        />

        {/*  section: education rules  */}
        <FormTextField type="number" label="Other Degree" register={register('edu_degree_other', { valueAsNumber: true })} error={errors.edu_degree_other} />
        <FormTextField type="number" label="Bachelor's Degree" register={register('edu_degree_bachelor', { valueAsNumber: true })} error={errors.edu_degree_bachelor} />
        <FormTextField type="number" label="Postgraduate Diploma" register={register('edu_degree_postdip', { valueAsNumber: true })} error={errors.edu_degree_postdip} />
        <FormTextField type="number" label="Master's Degree" register={register('edu_degree_master', { valueAsNumber: true })} error={errors.edu_degree_master} />
        <FormTextField type="number" label="Doctoral Degree" register={register('edu_degree_doctoral', { valueAsNumber: true })} error={errors.edu_degree_doctoral} />
        <FormTextField type="number" label="Other Tier Institution" register={register('edu_inst_other', { valueAsNumber: true })} error={errors.edu_inst_other} />
        <FormTextField type="number" label="1st Tier Institution" register={register('edu_inst_1st', { valueAsNumber: true })} error={errors.edu_inst_1st} />
        <FormTextField type="number" label="2nd Tier Institution" register={register('edu_inst_2nd', { valueAsNumber: true })} error={errors.edu_inst_2nd} />
        <FormTextField type="number" label="3rd Tier Institution" register={register('edu_inst_3rd', { valueAsNumber: true })} error={errors.edu_inst_3rd} />
        <FormTextField type="number" label="STEM Major" register={register('edu_major_stem', { valueAsNumber: true })} error={errors.edu_major_stem} />
        <FormTextField type="number" label="Engineering Major" register={register('edu_major_eng', { valueAsNumber: true })} error={errors.edu_major_eng} />
        <FormTextField type="number" label="Business Major" register={register('edu_major_bus', { valueAsNumber: true })} error={errors.edu_major_bus} />
        <FormTextField type="number" label="Law Major" register={register('edu_major_law', { valueAsNumber: true })} error={errors.edu_major_law} />
        <FormTextField type="number" label="Social Science Major" register={register('edu_major_sosc', { valueAsNumber: true })} error={errors.edu_major_sosc} />
        <FormTextField type="number" label="Other Major" register={register('edu_major_other', { valueAsNumber: true })} error={errors.edu_major_other} />

        {/*  section: experience rules  */}
        <FormTextField type="number" label="Full-time" register={register('exp_nature_ft', { valueAsNumber: true })} error={errors.exp_nature_ft} />
        <FormTextField type="number" label="Part-time" register={register('exp_nature_pt', { valueAsNumber: true })} error={errors.exp_nature_pt} />
        <FormTextField type="number" label="Internship" register={register('exp_nature_intern', { valueAsNumber: true })} error={errors.exp_nature_intern} />
        <FormTextField type="number" label="Volunteer" register={register('exp_nature_vol', { valueAsNumber: true })} error={errors.exp_nature_vol} />
        <FormTextField type="number" step={0.01} label="Per-year Rate" register={register('exp_year_rate', { valueAsNumber: true })} error={errors.exp_year_rate} />

        {/*  section: test score rules  */}
        <FormTextField type="number" step={0.01} label="Aptitude Test Weight" register={register('test_apt', { valueAsNumber: true })} error={errors.test_apt} />
        <FormTextField type="number" step={0.01} label="1st Interview Weight" register={register('test_int_1st', { valueAsNumber: true })} error={errors.test_int_1st} />
        <FormTextField type="number" step={0.01} label="2nd Interview Weight" register={register('test_int_2nd', { valueAsNumber: true })} error={errors.test_int_2nd} />

        {/*  section: overall shares  */}
        <FormTextField type="number" step={0.01} label="Education Share" register={register('weight_edu', { valueAsNumber: true })} error={errors.weight_edu} />
        <FormTextField type="number" step={0.01} label="Experience Share" register={register('weight_exp', { valueAsNumber: true })} error={errors.weight_exp} />
        <FormTextField type="number" step={0.01} label="Test Share" register={register('weight_test', { valueAsNumber: true })} error={errors.weight_test} />

        {/*  section: passing standard  */}
        <FormTextField type="number" label="Education Pass Mark" register={register('pass_edu', { valueAsNumber: true })} error={errors.pass_edu} />
        <FormTextField type="number" label="Experience Pass Mark" register={register('pass_exp', { valueAsNumber: true })} error={errors.pass_exp} />
        <FormTextField type="number" label="Test Pass Mark" register={register('pass_test', { valueAsNumber: true })} error={errors.pass_test} />
      </div>

      {/*  section: buttons - fixed at bottom  */}
      <div className="flex gap-4 justify-end mt-4 shrink-0">
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
    resolver: yupResolver(UpdateSelectWeightSchema),
  });
  const dispatch = useDispatch();
  const { selectedWeight, setIsUpdating, setSelectedWeight, setTriggerUpdate } =
    useSelectWeightContext();

  function recalling(data: any) {
    handle_update_submit(
      data,
      selectedWeight,
      setIsUpdating,
      setSelectedWeight,
      setTriggerUpdate,
      dispatch
    );
  }
  //  display
  return (
    <form onSubmit={handleSubmit(recalling)} className="flex flex-col h-96" noValidate>
      <h3 className="text-lg font-semibold text-gray-800 mb-3 shrink-0">Update Select Weight Strategy</h3>

      {/*  section: field inputs - scrollable  */}
      <div className="overflow-y-auto flex-1">
        <FormTextField
          label="Strategy Name"
          register={register('strategy_name')}
          error={errors.strategy_name}
        />
        <FormTextField
          label="Strategy Goal"
          register={register('strategy_goal')}
          error={errors.strategy_goal}
        />

        {/*  section: education rules  */}
        <FormTextField type="number" label="Other Degree" register={register('edu_degree_other', { valueAsNumber: true })} error={errors.edu_degree_other} />
        <FormTextField type="number" label="Bachelor's Degree" register={register('edu_degree_bachelor', { valueAsNumber: true })} error={errors.edu_degree_bachelor} />
        <FormTextField type="number" label="Postgraduate Diploma" register={register('edu_degree_postdip', { valueAsNumber: true })} error={errors.edu_degree_postdip} />
        <FormTextField type="number" label="Master's Degree" register={register('edu_degree_master', { valueAsNumber: true })} error={errors.edu_degree_master} />
        <FormTextField type="number" label="Doctoral Degree" register={register('edu_degree_doctoral', { valueAsNumber: true })} error={errors.edu_degree_doctoral} />
        <FormTextField type="number" label="Other Tier Institution" register={register('edu_inst_other', { valueAsNumber: true })} error={errors.edu_inst_other} />
        <FormTextField type="number" label="1st Tier Institution" register={register('edu_inst_1st', { valueAsNumber: true })} error={errors.edu_inst_1st} />
        <FormTextField type="number" label="2nd Tier Institution" register={register('edu_inst_2nd', { valueAsNumber: true })} error={errors.edu_inst_2nd} />
        <FormTextField type="number" label="3rd Tier Institution" register={register('edu_inst_3rd', { valueAsNumber: true })} error={errors.edu_inst_3rd} />
        <FormTextField type="number" label="STEM Major" register={register('edu_major_stem', { valueAsNumber: true })} error={errors.edu_major_stem} />
        <FormTextField type="number" label="Engineering Major" register={register('edu_major_eng', { valueAsNumber: true })} error={errors.edu_major_eng} />
        <FormTextField type="number" label="Business Major" register={register('edu_major_bus', { valueAsNumber: true })} error={errors.edu_major_bus} />
        <FormTextField type="number" label="Law Major" register={register('edu_major_law', { valueAsNumber: true })} error={errors.edu_major_law} />
        <FormTextField type="number" label="Social Science Major" register={register('edu_major_sosc', { valueAsNumber: true })} error={errors.edu_major_sosc} />
        <FormTextField type="number" label="Other Major" register={register('edu_major_other', { valueAsNumber: true })} error={errors.edu_major_other} />

        {/*  section: experience rules  */}
        <FormTextField type="number" label="Full-time" register={register('exp_nature_ft', { valueAsNumber: true })} error={errors.exp_nature_ft} />
        <FormTextField type="number" label="Part-time" register={register('exp_nature_pt', { valueAsNumber: true })} error={errors.exp_nature_pt} />
        <FormTextField type="number" label="Internship" register={register('exp_nature_intern', { valueAsNumber: true })} error={errors.exp_nature_intern} />
        <FormTextField type="number" label="Volunteer" register={register('exp_nature_vol', { valueAsNumber: true })} error={errors.exp_nature_vol} />
        <FormTextField type="number" step={0.01} label="Per-year Rate" register={register('exp_year_rate', { valueAsNumber: true })} error={errors.exp_year_rate} />

        {/*  section: test score rules  */}
        <FormTextField type="number" step={0.01} label="Aptitude Test Weight" register={register('test_apt', { valueAsNumber: true })} error={errors.test_apt} />
        <FormTextField type="number" step={0.01} label="1st Interview Weight" register={register('test_int_1st', { valueAsNumber: true })} error={errors.test_int_1st} />
        <FormTextField type="number" step={0.01} label="2nd Interview Weight" register={register('test_int_2nd', { valueAsNumber: true })} error={errors.test_int_2nd} />

        {/*  section: overall shares  */}
        <FormTextField type="number" step={0.01} label="Education Share" register={register('weight_edu', { valueAsNumber: true })} error={errors.weight_edu} />
        <FormTextField type="number" step={0.01} label="Experience Share" register={register('weight_exp', { valueAsNumber: true })} error={errors.weight_exp} />
        <FormTextField type="number" step={0.01} label="Test Share" register={register('weight_test', { valueAsNumber: true })} error={errors.weight_test} />

        {/*  section: passing standard  */}
        <FormTextField type="number" label="Education Pass Mark" register={register('pass_edu', { valueAsNumber: true })} error={errors.pass_edu} />
        <FormTextField type="number" label="Experience Pass Mark" register={register('pass_exp', { valueAsNumber: true })} error={errors.pass_exp} />
        <FormTextField type="number" label="Test Pass Mark" register={register('pass_test', { valueAsNumber: true })} error={errors.pass_test} />
      </div>
      {/*  section: buttons - fixed at bottom  */}
      <div className="flex gap-4 justify-end mt-4 shrink-0">
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
    setFilterCapacityFrom,
    setFilterCapacityTo,
    setFilterWeightFrom,
    setFilterWeightTo,
    setFilterIsActive,
    setFilterCreatedFrom,
    setFilterCreatedTo,
    setFilterUpdatedFrom,
    setFilterUpdatedTo,
  } = useSelectWeightContext();

  return (
    <form
      className={`fixed left-1/2 -translate-x-1/2 top-[48%] -translate-y-1/2 border-gray-300 p-8 pb-5 lg:absolute lg:top-full lg:-translate-y-2 lg:right-0 lg:left-auto lg:translate-x-0 mt-3 w-108 bg-white border rounded-lg shadow-lg z-50 transform duration-600 transition-all flex flex-col ${triggerFilter ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
    >
      <ButtonClose
        fn={() =>
          handle_temp_filter_reset(
            setFilterName,
            setFilterCapacityFrom,
            setFilterCapacityTo,
            setFilterWeightFrom,
            setFilterWeightTo,
            setFilterIsActive,
            setFilterCreatedFrom,
            setFilterCreatedTo,
            setFilterUpdatedFrom,
            setFilterUpdatedTo,
            setTriggerFilter,
            setSearchParams
          )
        }
      />
      <h4 className="text-md font-bold text-teal-800 font-serif mb-3 shrink-0">
        Filtering Preferences
      </h4>
      <div className="overflow-y-auto max-h-60">
        <OptionFilterOrder />
      </div>
      <div className="flex justify-center mt-4 gap-4 shrink-0">
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
    filterCapacityFrom,
    setFilterCapacityFrom,
    filterCapacityTo,
    setFilterCapacityTo,
    filterWeightFrom,
    setFilterWeightFrom,
    filterWeightTo,
    setFilterWeightTo,
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
  } = useSelectWeightContext();
  //  display
  return (
    <div className="p-2">
      {/*  grid layout for filter items  */}
      <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: 'auto 1fr' }}>
        {/*   section 1: name filtering  */}
        <FilterTextField
          id="filter_department"
          type="text"
          name="filter_department"
          label="Department"
          placeholder="Insert keywords..."
          onChange={(el) => setFilterName(el.target.value)}
          value={filterName}
        />
        {/*  section 2: capacity */}
        <FilterRangeInput
          label="Capacity"
          fromId="filter_capacity_from"
          toId="filter_capacity_to"
          fromValue={String(filterCapacityFrom)}
          toValue={String(filterCapacityTo)}
          type="number"
          onFromChange={(el) => setFilterCapacityFrom(el.target.value)}
          onToChange={(el) => setFilterCapacityTo(el.target.value)}
        />
        <FilterRangeInput
          label="Weighting"
          fromId="filter_weight_from"
          toId="filter_weight_to"
          fromValue={String(filterWeightFrom)}
          toValue={String(filterWeightTo)}
          type="number"
          onFromChange={(el) => setFilterWeightFrom(el.target.value)}
          onToChange={(el) => setFilterWeightTo(el.target.value)}
        />
        {/*  section 8: Active Status  */}
        <FilterSelectInput
          name="filter_active"
          label="Active"
          value={filterIsActive === null ? null : String(filterIsActive)}
          onChange={(el) =>
            setFilterIsActive(el.target.value === '' ? null : el.target.value === 'true')
          }
          options={[
            { value: 'true', label: 'Active' },
            { value: 'false', label: 'Inactive' },
          ]}
        />
        {/*  section 6: Created At  */}
        <FilterDateRangeInput
          label="Created"
          fromId="filter_created_from"
          toId="filter_created_to"
          fromValue={filterCreatedFrom}
          toValue={filterCreatedTo}
          onFromChange={(el) => setFilterCreatedFrom(el.target.value)}
          onToChange={(el) => setFilterCreatedTo(el.target.value)}
        />
        {/*  section 7: Updated At  */}
        <FilterDateRangeInput
          label="Updated"
          fromId="filter_updated_from"
          toId="filter_updated_to"
          fromValue={filterUpdatedFrom}
          toValue={filterUpdatedTo}
          onFromChange={(el) => setFilterUpdatedFrom(el.target.value)}
          onToChange={(el) => setFilterUpdatedTo(el.target.value)}
        />
      </div>
    </div>
  );
};

//  SORTING

//  remarks: main form for sorting
export const FormSorting = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const { setSortAsc, setSortTarget, triggerSort, setTriggerSort } = useSelectWeightContext();
  //  display
  return (
    <form
      className={`fixed left-1/2 -translate-x-1/2 top-[35%] -translate-y-1/2 p-8 pb-5 border-gray-300 lg:absolute lg:top-full lg:translate-y-0 lg:right-0 lg:left-auto lg:translate-x-0 mt-3 w-72 bg-white border rounded-lg shadow-lg z-50 transform duration-600 transition-all ${triggerSort ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
    >
      <ButtonClose
        fn={() => handle_temp_sort_reset(setSortAsc, setSortTarget, setTriggerSort, searchParams)}
      />
      <OptionSortOrder />
      <div className="flex justify-center mt-2">
        <ButtonFilterClear />
        <ButtonSortSubmit />
      </div>
    </form>
  );
};

//  remarks: popup for sorting options
export const OptionSortOrder = (): JSX.Element => {
  const { sortAsc, setSortAsc, sortTarget, setSortTarget } = useSelectWeightContext();
  //  display
  return (
    <div className="py-1">
      {/*  section: box title  */}
      <div>
        <h4 className="text-md font-bold text-teal-800 font-serif mb-2">Sorting Preferences</h4>
      </div>
      {/*  section: sorting options */}
      <div className="py-2 flex items-center justify-between group">
        {/*  option 1: sort target  */}
        <label className="text-sm font-medium text-gray-700 group-focus-within:text-teal-600 transition-all duration-600">
          Target:
        </label>
        <select
          className="w-36 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 duration-600 transition-all"
          value={sortTarget}
          onChange={(el) => setSortTarget(el.target.value)}
        >
          <option value="_id">ID</option>
          <option value="department_name">Name</option>
          <option value="department_capacity">Capacity</option>
          <option value="department_weight">Weight</option>
          <option value="created_at">Created date</option>
          <option value="updated_at">Updated date</option>
        </select>
      </div>
      {/*  option 2: sort order  */}
      <div className="py-1 flex items-center gap-3 group">
        <label className="pr-6 text-sm font-medium text-gray-700 group-focus-within:text-teal-600 transition-all duration-600">
          Order:
        </label>
        <div className="flex gap-3">
          {['asc', 'desc'].map((order) => (
            <label key={order} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort_order"
                value={order}
                checked={order === 'asc' ? sortAsc : !sortAsc}
                onChange={() => setSortAsc(order === 'asc')}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">
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
      name="limit"
      value={searchParams.get('limit') || '20'}
      onChange={(el) => {
        setSearchParams((prev) => {
          prev.set('limit', el.target.value);
          prev.set('page', '1');
          return prev;
        });
      }}
      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 cursor-pointer duration-600 transition-all"
    >
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>
  );
};

//  remarks: dropdown selection for spec page
export const OptionPageSelect = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalPage } = useSelectWeightContext();
  const currentPage = parseInt(searchParams.get('page') || '1');
  //  display
  return (
    <select
      name="page"
      value={currentPage}
      onChange={(el) =>
        setSearchParams((prev) => {
          prev.set('page', el.target.value);
          return prev;
        })
      }
      className="px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 cursor-pointer duration-600 transition-all"
    >
      {totalPage > 0 &&
        Array.from({ length: totalPage }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
    </select>
  );
};
