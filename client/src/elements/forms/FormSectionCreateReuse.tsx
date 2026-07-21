import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateCandidateEduSchema } from '../../pages/group_profile/ProfileCandidates/utils/schema';
import { ButtonCandidateEduReset, ButtonCandidateEduSubmit } from '../../pages/group_profile/ProfileCandidates/elements/buttons';
import { select_input_field } from './handlers/select_input_field';

//  remarks: reusable form for create record in sub-section forms
export function FormSectionCreateReuse<T extends Record<string, any> = any>({
  sect_state,
  form_trigger,
  submit_handler,
  form_title = '',
  form_subtitle = '',
  form_structure,
  form_schema = UpdateCandidateEduSchema,
}: {
  sect_state: T | null;
  form_trigger: (value: boolean) => void;
  submit_handler: (data: any) => Promise<boolean>;
  form_title?: string;
  form_subtitle?: string;
  form_structure: Record<string, any>;
  form_schema?: any;
}): JSX.Element {
  //  remarks: get react hook form methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    defaultValues: sect_state || {},
    resolver: yupResolver(form_schema),
  });
  //  remarks: immediately re-rendering the form once data has been updated
  useEffect(() => {
    if (sect_state) {
      reset({
        ...sect_state,
        is_verified: String(sect_state.is_verified),
        is_active: String(sect_state.is_active),
      });
    } else {
      const empty: any = {};
      Object.keys(form_structure).forEach((key) => {
        //  learnt: while updated yup schema, input field building also need to be specified
        if (key === 'is_active') {
          empty[key] = 'true';
        } else if (key === 'is_verified') {
          empty[key] = 'false';
        } else {
          empty[key] = '';
        }
      });
      reset(empty);
    }
  }, [sect_state, reset, form_structure]);
  //  remarks: tracks in-flight save requests, so the button shows "Loading..." and disables during the round-trip
  const [isLoading, setIsLoading] = useState(false);

  //  remakrs: submit handler
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const success: boolean = await submit_handler(data);
      if (success) {
        form_trigger(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  //  remarks: convert to array for iteration
  const entries = Object.entries(form_structure);
  const rows = [];
  //  remarks: two fields per row
  for (let i = 0; i < entries.length; i += 2) {
    rows.push(entries.slice(i, i + 2));
  }

  //  remarks: display
  return (
    <form className="mt-4 pb-4 border-b border-gray-400" onSubmit={handleSubmit(onSubmit)}>
      {/*  box: title and description  */}
      <div className="mb-4 py-1">
        <h3 className="font-bold text-lg">{form_title}</h3>
        <p className="text-gray-500 text-md">{form_subtitle}</p>
      </div>

      {/*  box: input fields  */}
      {rows.map((row, index: number) => (
        <div key={index} className="flex flex-col gap-2 md:flex-row">
          {row.map(([name, config]) => (
            <div key={name} className={`${row.length === 1 ? 'w-full md:w-1/2' : 'flex-1'} min-w-0`}>
              {select_input_field(name, config, register, errors)}
            </div>
          ))}
        </div>
      ))}

      {/*  box: button for form control  */}
      <div className="flex justify-end gap-4 mt-4">
        <ButtonCandidateEduReset reset={reset} />
        <ButtonCandidateEduSubmit isLoading={isLoading} />
      </div>
    </form>
  );
}
