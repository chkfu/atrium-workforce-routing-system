import { CSSProperties } from 'react';
import { COLORS } from '../styles/color';

interface ButtonConfirmProps {
  label: string;
  onClick?: () => void;
  style?: CSSProperties;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function ButtonConfirm({
  label,
  onClick,
  style,
  disabled = false,
  type = 'button',
}: ButtonConfirmProps): JSX.Element {
  return (
    <button
      type={type}
      disabled={disabled}
      className='px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:brightness-105 active:scale-[0.95] transition-all duration-200 font-sans text-gray-800 shadow-md disabled:cursor-not-allowed disabled:opacity-50'
      onClick={onClick}
      style={{ backgroundColor: COLORS.button_yellow, ...style }}
    >
      {label}
    </button>
  );
}
