import { CSSProperties } from 'react';

interface ButtonConfirmProps {
  label: string;
  onClick: () => void;
  style?: CSSProperties;
}

export default function ButtonConfirm({
  label,
  onClick,
  style,
}: ButtonConfirmProps): JSX.Element {
  return (
    <button
      type='button'
      className='px-6 py-2 rounded-xl font-semibold text-lg cursor-pointer hover:brightness-105 active:scale-[0.95] transition-all duration-200 font-sans text-gray-800 shadow-lg'
      onClick={onClick}
      style={{ backgroundColor: '#eab308', ...style }}
    >
      {label}
    </button>
  );
}
