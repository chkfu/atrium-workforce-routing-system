import { CSSProperties } from 'react';
import { COLORS } from '../styles/color';

interface ButtonConfirmProps {
  label: string;
  onClick: () => void;
  style?: CSSProperties;
  disabled?: boolean;
}

export default function ButtonConfirm({
  label,
  onClick,
  style,
}: ButtonConfirmProps): JSX.Element {
  return (
    <button
      type='button'
      className='px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:brightness-105 active:scale-[0.95] transition-all duration-200 font-sans text-gray-800 shadow-lg'
      onClick={onClick}
      style={{ backgroundColor: COLORS.button_yellow, ...style }}
    >
      {label}
    </button>
  );
}
