import { useState } from 'react';
import { ButtonCandidateTrigger } from '../ProfileCandidates/elements/buttons';
import { FormSectionCreateReuse } from './FormSectionCreateReuse';

//  ==========    Section: Reuse Component   ==========

export function BoxSubsectionCreateReuse<T extends Record<string, any> = any>({
  sect_state,
  sect_structure,
  form_title,
  form_subtitle,
  form_schema,
}: {
  sect_state: T | null;
  sect_structure: Record<string, any>;
  form_title: string;
  form_subtitle: string;
  form_schema?: any;
}): JSX.Element {
  const [triggerCreateForm, setTriggerCreateForm] = useState<boolean>(false);
  return (
    <div className="flex flex-col">
      <div className="flex justify-end mt-4">
        <ButtonCandidateTrigger
          triggerCreateForm={triggerCreateForm}
          setTriggerCreateForm={setTriggerCreateForm}
        />
      </div>
      {triggerCreateForm && (
        <FormSectionCreateReuse
          sect_state={sect_state}
          form_trigger={setTriggerCreateForm}
          form_title={form_title}
          form_subtitle={form_subtitle}
          form_structure={sect_structure}
          form_schema={form_schema}
        />
      )}
    </div>
  );
}
