import { useSelectWeightContext } from '../utils/context';
import { COLORS } from '../../../../styles/color';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { HREF } from '../../../../config/href';


//  ==========     MAIN DISPLAY     ==========

// remarks: constant - table header (main display)
const table_headers = [
  { label: 'ID', className: 'w-8', key: 'id' },
  { label: 'Strategy', className: 'min-w-20', key: 'strategy_name' },
  { label: 'Education Share', className: 'min-w-20', key: 'weight_edu' },
  { label: 'Experience Share', className: 'min-w-20', key: 'weight_exp' },
  { label: 'Test Share', className: 'min-w-20', key: 'weight_test' },
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
    key: 'strategy_name',
    className: 'p-2 text-sm font-bold cursor-pointer',
    style: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    element: (el: any) => (
      <Link to={HREF.SELECT_WEIGHT_PROFILE(el._id)} className="hover:underline hover:text-teal-700">
        {el.strategy_name}
      </Link>
    ),
  },
  {
    key: 'weight_edu',
    className: 'p-2 text-sm min-w-20',
    element: (el: any) => el.weight_edu ?? 'N/A',
  },
  {
    key: 'weight_exp',
    className: 'p-2 text-sm min-w-20',
    element: (el: any) => el.weight_exp ?? 'N/A',
  },
  {
    key: 'weight_test',
    className: 'p-2 text-sm min-w-20',
    element: (el: any) => el.weight_test ?? 'N/A',
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

//  remarks: table head for select weight data
export function TableHeaderBox(): JSX.Element {
  const { selectedWeight, setSelectedWeight } = useSelectWeightContext();
  const select_weight = useSelector((state: RootState) => state.select_weight.value);
  //  display
  return (
    <thead className="sticky top-0 z-10 bg-slate-200">
      <tr>
        {/*  checkbox column  */}
        <TableHeadCheckbox
          unit={select_weight}
          selected={selectedWeight}
          onSelectChange={setSelectedWeight}
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
  const { selectedWeight, setSelectedWeight } = useSelectWeightContext ();
  const select_weight = useSelector((state: RootState) => state.select_weight.value);
  if (!select_weight || select_weight.length === 0) {
    return (
      <p className="py-4 text-gray-500 transition-all ease-in-out duration-600">
        No Select Weight Strategy found.
      </p>
    );
  }
  // display
  return (
    <tbody className="relative transition-all ease-in-out duration-600">
      {select_weight.map((el: any) => (
        <tr
          key={el._id}
          style={{
            borderBottom: `1px solid ${COLORS.light_gray}`,
            opacity: el.is_active === false ? 0.6 : 1,
          }}
          className={`
                  ${el.is_active === false ? 'bg-gray-100' : ''}
                  ${selectedWeight.includes(el._id) ? 'bg-teal-100' : ''}`}
        >
          {/*  checkbox column  */}
          <td className="p-2 text-center align-middle">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              checked={selectedWeight.includes(el._id)}
              onChange={() => {
                setSelectedWeight((checklist: any) => {
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
