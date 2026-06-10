export default function FilterSelectInput({
  id,
  name,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  name: string;
  label: string;
  value: string | null;
  onChange: (el: any) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className='group contents'>
      <label
        htmlFor={id}
        className='text-sm font-medium text-gray-700 group-focus-within:text-teal-600 transition-all duration-600'
      >
        {label}:
      </label>
      <select
        id={id}
        name={name}
        value={value === null ? '' : String(value)}
        onChange={onChange}
        className='px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 duration-600 transition-all cursor-pointer w-56'
      >
        <option value=''>--- Please Select ---</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
