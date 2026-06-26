import FormTextField from '../../../../elements/FormTextField';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import FormSelectInput from '../../../../elements/FormSelectInput';
import {
  enum_cert_degree,
  enum_cert_institute,
  enum_cert_major,
  enum_gender,
  enum_prob_status,
} from '../../../../utils/types/page_enums';
import { ICandidate, ICandidateEdu } from '../../../../utils/types/redux_types';
import {
  handle_candidate_details_submit,
  handle_create_candidate_edu_submit,
} from '../utils/handlers';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateCandidateSchema } from '../../../group_manage_record/ManageCandidates/utils/schema';
import { UpdateCandidateEduSchema } from '../utils/schema';
import {
  ButtonCandidateDetailsReset,
  ButtonCandidateDetailsSubmit,
  ButtonCandidateEduReset,
  ButtonCandidateEduSubmit,
} from './buttons';
import { PLACEHOLDER_SELECT } from '../../../../utils/constants';

// =========== Forms ==========

const default_date_format = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
} as const;

// remarks: Input form for the section - candidate details

export function FormCandidateDetails({
  targetCandidate,
}: {
  targetCandidate: ICandidate | null;
}): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    defaultValues: targetCandidate || {},
    resolver: yupResolver(UpdateCandidateSchema),
  });

  const { id } = useParams();

  useEffect(() => {
    if (targetCandidate) {
      reset({
        ...targetCandidate,
        created_at: new Date(targetCandidate.created_at).toLocaleString(
          'en-GB',
          default_date_format
        ),
        updated_at: new Date(targetCandidate.updated_at).toLocaleString(
          'en-GB',
          default_date_format
        ),
      });
    }
  }, [targetCandidate, reset]);

  return (
    <form
      className="mt-4"
      onSubmit={handleSubmit((data) => handle_candidate_details_submit(id as string, data))}
    >
      <div>
        {/* row 0: identifier */}
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex-1 min-w-0">
            <FormTextField
              type="text"
              label="Identifier"
              register={register('_id')}
              error={errors._id as any}
              isDisabled={true}
              required={false}
            />
          </div>
          <div className="flex-1 min-w-0" />
        </div>
        {/* row 1: first name + last name */}
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex-1 min-w-0">
            <FormTextField
              type="text"
              label="First Name"
              placeholder="Insert keywords..."
              register={register('first_name')}
              error={errors.first_name as any}
              isDisabled={false}
              required={false}
            />
          </div>
          <div className="flex-1 min-w-0">
            <FormTextField
              type="text"
              label="Last Name"
              placeholder="Insert keywords..."
              register={register('last_name')}
              error={errors.last_name as any}
              isDisabled={false}
              required={false}
            />
          </div>
        </div>
        {/* row 2: gender + email */}
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex-1 min-w-0">
            <FormSelectInput
              label="Gender"
              options={Object.entries(enum_gender).map(([key, value]) => ({
                value: value,
                label: key.charAt(0).toUpperCase() + key.slice(1),
              }))}
              register={register('gender')}
              error={errors.gender as any}
              isDisabled={false}
              required={false}
            />
          </div>
          <div className="flex-1 min-w-0">
            <FormTextField
              type="email"
              label="Email"
              register={register('email')}
              error={errors.email as any}
              isDisabled={false}
              required={false}
            />
          </div>
        </div>
        {/* row 3: candidate stage and active status */}
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex-1 min-w-0">
            <FormSelectInput
              label="Candidate Stage"
              options={Object.entries(enum_prob_status).map(([key, value]) => ({
                value: value,
                label: key.charAt(0).toUpperCase() + key.slice(1),
              }))}
              register={register('prob_status')}
              error={errors.prob_status as any}
              isDisabled={false}
              required={false}
              placeholder={PLACEHOLDER_SELECT}
            />
          </div>
          <div className="flex-1 min-w-0">
            <FormSelectInput
              label="Active Status"
              options={[
                { value: 'true', label: 'True' },
                {
                  value: 'false',
                  label: 'False',
                },
              ]}
              register={register('is_active')}
              error={errors.is_active}
              isDisabled={false}
              required={false}
              placeholder={PLACEHOLDER_SELECT}
            />
          </div>
        </div>
        {/* row 4: created at and updated at */}
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex-1 min-w-0">
            <FormTextField
              type="text"
              label="Created at"
              register={register('created_at')}
              error={errors.created_at}
              isDisabled={true}
              required={false}
            />
          </div>
          <div className="flex-1 min-w-0">
            <FormTextField
              type="text"
              label="Updated at"
              register={register('updated_at')}
              error={errors.updated_at}
              isDisabled={true}
              required={false}
            />
          </div>
        </div>
        {/* button box */}
        <div className="flex justify-end gap-4 mt-4">
          <ButtonCandidateDetailsReset reset={reset} />
          <ButtonCandidateDetailsSubmit />
        </div>
      </div>
    </form>
  );
}

//  remarks: reusable form for create record in sub-section forms

export function FormSectionCreateReuse<T extends Record<string, any> = any>({
  sect_state,
  form_trigger,
  form_title = '',
  form_subtitle = '',
  form_structure,
  form_schema = UpdateCandidateEduSchema,
}: {
  sect_state: T | null;
  form_trigger: (value: boolean) => void;
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
  //  remarks: extracted candidate id for further updates
  const { id } = useParams();
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
  //  remakrs: submit handler
  const onSubmit = async (data: any) => {
    const success = await handle_create_candidate_edu_submit(id as string, data);
    if (success) {
      form_trigger(false);
    }
  };
  //  remarks: decide the applicable input fields
  const select_input_field = (name: string, config: any) => {
    if (config.type === 'select') {
      return (
        <FormSelectInput
          label={config.label}
          options={config.options}
          register={register(name)}
          error={errors[name] as any}
          isDisabled={false}
          required={false}
          placeholder={config.placeholder}
        />
      );
    } else
      return (
        <FormTextField
          type={config.type || 'text'}
          label={config.label}
          placeholder={config.placeholder}
          register={register(name)}
          error={errors[name]}
          isDisabled={false}
          required={false}
        />
      );
  };

  //  remarks: convert to array for iteration
  const entries = Object.entries(form_structure);
  const rows = [];
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
            <div key={name} className="flex-1 min-w-0">
              {select_input_field(name, config)}
            </div>
          ))}
        </div>
      ))}

      {/*  box: button for form control  */}
      <div className="flex justify-end gap-4 mt-4">
        <ButtonCandidateEduReset reset={reset} />
        <ButtonCandidateEduSubmit />
      </div>
    </form>
  );
}
