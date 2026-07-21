import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonCandidateDetailsReset,
  ButtonCandidateDetailsSubmit,
  ButtonCandidateSubsectionDelete,
} from '../../pages/group_profile/ProfileCandidates/elements/buttons';
import { select_input_field } from './handlers/select_input_field';


export function FormSubsectionUpdateReuse<T extends { created_at: Date | string; updated_at: Date | string; is_active: boolean }>({
  sect_state,
  form_schema,
  submit_handler,
  form_structure,
  form_title = '',
  form_subtitle = '',
  on_delete,
}: {
  sect_state: T | null;
  form_schema: any;
  submit_handler: (data: any) => void | Promise<void | boolean>;
  form_structure: any;
  form_title?: string;
  form_subtitle?: string;
  on_delete?: () => void | Promise<void>;
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

  //  remarks: tracks in-flight save/delete requests, so both buttons show "Loading..." and disable during the round-trip
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await submit_handler(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = on_delete
    ? async () => {
        setIsLoading(true);
        try {
          await on_delete();
        } finally {
          setIsLoading(false);
        }
      }
    : undefined;

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
    <form className="mt-4" onSubmit={handleSubmit(handleFormSubmit)}>
      {/*  box: title + description */}
      <div className="mb-4 py-1 flex items-start justify-between">
        <div>
          <h3 className="font-bold text-lg">{form_title}</h3>
          <p className="text-gray-500 text-md">{form_subtitle}</p>
        </div>
        {/*  remarks: only shown when the caller passes on_delete, e.g. for existing education/experience records */}
        {handleDelete && <ButtonCandidateSubsectionDelete onClick={handleDelete} isLoading={isLoading} />}
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
        <ButtonCandidateDetailsSubmit isLoading={isLoading} />
      </div>
    </form>
  );
}
