import { useIntakesContext } from '../utils/context';
import { COLORS } from '../../../../styles/color';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

//  ==========     MAIN DISPLAY     ==========

// remarks: constant - table header (main display)
// remarks: sourced from view_prob_intakes (candidate name/dept/strategy/score results)
const table_headers = [
  { label: 'ID', className: 'w-8', key: 'id' },
  { label: 'Candidate', className: 'min-w-20', key: 'candidate' },
  { label: 'Gender', className: 'min-w-24', key: 'gender' },
  { label: 'Status', className: 'min-w-24', key: 'status' },
  { label: 'Department', className: 'min-w-40', key: 'dept' },
  { label: 'Strategy', className: 'min-w-28', key: 'strategy' },
  { label: 'Edu Score', className: 'min-w-20', key: 'edu_score' },
  { label: 'Exp Score', className: 'min-w-20', key: 'exp_score' },
  { label: 'Test Score', className: 'min-w-20', key: 'test_score' },
  { label: 'Total Score', className: 'min-w-20', key: 'total_score' },
  { label: 'Active', className: 'min-w-20', key: 'active' },
  { label: 'Created', className: 'min-w-20', key: 'created' },
  { label: 'Updated', className: 'min-w-20', key: 'updated' },
];

//  remarks: constant - table column (main display)
const table_cols = [
  {
    key: 'id',
    className: 'p-2 text-sm text-gray-500',
    element: (el: any) => `#${el.intake_id}`,
  },
  {
    key: 'candidate',
    className: 'p-2 text-sm font-bold',
    style: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    element: (el: any) => {
      const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);
      return `${capitalize(el.candidate_first_name ?? '')} ${capitalize(el.candidate_last_name ?? '')}`.trim();
    },
  },
  {
    key: 'gender',
    className: 'p-2 text-sm',
    element: (el: any) =>
      el.candidate_gender === 'male' || el.candidate_gender === 'female'
        ? el.candidate_gender.charAt(0).toUpperCase() + el.candidate_gender.slice(1)
        : '',
  },
  {
    key: 'status',
    className: 'p-2 text-sm font-bold',
    element: (el: any) =>
      el.candidate_prob_status
        ? el.candidate_prob_status.charAt(0).toUpperCase() + el.candidate_prob_status.slice(1)
        : '',
  },
  {
    key: 'dept',
    className: 'p-2 text-sm',
    element: (el: any) => el.intake_dept_name ?? '',
  },
  {
    key: 'strategy',
    className: 'p-2 text-sm',
    element: (el: any) => el.intake_strategy_name ?? '',
  },
  {
    key: 'edu_score',
    className: 'p-2 text-sm text-gray-500',
    element: (el: any) => Number(el.intake_edu_score).toFixed(2) ?? '',
  },
  {
    key: 'exp_score',
    className: 'p-2 text-sm text-gray-500',
    element: (el: any) => Number(el.intake_exp_score).toFixed(2) ?? '',
  },
  {
    key: 'test_score',
    className: 'p-2 text-sm text-gray-500',
    element: (el: any) => Number(el.intake_test_score).toFixed(2) ?? '',
  },
  {
    key: 'total_score',
    className: 'p-2 text-sm font-bold',
    element: (el: any) => Number(el.intake_total_score).toFixed(2) ?? '',
  },
  {
    key: 'active',
    className: 'p-2 text-sm font-bold',
    element: (el: any) => (el.intake_is_active ? 'Active' : 'Inactive'),
    getStyle: (el: any) => ({
      color: el.intake_is_active ? COLORS.success_teal : COLORS.error_red,
    }),
  },
  {
    key: 'created',
    className: 'p-2 text-sm text-gray-500 whitespace-nowrap',
    element: (el: any) => new Date(el.intake_created_at).toISOString().split('T')[0],
  },
  {
    key: 'updated',
    className: 'p-2 text-sm text-gray-500 whitespace-nowrap',
    element: (el: any) => new Date(el.intake_updated_at).toISOString().split('T')[0],
  },
];

//  remarks: table head for intake data
export function TableHeaderBox(): JSX.Element {
  const { selectedIntakes, setSelectedIntakes } = useIntakesContext();
  const intakes = useSelector((state: RootState) => state.candidates.value);
  //  display
  return (
    <thead className="sticky top-0 z-10 bg-slate-200">
      <tr>
        {/*  checkbox column  */}
        <TableHeadCheckbox
          unit={intakes}
          selected={selectedIntakes}
          onSelectChange={setSelectedIntakes}
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

//  remarks: table body for intake data
export function TableBodyBox(): JSX.Element {
  const { selectedIntakes, setSelectedIntakes } = useIntakesContext();
  const intakes = useSelector((state: RootState) => state.candidates.value);
  if (!intakes || intakes.length === 0) {
    return (
      <p className="py-4 text-gray-500 transition-all ease-in-out duration-600">
        No intakes found.
      </p>
    );
  }
  // display
  return (
    <tbody className="relative transition-all ease-in-out duration-600">
      {intakes.map((el: any) => (
        <tr
          key={el.intake_id}
          style={{
            borderBottom: `1px solid ${COLORS.light_gray}`,
            opacity: el.intake_is_active === false ? 0.6 : 1,
          }}
          className={`
                  ${el.intake_is_active === false ? 'bg-gray-100' : ''}
                  ${selectedIntakes.includes(el.intake_id) ? 'bg-teal-100' : ''}`}
        >
          {/*  checkbox column  */}
          <td className="p-2 text-center align-middle">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              checked={selectedIntakes.includes(el.intake_id)}
              onChange={() => {
                setSelectedIntakes((checklist) => {
                  if (checklist.includes(el.intake_id)) {
                    return checklist.filter((item) => item !== el.intake_id);
                  } else {
                    return [...checklist, el.intake_id];
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
            onSelectChange(unit.map((item: any) => item.intake_id));
          } else {
            onSelectChange([]);
          }
        }}
        checked={check_selected}
      />
    </th>
  );
}
