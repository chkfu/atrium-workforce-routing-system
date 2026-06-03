import React, { useState, useEffect } from 'react';

export default function Accordion({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): React.ReactNode {
  //  1. manage states
  const [isInitialised, setIsInitialised] = useState(false);
  const [AccordionOpen, setAccordionOpen] = useState(true);
  //  2, handle rendering
  useEffect(() => {
    setIsInitialised(true);
  }, []);

  //  3. display
  return (
    <div
      className={`rounded-lg duration-600 transition-all ${
        isInitialised ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className='flex items-center justify-between border-b border-teal-800 w-full p-2'>
        {/*  title part  */}
        <h2 className='text-teal-800 font-bold font-serif text-2xl'>{title}</h2>
        <button
          onClick={() => setAccordionOpen(!AccordionOpen)}
          className='text-teal-800 cursor-pointer hover:brightness-75 transition-transform ml-4 -mr-4 px-8'
          style={{ transitionDuration: '1500ms' }}
          aria-label='Toggle accordion'
        >
          <div
            className={`inline-block text-4xl transform transition-transform ${AccordionOpen ? '-rotate-180' : ''}`}
            style={{ transitionDuration: '1500ms' }}
          >
            ⌃
          </div>
        </button>
      </div>
      {/*  content part */}
      <div
        className={`flex flex-wrap gap-4 p-2 overflow-x-auto transition-all ${
          AccordionOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'
        }`}
        style={{ transitionDuration: '1500ms' }}
      >
        {children}
      </div>
    </div>
  );
}
