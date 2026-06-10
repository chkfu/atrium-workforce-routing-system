export default function FilterDateRangeInput({
  label,
  fromId,
  toId,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
}: {
  label: string;
  fromId: string;
  toId: string;
  fromValue: string;
  toValue: string;
  onFromChange: (el: any) => void;
  onToChange: (el: any) => void;
}) {
  return (
    <div className='group contents'>
      <label className='text-sm font-medium text-gray-700 group-focus-within:text-teal-600 transition-all duration-600'>
        {label}:
      </label>
      <div className='flex items-center gap-2'>
        {/*  section: from  */}
        <input
          id={fromId}
          type='date'
          value={fromValue}
          onChange={onFromChange}
          className='px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 duration-600 transition-all w-28'
        />
        <span className='text-sm text-gray-600'>～</span>
        {/*  section: to  */}
        <input
          id={toId}
          type='date'
          value={toValue}
          onChange={onToChange}
          className='px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 duration-600 transition-all w-28'
        />
      </div>
    </div>
  );
}
