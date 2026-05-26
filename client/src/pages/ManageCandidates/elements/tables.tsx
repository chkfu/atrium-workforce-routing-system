import { useCandidateContext } from '../utils/context';
import { COLORS } from '../../../styles/color';
import {
  handle_checkbox_select_all,
  handle_checkbox_status,
} from '../utils/button-handlers';

//  ==========     MAIN DISPLAY     ==========

//  remarks: table head for candidates data
export function TableHeaderBox(): JSX.Element {
  const { candidates, selectedCandidates, setSelectedCandidates } =
    useCandidateContext();
  //  declaration
  const table_headers = [
    { label: 'ID', className: 'w-8', key: 'id' },
    { label: 'Name', className: 'min-w-20', key: 'name' },
    { label: 'Email', className: 'min-w-40', key: 'email' },
    { label: 'Gender', className: 'min-w-20', key: 'gender' },
    { label: 'Status', className: 'min-w-20', key: 'status' },
    { label: 'Active', className: 'min-w-20', key: 'active' },
    { label: 'Created', className: 'min-w-20', key: 'created' },
    { label: 'Updated', className: 'min-w-20', key: 'updated' },
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

//  remarks: table body forcandidates data
export function TableBodyBox(): JSX.Element {
  const { candidates, selectedCandidates, setSelectedCandidates } =
    useCandidateContext();
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
