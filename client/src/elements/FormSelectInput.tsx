import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectInputProps {
  label: string;
  options: SelectOption[];
  error?: FieldError;
  register: UseFormRegisterReturn;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export default function FormSelectInput({
  label,
  options,
  error,
  register,
  required = false,
  placeholder = '--- Please Select ---',
  className = 'mb-4',
}: FormSelectInputProps) {
  return (
    <div className={`${className} group`}>
      {/*  section: label field */}
      <label className='block text-sm font-semibold text-gray-700 mb-1 group-focus-within:text-teal-600 transition-colors duration-600'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>
      {/*  section: selection dropdown */}
      <select
        {...register}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-sm focus:border-teal-800 cursor-pointer transition-all ease-in-out duration-600 ${
          error
            ? 'border-red-500 focus:ring-red-300 bg-red-50'
            : 'border-gray-300 focus:ring-teal-300'
        }`}
      >
        {/*  section: option list by iteration */}
        <option value=''>{placeholder}</option>
        {options.map((el) => (
          <option
            key={el.value}
            value={el.value}
          >
            {el.label}
          </option>
        ))}
        {/*  section: error message by requirement */}
      </select>
      {error && (
        <p className='mt-1 text-sm font-bold text-red-600'>{error.message}</p>
      )}
    </div>
  );
}
