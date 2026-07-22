import React from 'react';
import Accordion from '../../../elements/Accordion';

export default function SectCardListReuse({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion title={title}>
      <div className="flex flex-wrap">{children}</div>
    </Accordion>
  );
}
