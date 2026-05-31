import { useCandidateContext } from '../utils/context';
import { TableHeaderBox, TableBodyBox } from './tables';
import { ButtonCreate, ButtonUpdate, ButtonConvertActive } from './buttons';
import ButtonConfirm from '../../../elements/ButtonConfirm';
import { COLORS } from '../../../styles/color';

//  remarks: main container
export function PanelFromContainer(): JSX.Element {
  const { selectedCandidates } = useCandidateContext();
  return (
    <table className='w-full'>
      {/*  control panel */}
      <div className='py-4'>
        <FormSearchBox />
        <FormButtonBox />
      </div>
      {/*  table panel */}
      <div className='py-4'>
        <p
          className={`mb-4 text-sm text-gray-500 transition-opacity duration-500 ease-in-out
            ${selectedCandidates.length === 0 ? 'invisible' : 'visible'}
            ${selectedCandidates.length === 0 ? 'opacity-0' : 'opacity-100'}`}
        >
          Selection: {selectedCandidates.length}{' '}
          {selectedCandidates.length === 1 ? 'candidate' : 'candidates'}{' '}
          selected
        </p>
        <div className='w-full overflow-x-auto'>
          <table className='min-w-300 border-collapse table-auto'>
            <TableHeaderBox />
            <TableBodyBox />
          </table>
        </div>
      </div>
    </table>
  );
}

//  remarks: sub-container for search input and button
export function FormSearchBox(): JSX.Element {
  const { searchText, setSearchText } = useCandidateContext();

  return (
    <div className='mb-4 flex gap-2'>
      <select className='px-2 py-1 border cursor-pointer border-gray-300 text-sm rounded-lg focus:outline-none focus:border-teal-600'>
        <option value='all'>All</option>
        <option value='id'>ID</option>
        <option value='name'>Name</option>
        <option value='email'>Email</option>
        <option value='status'>Status</option>
      </select>
      <input
        type='text'
        placeholder='Search items...'
        className='w-3/9 px-4 py-1 border text-sm border-gray-300 rounded-lg focus:outline-none focus:border-teal-600'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
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

//  remarks: sub-container for user behaviors
function FormButtonBox(): JSX.Element {
  return (
    <div className='flex flex-wrap gap-2'>
      <ButtonCreate />
      <ButtonUpdate />
      <ButtonConvertActive />
    </div>
  );
}
