import { useEffect } from 'react';
import { useCandidateContext } from '../utils/context';
import { TableHeaderBox, TableBodyBox } from './tables';
import {
  ButtonCreate,
  ButtonUpdate,
  ButtonConvertActive,
  ButtonSort,
  ButtonFilter,
} from './buttons';
import { OptionPageLimit, OptionPageSelect } from './forms';
import ButtonConfirm from '../../../elements/ButtonConfirm';
import { COLORS } from '../../../styles/color';

import { FormSorting, FormFiltering } from './forms';

//  ==========    MAIN    ==========

//  remarks: main container
export function PanelFromContainer(): JSX.Element {
  const { isInitialised, setIsInitialised } = useCandidateContext();
  useEffect(() => {
    setIsInitialised(true);
  }, []);

  return (
    <div
      className={`w-full duration-1000 ease-linear transition-opacity delay-200 ${
        isInitialised
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-20'
      }`}
    >
      <ControlPanelSection />
      <PaginationSection />
      <TableSection />
    </div>
  );
}

//  ==========    LAYER 1    ==========

//  remarks: pagination display
export function PaginationSection(): JSX.Element {
  return (
    <div className='flex justify-end items-end gap-8'>
      <PageLimitBox />
      <PageOptBox />
    </div>
  );
}

//  remarks: control panel
export function ControlPanelSection(): JSX.Element {
  return (
    <div className='py-4'>
      <div className='flex flex-wrap justify-between'>
        <FormSearchBox />
        <FilterSortBox />
      </div>
      <FormButtonBox />
    </div>
  );
}

//  remarks: table display
export function TableSection(): JSX.Element {
  const { selectedCandidates } = useCandidateContext();
  return (
    <div className='pt-2 w-full overflow-hidden'>
      <p
        className={`mb-2 text-sm text-gray-500 transition-opacity duration-500 ease-in-out
          ${selectedCandidates.length === 0 ? 'invisible' : 'visible'}
          ${selectedCandidates.length === 0 ? 'opacity-0' : 'opacity-100'}`}
      >
        Selection: {selectedCandidates.length}{' '}
        {selectedCandidates.length === 1 ? 'candidate' : 'candidates'} selected
      </p>
      <div className='max-h-90 overflow-y-auto w-full'>
        <div className='overflow-x-auto'>
          <table className='min-w-300 border-collapse table-auto w-full'>
            <TableHeaderBox />
            <TableBodyBox />
          </table>
        </div>
      </div>
    </div>
  );
}

//  ==========    LAYER 2    ==========

//  remarks: sub-container for search input and button (control panel section)
export function FormSearchBox(): JSX.Element {
  const { searchText, setSearchText } = useCandidateContext();

  return (
    <div className='mb-4 flex gap-2 flex-wrap'>
      <select className='px-2 py-1 border cursor-pointer border-gray-300 text-sm rounded-lg focus:outline-none focus:border-teal-600 shrink-0'>
        <option value='all'>All</option>
        <option value='id'>ID</option>
        <option value='name'>Name</option>
        <option value='email'>Email</option>
        <option value='status'>Status</option>
      </select>
      <input
        type='text'
        placeholder='Search items...'
        className='w-32 px-2 py-1 border text-sm border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 transition-all ease-in-out duration-600'
        value={searchText}
        onChange={(el) => setSearchText(el.target.value)}
      />
      <ButtonConfirm
        label='Search'
        onClick={() => {
          console.log(searchText);
        }}
        style={{
          backgroundColor: COLORS.dark_teal,
          color: COLORS.light_gray,
        }}
      />
    </div>
  );
}

//  remarks: sub-container for filter and sorting
function FilterSortBox(): JSX.Element {
  return (
    <div className='flex gap-2'>
      {/*  section: filtering */}
      <div>
        <ButtonFilter />
        <FormFiltering />
      </div>
      {/*  section: sorting  */}
      <div className='relative'>
        <ButtonSort />
        <FormSorting />
      </div>
    </div>
  );
}

//  remarks: sub-container for user behaviors (control panel section)
function FormButtonBox(): JSX.Element {
  return (
    <div className='flex flex-wrap gap-2'>
      <ButtonCreate />
      <ButtonUpdate />
      <ButtonConvertActive />
    </div>
  );
}

//  remarks: sub-container for page limit
function PageLimitBox(): JSX.Element {
  return (
    <div className='group flex items-center gap-2'>
      <OptionPageLimit />
      <span className='text-sm text-gray-600 group-focus-within:text-teal-600 duration-900'>
        per page
      </span>
    </div>
  );
}

//  remarks: sub-container for page selection
function PageOptBox(): JSX.Element {
  const { totalPage } = useCandidateContext();
  //  display
  return (
    <div className='group flex items-center gap-2'>
      <OptionPageSelect />
      <span className='text-sm text-gray-600  group-focus-within:text-teal-600 duration-900'>
        of {totalPage} pages
      </span>
    </div>
  );
}
