import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonCandidateDetailsReset,
  ButtonCandidateDetailsSubmit,
} from '../../pages/group_profile/ProfileCandidates/elements/buttons';
import { select_input_field } from './handlers/select_input_field';


export function FormSubsectionUpdateReuse<T extends { created_at: Date | string; updated_at: Date | string; is_active: boolean }>({
  sect_state,
  form_schema,
  submit_handler,
  form_structure,
  form_title = '',
  form_subtitle = '',
}: {
  sect_state: T | null;
  form_schema: any;
  submit_handler: (data: any) => void;
  form_structure: any;
  form_title?: string;
  form_subtitle?: string;
}): JSX.Element {

  //  remarks: extracted react hook form methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    defaultValues: sect_state || { is_active: true },
    resolver: yupResolver(form_schema),
  });

  //  remarks: update saved values and reset form when sect_state changes (exclude reset from deps)
  useEffect(() => {
    if (sect_state) {
      reset({
        ...sect_state,
        is_active: String(sect_state.is_active),
      });
    } else {
      const empty: any = {};
      Object.keys(form_structure).forEach((key) => {
        if (key === 'is_active') {
          empty[key] = 'true';
        } else {
          empty[key] = '';
        }
      });
      reset(empty);
    }
  }, [sect_state, reset, form_structure]);

  const handleReset = () => {
    if (sect_state) {
      reset({
        ...sect_state,
        is_active: String(sect_state.is_active),
      });
    } else {
      const empty: any = {};
      Object.keys(form_structure).forEach((key) => {
        if (key === 'is_active') {
          empty[key] = 'true';
        } else {
          empty[key] = '';
        }
      });
      reset(empty);
    }
  };
  //
  const entries = Object.entries(form_structure);
  const rows = [];
  for (let i = 0; i < entries.length; i += 2) {
    rows.push(entries.slice(i, i + 2));
  }
  //  remarks: display
  return (
    <form className="mt-4" onSubmit={handleSubmit(submit_handler)}>
      {/*  box: title + description */}
      <div className="mb-4 py-1">
        <h3 className="font-bold text-lg">{form_title}</h3>
        <p className="text-gray-500 text-md">{form_subtitle}</p>
      </div>
      {/*  box: input fields  */}
      {rows.map((row, index) => (
        <div key={index} className="flex flex-col gap-2 md:flex-row">
          {row.map(([name, config]) => (
            <div key={name} className={`${row.length === 1 ? 'md:w-1/2 w-full' : 'flex-1'} min-w-0`}>
              {select_input_field(name, config, register, errors)}
            </div>
          ))}
        </div>
      ))}
      {/*  box: button for form control  */}
      <div className="flex justify-end gap-4 mt-4">
        <ButtonCandidateDetailsReset reset={handleReset} />
        <ButtonCandidateDetailsSubmit />
      </div>
    </form>
  );
}
