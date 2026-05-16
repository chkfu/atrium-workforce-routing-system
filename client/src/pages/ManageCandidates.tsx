import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { Formik, Form, useFormikContext } from 'formik';
import Accordion from '../elements/Accordion';
import ButtonConfirm from '../elements/ButtonConfirm';

export default function ManageCandidates(): JSX.Element {
  //  hooks
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('https://localhost:8080/api/v1/candidates')
      .then((response) => {
        const cadidateEls = response.data.data.result.map((el: any) => ({
          ...el,
          key: uuid(),
        }));
        setCandidates(cadidateEls);
      })
      .catch((err: any) => {
        console.error('Error fetching candidates:', err);
        setError(err.message || 'Failed to load candidates');
      });
  }, []);
  //  error handling
  if (error) {
    return <div className='p-4 text-red-600'>Error: {error}</div>;
  }
  if (candidates.length === 0) {
    return <div className='p-4 text-gray-500'>No candidates found</div>;
  }
  //  display
  return (
    <div id='manage-candidates-container'>
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
              selectedCandidate={selectedCandidates}
              setSelectedCandidate={setSelectedCandidates}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          )}
        </Formik>
      </Accordion>
    </div>
  );
}

//  Core Containers

function PanelFromContainer({
  candidates,
  selectedCandidate,
  setSelectedCandidate,
  searchText,
  setSearchText,
}: {
  candidates: any[];
  selectedCandidate: number[];
  setSelectedCandidate: React.Dispatch<React.SetStateAction<number[]>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  //  hooks
  const { submitForm } = useFormikContext<any>();
  //  display
  return (
    <Form>
      {/*  control panel */}
      <div className='py-4'>
        <FormSearchBox
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <FormButtonBox submitForm={submitForm} />
      </div>
      {/*  table panel */}
      <div
        className='w-full py-4'
        style={{ overflow: 'scroll', overflowY: 'hidden' }}
      >
        <p
          className={`mb-4 text-sm text-gray-500 transition-opacity duration-500 ease-in-out
            ${selectedCandidate.length === 0 ? 'invisible' : 'visible'}
            ${selectedCandidate.length === 0 ? 'opacity-0' : 'opacity-100'}`}
        >
          Selection: {selectedCandidate.length}{' '}
          {selectedCandidate.length === 1 ? 'candidate' : 'candidates'} selected
        </p>
        <table
          className='table-auto'
          style={{
            width: '1200px',
            borderCollapse: 'collapse',
            tableLayout: 'auto',
          }}
        >
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
    </Form>
  );
}

//  Boxes

function FormSearchBox({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  return (
    <div className='mb-4 flex gap-2'>
      <select className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600'>
        <option value='id'>ID</option>
        <option value='name'>Name</option>
        <option value='email'>Email</option>
        <option value='status'>Status</option>
      </select>
      <input
        type='text'
        placeholder='Search candidates...'
        className='w-3/9 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ButtonConfirm
        label='Search'
        onClick={() => {
          console.log(searchText);
        }}
        style={{
          backgroundColor: '#0f766e',
          color: '#ffffff',
        }}
      />
      s
    </div>
  );
}

function FormButtonBox({
  submitForm,
}: {
  submitForm: () => void;
}): JSX.Element {
  return (
    <div className='flex flex-wrap gap-2'>
      <ButtonConfirm
        label='Refresh'
        onClick={() => {
          console.log('Refresh');
        }}
        style={{
          backgroundColor: '#0f766e',
          color: '#ffffff',
        }}
      />
      <ButtonConfirm
        label='Create'
        onClick={() => {
          console.log('Batch Create');
        }}
        style={{ backgroundColor: '#eeeeee', color: '#0f766e' }}
      />
      <ButtonConfirm
        label='Update'
        onClick={() => {
          submitForm();
          console.log('Batch Update');
        }}
        style={{ backgroundColor: '#eeeeee', color: '#0f766e' }}
      />
      <ButtonConfirm
        label='Inactivate'
        onClick={() => {
          submitForm();
          console.log('Batch Inactivate');
        }}
        style={{ backgroundColor: '#eeeeee', color: '#0f766e' }}
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
      <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
        {/*  checkbox column  */}
        <th className='w-16 p-3 text-center align-middle'>
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
              selectedCandidates.length === candidates.length &&
              candidates.length > 0
            }
          />
        </th>
        {/*  data columns  */}
        {table_headers.map((header) => (
          <th
            key={header.key}
            className={`p-3 text-left font-bold ${header.className} whitespace-nowrap`}
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
      className: 'p-3 text-gray-500',
      element: (el: any) => `#${el._id}`,
    },
    {
      key: 'name',
      className: 'p-3 font-bold cursor-pointer',
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      element: (el: any) => `${el.first_name} ${el.last_name}`,
    },
    {
      key: 'email',
      className: 'p-3 min-w-40',
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      element: (el: any) => el.email,
    },
    {
      key: 'gender',
      className: 'p-3',
      element: (el: any) =>
        el.gender === 'male' || el.gender === 'female'
          ? el.gender.charAt(0).toUpperCase() + el.gender.slice(1)
          : '',
    },
    {
      key: 'status',
      className: 'p-3 font-bold',
      element: (el: any) =>
        el.prob_status.charAt(0).toUpperCase() + el.prob_status.slice(1),
    },
    {
      key: 'active',
      className: 'p-3 font-bold',
      element: (el: any) => (el.is_active ? 'Active' : 'Inactive'),
      getStyle: (el: any) => ({
        color: el.is_active ? '#0d9488' : '#991b1b',
      }),
    },
    {
      key: 'created',
      className: 'p-3 text-gray-500 whitespace-nowrap',
      element: (el: any) => new Date(el.created_at).toISOString().split('T')[0],
    },
    {
      key: 'updated',
      className: 'p-3 text-gray-500 whitespace-nowrap',
      element: (el: any) => new Date(el.updated_at).toISOString().split('T')[0],
    },
  ];
  // display
  return (
    <tbody>
      {candidates.map((el: any) => (
        <tr
          key={el.key}
          style={{
            borderBottom: '1px solid #f3f4f6',
          }}
          className={`
                  ${el.is_active === false ? 'bg-gray-100 opacity-60' : ''}
                  ${selectedCandidates.includes(el._id) ? 'bg-teal-100 opacity-100' : ''}`}
        >
          {/*  checkbox column  */}
          <td className='p-3 text-center align-middle'>
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

//  Supporting Functions

const handle_checkbox_status = (
  id: number,
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  setSelectedCandidates((checklist) => {
    const selected = checklist.includes(id);
    if (selected) {
      const updated = checklist.filter((item) => item !== id);
      return updated;
    } else {
      const updated = [...checklist, id];
      return updated;
    }
  });
};

const handle_checkbox_select_all = (
  event: React.ChangeEvent<HTMLInputElement>,
  candidates: any[],
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  const isChecked = event.target.checked;
  if (isChecked) {
    const id_list = candidates.map((candidate) => candidate._id);
    setSelectedCandidates(id_list);
  } else {
    setSelectedCandidates([]);
  }
};
