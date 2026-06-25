import FormTextField from '../../../../elements/FormTextField';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import FormSelectInput from '../../../../elements/FormSelectInput';
import {
  enum_cert_degree,
  enum_cert_institute,
  enum_cert_major,
  enum_gender,
  enum_prob_status,
} from '../../../../utils/types/page_enums';
import { ICandidate, ICandidateEdu } from '../../../../utils/types/redux_types';
import { handle_candidate_details_submit, handle_create_candidate_edu_submit } from '../utils/handlers';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateCandidateSchema } from '../../../group_manage_record/ManageCandidates/utils/schema';
import { UpdateCandidateEduSchema } from '../utils/schema';
import {
  ButtonCandidateDetailsReset,
  ButtonCandidateDetailsSubmit,
  ButtonCandidateEduReset,
  ButtonCandidateEduSubmit
} from './buttons';

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
          default_date_format,
        ),
        updated_at: new Date(targetCandidate.updated_at).toLocaleString(
          'en-GB',
          default_date_format,
        ),
      });
    }
  }, [targetCandidate, reset]);

  return (
    <form className='mt-4' onSubmit={handleSubmit((data) =>
      handle_candidate_details_submit(id as string, data),
    )}
    >
      <div>
        {/* row 0: identifier */}
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex-1 min-w-0'>
            <FormTextField type='text' label='Identifier' register={register('_id')} error={errors._id as any}
              isDisabled={true} required={false} />
          </div>
          <div className='flex-1 min-w-0' />
        </div>
        {/* row 1: first name + last name */}
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex-1 min-w-0'>
            <FormTextField type='text' label='First Name' placeholder='Insert keywords...'
              register={register('first_name')} error={errors.first_name as any} isDisabled={false}
              required={false} />
          </div>
          <div className='flex-1 min-w-0'>
            <FormTextField type='text' label='Last Name' placeholder='Insert keywords...'
              register={register('last_name')} error={errors.last_name as any} isDisabled={false}
              required={false} />
          </div>
        </div>
        {/* row 2: gender + email */}
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex-1 min-w-0'>
            <FormSelectInput label='Gender' options={Object.entries(enum_gender).map(([key, value]) => ({
              value: value,
              label: key.charAt(0).toUpperCase() + key.slice(1),
            }))}
              register={register('gender')}
              error={errors.gender as any}
              isDisabled={false}
              required={false}
            />
          </div>
          <div className='flex-1 min-w-0'>
            <FormTextField type='email' label='Email' register={register('email')} error={errors.email as
              any} isDisabled={false} required={false} />
          </div>
        </div>
        {/* row 3: candidate stage and active status */}
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex-1 min-w-0'>
            <FormSelectInput label='Candidate Stage' options={Object.entries(enum_prob_status).map(([key,
              value]) => ({
                value: value,
                label: key.charAt(0).toUpperCase() + key.slice(1),
              }))}
              register={register('prob_status')}
              error={errors.prob_status as any}
              isDisabled={false}
              required={false}
              placeholder='--- Please Select ---'
            />
          </div>
          <div className='flex-1 min-w-0'>
            <FormSelectInput label='Active Status' options={[{ value: 'true', label: 'True' }, {
              value: 'false', label: 'False'
            },]} register={register('is_active')} error={errors.is_active} isDisabled={false} required={false} placeholder='--- Please Select ---' />
          </div>
        </div>
        {/* row 4: created at and updated at */}
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex-1 min-w-0'>
            <FormTextField type='text' label='Created at' register={register('created_at')}
              error={errors.created_at} isDisabled={true} required={false} />
          </div>
          <div className='flex-1 min-w-0'>
            <FormTextField type='text' label='Updated at' register={register('updated_at')}
              error={errors.updated_at} isDisabled={true} required={false} />
          </div>
        </div>
        {/* button box */}
        <div className='flex justify-end gap-4 mt-4'>
          <ButtonCandidateDetailsReset reset={reset} />
          <ButtonCandidateDetailsSubmit />
        </div>
      </div>
    </form>
  );
}


// remarks: Input form for the section - candidate education

export function FormCandidateEducation({
  targetCandidateEdu
}: {
  targetCandidateEdu: ICandidateEdu | null;
}): JSX.Element {
  //  remarks: get react hook form methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    defaultValues: targetCandidateEdu || {},
    resolver: yupResolver(UpdateCandidateEduSchema),
  });
  //  remarks: get current profile id from params
  const { id } = useParams();
  //  remarks: hooks for data refresh
  useEffect(() => {
    if (targetCandidateEdu) {
      reset({
        ...targetCandidateEdu,
        is_verified: String(targetCandidateEdu.is_verified),
        is_active: String(targetCandidateEdu.is_active)
      });
    } else {
      reset({});
    }
  }, [targetCandidateEdu, reset]);
  //  remarks: display
  return (
  <form className='mt-4 pb-4 border-b border-gray-400' onSubmit={handleSubmit((data) =>
    handle_create_candidate_edu_submit(id as string, data),
  )}>

    <div className='mb-4 py-1'>
      <h3 className='font-bold text-lg'>Create New Qualification</h3>
      <p className='text-gray-500 text-md'>Add new record to your educational history.</p>
    </div>

    {/*  row 1:  degree + major  */}
    <div className='flex flex-col gap-2 md:flex-row'>
      <div className='flex-1 min-w-0'>
        <FormSelectInput label='Degree' options={
          Object.entries(enum_cert_degree).map(([key, value]) => ({
            value: key,
            label: value
          }))
        } register={register('cert_degree')} error={errors.cert_degree} isDisabled={false} required={false} placeholder='--- Please Select ---' />
      </div>
      <div className='flex-1 min-w-0'>
        <FormSelectInput label='Major' options={
          Object.entries(enum_cert_major).map(([key, value]) => ({
            value: key,
            label: value
          }))
        } register={register('cert_major')} error={errors.cert_major} isDisabled={false} required={false} placeholder='--- Please Select ---' />
      </div>
    </div>

    {/*  row 2:  institute + year_issued  */}
    <div className='flex flex-col gap-2 md:flex-row'>
      <div className='flex-1 min-w-0'>
        <FormSelectInput label='Institute' options={
          Object.entries(enum_cert_institute).map(([key, value]) => ({
            value: key,
            label: value
          }))
        } register={register('cert_institute')} error={errors.cert_institute} isDisabled={false} required={false} placeholder='--- Please Select ---' />

      </div>
      <div className='flex-1 min-w-0'>
        <FormTextField type='number' label='Year awarded' placeholder='Insert numbers...'
          register={register('year_issued')} error={errors.year_issued} isDisabled={false}
          required={false} />
      </div>
    </div>


    {/*  row 4:  is_verified + is_active  */}
    <div className='flex flex-col gap-2 md:flex-row'>
      <div className='flex-1 min-w-0'>
        <FormSelectInput label='Verified Status' options={[{ value: 'true', label: 'True' }, {
          value: 'false', label: 'False'
        },]} register={register('is_verified')} error={errors.is_verified} isDisabled={false} required={false} placeholder='--- Please Select ---' />
      </div>
      <div className='flex-1 min-w-0'>
        <FormSelectInput label='Active Status' options={[{ value: 'true', label: 'True' }, {
          value: 'false', label: 'False'
        },]} register={register('is_active')} error={errors.is_active} isDisabled={false} required={false} placeholder='--- Please Select ---' />
      </div>
    </div>
    
    {/* button box */}
    <div className='flex justify-end gap-4 mt-4'>
      <ButtonCandidateEduReset reset={() => reset(targetCandidateEdu ? {
        ...targetCandidateEdu,
        is_verified: String(targetCandidateEdu.is_verified),
        is_active: String(targetCandidateEdu.is_active)
      } : {
        cert_degree: '',
        cert_institute: '',
        cert_major: '',
        year_issued: '',
        is_verified: '',
        is_active: ''
      })} />
      <ButtonCandidateEduSubmit />
    </div>
  </form>
  );

}