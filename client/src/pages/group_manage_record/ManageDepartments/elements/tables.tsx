import { useDepartmentContext } from '../utils/context';
import { COLORS } from '../../../../styles/color';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { Link } from 'react-router-dom';
import { HREF } from '../../../../config/href';

//  ==========     MAIN DISPLAY     ==========

// remarks: constant - table header (main display)
const table_headers = [
  { label: 'ID', className: 'w-8', key: 'id' },
  { label: 'Department', className: 'min-w-20', key: 'dept-name' },
  { label: 'Capcity', className: 'min-w-20', key: 'dept-weight' },
  { label: 'Weighting', className: 'min-w-20', key: 'importance_weight' },
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
    element: (el: any) => (
      <Link to={HREF.DEPARTMENT_PROFILE(el._id)} className="hover:underline hover:text-teal-700">
        {el.dept_name}
      </Link>
    ),
  },
  {
    key: 'capacity',
    className: 'p-2 text-sm min-w-20',
    style: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    element: (el: any) => el.dept_capacity,
  },
  {
    key: 'weighting',
    className: 'p-2 text-sm',
    element: (el: any) => el.importance_weight || 'N/A',
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

//  remarks: table head for Department data
export function TableHeaderBox(): JSX.Element {
  const { selectedDepartments, setSelectedDepartments } = useDepartmentContext();
  const departments = useSelector((state: RootState) => state.department.value);
  //  display
  return (
    <thead className="sticky top-0 z-10 bg-slate-200">
      <tr>
        {/*  checkbox column  */}
        <TableHeadCheckbox
          unit={departments}
          selected={selectedDepartments}
          onSelectChange={setSelectedDepartments}
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
  const { selectedDepartments, setSelectedDepartments } = useDepartmentContext();
  const departments = useSelector((state: RootState) => state.department.value);
  if (!departments || departments.length === 0) {
    return (
      <p className="py-4 text-gray-500 transition-all ease-in-out duration-600">
        No Department found.
      </p>
    );
  }
  // display
  return (
    <tbody className="relative transition-all ease-in-out duration-600">
      {departments.map((el: any) => (
        <tr
          key={el._id}
          style={{
            borderBottom: `1px solid ${COLORS.light_gray}`,
            opacity: el.is_active === false ? 0.6 : 1,
          }}
          className={`
                  ${el.is_active === false ? 'bg-gray-100' : ''}
                  ${selectedDepartments.includes(el._id) ? 'bg-teal-100' : ''}`}
        >
          {/*  checkbox column  */}
          <td className="p-2 text-center align-middle">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              checked={selectedDepartments.includes(el._id)}
              onChange={() => {
                setSelectedDepartments((checklist: any) => {
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
  const check_selected: boolean = unit && unit.length > 0 && selected.length === unit.length;
  //  display
  return (
    <th className="p-2 text-center align-middle sticky top-0 bg-slate-50 z-10 shadow-2xl">
      <input
        type="checkbox"
        className="w-4 h-4 cursor-pointer"
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
