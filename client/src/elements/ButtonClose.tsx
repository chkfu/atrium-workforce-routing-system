import React from 'react';
import close from '../assets/svg/close_icon.svg';
import { COLORS } from '../styles/color';

export default function ButtonClose({ fn }: { fn?: () => void }) {
  return (
    <button
      type='button'
      className='px-2 absolute top-4 right-2 text-gray-500 hover:text-gray-700 active:scale-95'
      onClick={fn}
    >
      <img
        src={close}
        alt='close'
        width='20'
        height='20'
        className='cursor-pointer hover:brightness-50 transition-all duration-600'
        style={{ color: COLORS.dark_teal }}
      />
    </button>
  );
}
