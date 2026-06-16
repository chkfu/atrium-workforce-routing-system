import { useStaffContext } from '../utils/context';
import { COLORS } from '../../../styles/color';

//  ==========     MAIN DISPLAY     ==========

// remarks: constant - table header (main display)
const table_headers = [
  { label: 'ID', className: 'w-8', key: 'id' },
  { label: 'Name', className: 'min-w-20', key: 'name' },
  { label: 'Email', className: 'min-w-30', key: 'email' },
  { label: 'Position', className: 'min-w-20', key: 'position' },
  { label: 'Grade', className: 'min-w-20', key: 'grade' },
  { label: 'Department', className: 'min-w-20', key: 'department' },
  { label: 'Active', className: 'min-w-20', key: 'active' },
  { label: 'Created', className: 'min-w-20', key: 'created' },
  { label: 'Updated', className: 'min-w-20', key: 'updated' },
];

//  remarks: constant - table column (main display)
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
    element: (el: any) => el.work_email,
  },
  {
    key: 'position',
    className: 'p-2 text-sm',
    element: (el: any) => el.work_position || 'N/A',
  },
  {
    key: 'grade',
    className: 'p-2 text-sm',
    element: (el: any) => el.work_grade || 'N/A',
  },
  {
    key: 'department',
    className: 'p-2 text-sm',
    element: (el: any) => {
      const deptMap: { [key: string]: string } = {
        '1': 'Business Analytics',
        '2': 'Cloud Infrastructure',
        '3': 'Data Engineering',
        '4': 'Application Development',
        '5': 'Project Management Office',
        '6': 'Solutions Architecture',
        '7': 'Cyber Security',
      };
      return deptMap[el.dept_id] || 'N/A';
    },
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

//  remarks: table head for Staff data
export function TableHeaderBox(): JSX.Element {
  const { staff, selectedStaff, setSelectedStaff } = useStaffContext();
  //  display
  return (
    <thead className='sticky top-0 z-10 bg-slate-200'>
      <tr>
        {/*  checkbox column  */}
        <TableHeadCheckbox
          unit={staff}
          selected={selectedStaff}
          onSelectChange={setSelectedStaff}
        />
        {/*  data columns  */}
        {table_headers.map((header) => (
          <th
            key={header.key}
            className={`p-2 text-sm text-left font-bold sticky top-0 bg-slate-50 z-10 border-b-2 border-gray-300 ${header.className} whitespace-nowrap`}
          >
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

//  remarks: table body for staff data
export function TableBodyBox(): JSX.Element {
  const { staff, selectedStaff, setSelectedStaff } = useStaffContext();
  if (!staff || staff.length === 0) {
    return (
      <p className='py-4 text-gray-500 transition-all ease-in-out duration-600'>
        No Staff found.
      </p>
    );
  }
  // display
  return (
    <tbody className='relative transition-all ease-in-out duration-600'>
      {staff.map((el: any) => (
        <tr
          key={el._id}
          style={{
            borderBottom: `1px solid ${COLORS.light_gray}`,
            opacity: el.is_active === false ? 0.6 : 1,
          }}
          className={`
                  ${el.is_active === false ? 'bg-gray-100' : ''}
                  ${selectedStaff.includes(el._id) ? 'bg-teal-100' : ''}`}
        >
          {/*  checkbox column  */}
          <td className='p-2 text-center align-middle'>
            <input
              type='checkbox'
              className='w-4 h-4 cursor-pointer'
              checked={selectedStaff.includes(el._id)}
              onChange={() => {
                setSelectedStaff((checklist: any) => {
                  if (checklist.includes(el._id)) {
                    return checklist.filter((item: any) => item !== el._id);
                  } else {
                    return [...checklist, el._id];
                  }
                });
              }}
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

//  remarks: checkbox of table display
export function TableHeadCheckbox({
  unit,
  selected,
  onSelectChange,
}: {
  unit: any[];
  selected: number[];
  onSelectChange: (selectedIds: number[]) => void;
}): JSX.Element {
  //  remarks: declaration
  const check_selected: boolean =
    unit && unit.length > 0 && selected.length === unit.length;
  //  display
  return (
    <th className='p-2 text-center align-middle sticky top-0 bg-slate-50 z-10 shadow-2xl'>
      <input
        type='checkbox'
        className='w-4 h-4 cursor-pointer'
        onChange={(e) => {
          if (e.target.checked) {
            onSelectChange(unit.map((item: any) => item._id));
          } else {
            onSelectChange([]);
          }
        }}
        checked={check_selected}
      />
    </th>
  );
}
