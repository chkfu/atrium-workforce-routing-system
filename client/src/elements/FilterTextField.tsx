export default function FilterTextField({
  id,
  type,
  name,
  label,
  placeholder = 'Insert keywords...',
  value,
  onChange,
}: {
  id?: string;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (el: any) => void;
}) {
  return (
    <div className='group contents'>
      <label
        htmlFor={id}
        className='text-sm font-medium text-gray-700 group-focus-within:text-teal-600 transition-all duration-600'
      >
        {label}:
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 duration-600 transition-all w-56'
      />
    </div>
  );
}
