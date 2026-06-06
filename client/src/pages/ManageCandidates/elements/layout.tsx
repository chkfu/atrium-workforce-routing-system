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
    <div className='flex justify-start md:justify-end items-start md:items-end gap-8'>
      <PageLimitBox />
      <PageOptBox />
    </div>
  );
}

//  remarks: control panel
export function ControlPanelSection(): JSX.Element {
  return (
    <div className='py-4'>
      <div className='flex flex-col gap-4 md:justify-end md:gap-16 lg:flex-row lg:justify-between'>
        <FormButtonBox />
        <FilterSortBox />
      </div>
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
      <div className='max-h-90 overflow-y-auto overflow-x-auto w-full'>
        <table className='min-w-300 border-collapse table-auto w-full'>
          <TableHeaderBox />
          <TableBodyBox />
        </table>
      </div>
    </div>
  );
}

//  ==========    LAYER 2    ==========

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
