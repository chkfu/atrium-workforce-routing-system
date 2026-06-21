import FormTextField from '../../../../elements/FormTextField';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import FormSelectInput from '../../../../elements/FormSelectInput';
import {
  enum_gender,
  enum_prob_status,
} from '../../../../utils/types/page_enums';
import { ICandidate } from '../../../../utils/types/redux_types';
import ButtonConfirm from '../../../../elements/ButtonConfirm';
import { handle_candidate_details_submit } from './utils/handlers';
import { useParams } from 'react-router-dom';
import { COLORS } from '../../../../styles/color';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateCandidateSchema } from '../../../group_manage_record/ManageCandidates/utils/schema';
import {
  ButtonCandidateDetailsReset,
  ButtonCandidateDetailsSubmit,
} from './utils/buttons';

//  ===========  Forms  ==========

//  remarks: Input form for the section - candidate details
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
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          },
        ),
        updated_at: new Date(targetCandidate.updated_at).toLocaleString(
          'en-GB',
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          },
        ),
      });
    }
  }, [targetCandidate, reset]);

  return (
    <form
      className='mt-4'
      onSubmit={handleSubmit((data) =>
        handle_candidate_details_submit(id as string, data),
      )}
    >
      <div>
        {/*  row 0: identifier  */}
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex-1 min-w-0'>
            <FormTextField
              type='text'
              label='Identifier'
              register={register('_id')}
              error={errors._id as any}
              isDisabled={true}
              required={false}
            />
          </div>
          <div className='flex-1 min-w-0' />
        </div>
        {/*  row 1: first name + last name  */}
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex-1 min-w-0'>
            <FormTextField
              type='text'
              label='First Name'
              placeholder='Insert keywords...'
              register={register('first_name')}
              error={errors.first_name as any}
              isDisabled={false}
              required={false}
            />
          </div>
          <div className='flex-1 min-w-0'>
            <FormTextField
              type='text'
              label='Last Name'
              placeholder='Insert keywords...'
              register={register('last_name')}
              error={errors.last_name as any}
              isDisabled={false}
              required={false}
            />
          </div>
        </div>
        {/*  row 2: gender + email  */}
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex-1 min-w-0'>
            <FormSelectInput
              label='Gender'
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
          <div className='flex-1 min-w-0'>
            <FormTextField
              type='email'
              label='Email'
              register={register('email')}
              error={errors.email as any}
              isDisabled={false}
              required={false}
            />
          </div>
        </div>
        {/*  row 3: candidate stage and active status  */}
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex-1 min-w-0'>
            <FormSelectInput
              label='Candidate Stage'
              options={Object.entries(enum_prob_status).map(([key, value]) => ({
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
            <FormSelectInput
              label='Active Status'
              options={[
                { value: 'true', label: 'True' },
                { value: 'false', label: 'False' },
              ]}
              register={register('is_active')}
              error={errors.is_active as any}
              isDisabled={false}
              required={false}
              placeholder='--- Please Select ---'
            />
          </div>
        </div>
        {/*  row 4: created at and updated at  */}
        <div className='flex flex-col gap-2 md:flex-row'>
          <div className='flex-1 min-w-0'>
            <FormTextField
              type='text'
              label='Created at'
              register={register('created_at')}
              error={errors.created_at as any}
              isDisabled={true}
              required={false}
            />
          </div>
          <div className='flex-1 min-w-0'>
            <FormTextField
              type='text'
              label='Updated at'
              register={register('updated_at')}
              error={errors.updated_at as any}
              isDisabled={true}
              required={false}
            />
          </div>
        </div>
        {/*  button box  */}
        <div className='flex justify-end gap-4 mt-4'>
          <ButtonCandidateDetailsReset reset={reset} />
          <ButtonCandidateDetailsSubmit />
        </div>
      </div>
    </form>
  );
}
