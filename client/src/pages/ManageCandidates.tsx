import { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, useFormikContext } from 'formik';
import Accordion from '../elements/Accordion';
import ButtonConfirm from '../elements/ButtonConfirm';
import LoadSpinner from '../elements/LoadSpinner';
import { COLORS } from '../styles/color';
import { API } from '../config/api';

export default function ManageCandidates(): JSX.Element {
  //  hooks
  //  1. general states
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  //  2. get candidates states
  const [candidates, setCandidates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //  3. convert status states
  const [tiggerConvert, setTriggerConvert] = useState<boolean>(false);
  const [convertStatus, setConvertStatus] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(API.CANDIDATES)
      .then((response) => {
        const cadidateEls = response.data.data.result;
        setCandidates(cadidateEls);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.error('Error fetching candidates:', err);
        setError(err.message || 'Failed to load candidates');
        setIsLoading(false);
      });
  }, []);
  //  loading state
  if (isLoading) {
    return <LoadSpinner />;
  }
  //  error handling
  if (error) {
    return <div className='p-4 text-red-600'>Error: {error}</div>;
  }
  if (candidates.length === 0) {
    return <div className='p-4 text-gray-500'>No candidates found</div>;
  }
  //  display
  return (
    <div
      id='manage-candidates-container'
      className='w-full'
    >
      <Accordion title='Candidate List'>
        <Formik
          initialValues={{ selectedCandidates: [] }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {() => (
            <PanelFromContainer
              candidates={candidates}
              setCandidates={setCandidates}
              selectedCandidate={selectedCandidates}
              setSelectedCandidate={setSelectedCandidates}
              searchText={searchText}
              setSearchText={setSearchText}
              convertStatus={convertStatus}
              setConvertStatus={setConvertStatus}
              tiggerConvert={tiggerConvert}
              setTriggerConvert={setTriggerConvert}
            />
          )}
        </Formik>
      </Accordion>
    </div>
  );
}

//  ==========    Core Containers    ==========

function PanelFromContainer({
  candidates,
  setCandidates,
  selectedCandidate,
  setSelectedCandidate,
  searchText,
  setSearchText,
  convertStatus,
  setConvertStatus,
  tiggerConvert,
  setTriggerConvert,
}: {
  candidates: any[];
  setCandidates: React.Dispatch<React.SetStateAction<any[]>>;
  selectedCandidate: number[];
  setSelectedCandidate: React.Dispatch<React.SetStateAction<number[]>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  convertStatus: boolean;
  setConvertStatus: React.Dispatch<React.SetStateAction<boolean>>;
  tiggerConvert: boolean;
  setTriggerConvert: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  //  hooks
  const { submitForm } = useFormikContext<any>();
  //  display
  return (
    <Form className='w-full'>
      {/*  control panel */}
      <div className='py-4'>
        <FormSearchBox
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <FormButtonBox
          submitForm={submitForm}
          candidates={candidates}
          setCandidates={setCandidates}
          selectedCandidate={selectedCandidate}
          setSelectedCandidate={setSelectedCandidate}
          convertStatus={convertStatus}
          setConvertStatus={setConvertStatus}
          tiggerConvert={tiggerConvert}
          setTriggerConvert={setTriggerConvert}
        />
      </div>
      {/*  table panel */}
      <div className='py-4'>
        <p
          className={`mb-4 text-sm text-gray-500 transition-opacity duration-500 ease-in-out
            ${selectedCandidate.length === 0 ? 'invisible' : 'visible'}
            ${selectedCandidate.length === 0 ? 'opacity-0' : 'opacity-100'}`}
        >
          Selection: {selectedCandidate.length}{' '}
          {selectedCandidate.length === 1 ? 'candidate' : 'candidates'} selected
        </p>
        <div className='w-full overflow-x-auto'>
          <table className='min-w-300 border-collapse table-auto'>
            {/*  Table head */}
            <TableHeaderBox
              candidates={candidates}
              selectedCandidates={selectedCandidate}
              setSelectedCandidates={setSelectedCandidate}
            />
            {/*  table body  */}
            <TableBodyBox
              candidates={candidates}
              selectedCandidates={selectedCandidate}
              setSelectedCandidates={setSelectedCandidate}
            />
          </table>
        </div>
      </div>
    </Form>
  );
}

//  ==========    Boxes    ==========

function FormSearchBox({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  return (
    <div className='mb-4 flex gap-2'>
      <select className='px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600'>
        <option value='all'>All</option>
        <option value='id'>ID</option>
        <option value='name'>Name</option>
        <option value='email'>Email</option>
        <option value='status'>Status</option>
      </select>
      <input
        type='text'
        placeholder='Search candidates...'
        className='w-3/9 px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600'
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

function FormButtonBox({
  submitForm,
  candidates,
  setCandidates,
  selectedCandidate,
  setSelectedCandidate,
  convertStatus,
  setConvertStatus,
  tiggerConvert,
  setTriggerConvert,
}: {
  submitForm: () => void;
  candidates: any[];
  setCandidates: React.Dispatch<React.SetStateAction<any[]>>;
  selectedCandidate: number[];
  setSelectedCandidate: React.Dispatch<React.SetStateAction<number[]>>;
  convertStatus: boolean;
  setConvertStatus: React.Dispatch<React.SetStateAction<boolean>>;
  tiggerConvert: boolean;
  setTriggerConvert: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <div className='flex flex-wrap gap-2'>
      <ButtonConfirm
        label='Refresh'
        onClick={() => {
          console.log('Refresh');
        }}
        style={{
          backgroundColor: COLORS.dark_teal,
          color: COLORS.light_gray,
        }}
      />
      <ButtonConfirm
        label='Create'
        onClick={() => {
          console.log('Batch Create');
        }}
        style={{ backgroundColor: COLORS.light_gray, color: COLORS.dark_teal }}
      />
      <ButtonConfirm
        label='Update'
        onClick={() => {
          submitForm();
          console.log('Batch Update');
        }}
        style={{ backgroundColor: COLORS.light_gray, color: COLORS.dark_teal }}
      />
      <ButtonConvertStatus
        candidates={candidates}
        setCandidates={setCandidates}
        selectedCandidate={selectedCandidate}
        setSelectedCandidate={setSelectedCandidate}
        convertStatus={convertStatus}
        setConvertStatus={setConvertStatus}
        tiggerConvert={tiggerConvert}
        setTriggerConvert={setTriggerConvert}
      />
    </div>
  );
}

function TableHeaderBox({
  candidates,
  selectedCandidates,
  setSelectedCandidates,
}: {
  candidates: any[];
  selectedCandidates: number[];
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>;
}): JSX.Element {
  //  declaration
  const table_headers = [
    { label: 'ID', className: 'w-8', key: 'id' },
    { label: 'Name', className: 'min-w-24', key: 'name' },
    { label: 'Email', className: 'min-w-40', key: 'email' },
    { label: 'Gender', className: 'min-w-20', key: 'gender' },
    { label: 'Status', className: 'min-w-20', key: 'status' },
    { label: 'Active', className: 'min-w-16', key: 'active' },
    { label: 'Created', className: 'min-w-28', key: 'created' },
    { label: 'Updated', className: 'min-w-28', key: 'updated' },
  ];
  //  display
  return (
    <thead>
      <tr style={{ borderBottom: `2px solid ${COLORS.light_gray}` }}>
        {/*  checkbox column  */}
        <th className='w-16 p-2 text-center align-middle'>
          <input
            type='checkbox'
            className='w-4 h-4 cursor-pointer'
            onChange={(event) =>
              handle_checkbox_select_all(
                event,
                candidates,
                setSelectedCandidates,
              )
            }
            checked={
              candidates &&
              candidates.length > 0 &&
              selectedCandidates.length === candidates.length
            }
          />
        </th>
        {/*  data columns  */}
        {table_headers.map((header) => (
          <th
            key={header.key}
            className={`p-2 text-sm text-left font-bold ${header.className} whitespace-nowrap`}
          >
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableBodyBox({
  candidates,
  selectedCandidates,
  setSelectedCandidates,
}: {
  candidates: any[];
  selectedCandidates: number[];
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>;
}): JSX.Element {
  //  declaration
  const table_cols = [
    {
      key: 'id',
      className: 'p-2 text-sm text-gray-500',
      element: (el: any) => `#${el._id}`,
    },
    {
      key: 'name',
      className: 'p-2 text-sm font-bold cursor-pointer',
      style: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      element: (el: any) => `${el.first_name} ${el.last_name}`,
    },
    {
      key: 'email',
      className: 'p-2 text-sm min-w-40',
      style: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      element: (el: any) => el.email,
    },
    {
      key: 'gender',
      className: 'p-2 text-sm',
      element: (el: any) =>
        el.gender === 'male' || el.gender === 'female'
          ? el.gender.charAt(0).toUpperCase() + el.gender.slice(1)
          : '',
    },
    {
      key: 'status',
      className: 'p-2 text-sm font-bold',
      element: (el: any) =>
        el.prob_status.charAt(0).toUpperCase() + el.prob_status.slice(1),
    },
    {
      key: 'active',
      className: 'p-2 text-sm font-bold',
      element: (el: any) => (el.is_active ? 'Active' : 'Inactive'),
      getStyle: (el: any) => ({
        color: el.is_active ? COLORS.success_teal : COLORS.error_red,
      }),
    },
    {
      key: 'created',
      className: 'p-2 text-sm text-gray-500 whitespace-nowrap',
      element: (el: any) => new Date(el.created_at).toISOString().split('T')[0],
    },
    {
      key: 'updated',
      className: 'p-2 text-sm text-gray-500 whitespace-nowrap',
      element: (el: any) => new Date(el.updated_at).toISOString().split('T')[0],
    },
  ];
  // display
  if (!candidates || candidates.length === 0) {
    return <tbody></tbody>;
  }
  return (
    <tbody>
      {candidates.map((el: any) => (
        <tr
          key={el._id}
          style={{
            borderBottom: `1px solid ${COLORS.light_gray}`,
          }}
          className={`
                  ${el.is_active === false ? 'bg-gray-100 opacity-60' : ''}
                  ${selectedCandidates.includes(el._id) ? 'bg-teal-100 opacity-100' : ''}`}
        >
          {/*  checkbox column  */}
          <td className='p-2 text-center align-middle'>
            <input
              type='checkbox'
              className='w-4 h-4 cursor-pointer'
              checked={selectedCandidates.includes(el._id)}
              onChange={() =>
                handle_checkbox_status(el._id, setSelectedCandidates)
              }
            />
          </td>
          {/*  data columns  */}
          {table_cols.map((column) => (
            <td
              key={column.key}
              className={column.className}
              style={column.getStyle ? column.getStyle(el) : column.style}
            >
              {column.element(el)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

//  ==========    Buttons    ==========

const ButtonConvertStatus = ({
  candidates,
  setCandidates,
  selectedCandidate,
  setSelectedCandidate,
  convertStatus,
  setConvertStatus,
  tiggerConvert,
  setTriggerConvert,
}: {
  candidates: any[];
  setCandidates: React.Dispatch<React.SetStateAction<any[]>>;
  selectedCandidate: number[];
  setSelectedCandidate: React.Dispatch<React.SetStateAction<number[]>>;
  convertStatus: boolean;
  setConvertStatus: React.Dispatch<React.SetStateAction<boolean>>;
  tiggerConvert: boolean;
  setTriggerConvert: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {/*  button part */}
      <ButtonConfirm
        label='Convert Status'
        onClick={async () => {
          //  remarks: case of no selection
          if (selectedCandidate.length === 0) {
            alert('[Error] Please select any candidate.');
            return;
          }
          try {
            //  1. popup window, action works on popup window
            setTriggerConvert(true);
          } catch (err: any) {
            //  remarks: error handling
            console.error('Toggle Status Error:', {
              error: err,
              message: err.message,
            });
            alert(
              `Error: ${err.response?.data?.message || err.message || 'Failed to update candidate status'}`,
            );
          }
        }}
        style={{ backgroundColor: COLORS.light_gray, color: COLORS.dark_teal }}
      />
      {/*  window part */}
      {tiggerConvert && (
        <div className='fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>
              Convert Status
            </h2>
            <p className='text-gray-600 mb-6'>
              Select a new status for the selected candidates.
            </p>
            <div className='mb-6 space-y-3'>
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
            <div className='flex gap-3'>
              <button
                type='button'
                onClick={() => {
                  setTriggerConvert(false);
                }}
                className='flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    //  remarks:  no selected candidates
                    if (!candidates || candidates.length === 0) {
                      alert('Please select any candidate.');
                      return;
                    }
                    // remarks: update status with assignated status
                    await axios.patch(API.CANDIDATES_ACTIVATE, {
                      _ids: selectedCandidate.map((id) => String(id)),
                      is_active: convertStatus,
                    });
                    // remarks: refresh with updated data
                    const res = await axios.get(API.CANDIDATES);
                    const result = res?.data?.data?.result || [];

                    setCandidates(result);
                    // remarks: return local states
                    setSelectedCandidate([]);
                    setTriggerConvert(false);
                    alert('Status updated successfully!');
                  } catch (err: any) {
                    // remarks: error handling
                    console.error('Error updating status:', err);
                    const errorMsg =
                      err.response?.data?.message ||
                      err.message ||
                      'Failed to update candidate status';
                    alert(`Error: ${errorMsg}`);
                  }
                }}
                className='flex-1 px-4 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

//  ==========    Supporting Functions    ==========

const handle_checkbox_status = (
  id: number,
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  setSelectedCandidates((checklist) => {
    const selected = checklist.includes(id);
    if (selected) {
      return checklist.filter((item) => item !== id);
    } else {
      return [...checklist, id];
    }
  });
};

const handle_checkbox_select_all = (
  event: React.ChangeEvent<HTMLInputElement>,
  candidates: any[],
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  const isChecked = event.target.checked;
  if (isChecked && candidates && candidates.length > 0) {
    const id_list = candidates.map((candidate) => candidate._id as number);
    setSelectedCandidates(id_list);
  } else {
    setSelectedCandidates([]);
  }
};
