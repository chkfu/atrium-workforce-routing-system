import React, { useState } from 'react';

export default function Accordion({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): React.ReactNode {
  //  1. manage states
  const [AccordionOpen, setAccordionOpen] = useState(true);

  //  2. display
  return (
    <div className='rounded-lg'>
      <div className='flex items-center justify-between border-b border-teal-800 w-full p-2'>
        {/*  title part  */}
        <h2 className='text-teal-800 font-bold font-serif text-2xl'>{title}</h2>
        <button
          onClick={() => setAccordionOpen(!AccordionOpen)}
          className='text-teal-800 cursor-pointer hover:brightness-75 transition-transform duration-700 ml-4 -mr-4 px-8'
          aria-label='Toggle accordion'
        >
          <div
            className={`inline-block text-4xl transform transition-transform duration-700 ${AccordionOpen ? '-rotate-180' : ''}`}
          >
            ⌃
          </div>
        </button>
      </div>
      {/*  content part */}
      <div
        className={`flex flex-wrap gap-4 p-2 overflow-x-auto transition-all duration-700 ${
          AccordionOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
