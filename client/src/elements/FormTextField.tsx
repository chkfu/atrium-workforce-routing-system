import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

export default function FormTextField({
  label,
  placeholder,
  type = 'text',
  error,
  register,
  isDisabled = false,
  required = false,
  className = 'mb-4',
  customisedOnChange,
}: {
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  error?: FieldError | any;
  register?: UseFormRegisterReturn;
  isDisabled?: boolean;
  required?: boolean;
  className?: string;
  customisedOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={`${className} group`}>
      {/*  section: label  */}
      <label className='block text-sm font-semibold text-gray-700 mb-1 group-focus-within:text-teal-600 transition-colors duration-600'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>
      {/*  section: input field */}
      <input
        type={type}
        placeholder={placeholder || label}
        disabled={isDisabled}
        {...(register || { onChange: customisedOnChange })}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-sm focus:text-teal-800 focus:border-teal-800 placeholder:text-sm transition-all duration-600 ${
          error
            ? 'border-red-500 focus:ring-red-300 bg-red-50'
            : 'border-gray-300 focus:ring-teal-300'
        } ${isDisabled ? 'bg-gray-200 text-gray-600' : ''}`}
      />
      {/*  section: error message, by requriements */}
      {error && (
        <p className='mt-1 text-sm font-bold text-red-600'>{error.message}</p>
      )}
    </div>
  );
}
