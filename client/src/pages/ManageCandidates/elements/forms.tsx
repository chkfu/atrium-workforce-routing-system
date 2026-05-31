import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonUpdateCancel,
  ButtonUpdateSubmit,
  ButtonCreateCancel,
  ButtonCreateSubmit,
} from './buttons';
import FormTextField from '../../../elements/FormTextField';
import FormSelectInput from '../../../elements/FormSelectInput';
import { CreateCandidateSchema, UpdateCandidateSchema } from '../utils/schema';
import { handle_create_submit, handle_update_submit } from '../utils/handlers';

//  CREATE

export function FormCreate() {
  //  declaration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateCandidateSchema),
  });
  function recalling(data: any) {
    handle_create_submit(data);
  }
  //  display
  return (
    <form onSubmit={handleSubmit(recalling)}>
      {/*  section: field inputs  */}
      <FormTextField
        label='First Name'
        register={register('first_name')}
        error={errors.first_name}
        required={true}
      />
      <FormTextField
        label='Last Name'
        register={register('last_name')}
        error={errors.last_name}
        required={true}
      />
      <FormTextField
        label='Email'
        type='email'
        register={register('email')}
        error={errors.email}
        required={true}
      />
      <FormSelectInput
        label='Gender'
        register={register('gender')}
        error={errors.gender}
        required={true}
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
      />
      <FormSelectInput
        label='Probation Status'
        register={register('prob_status')}
        error={errors.prob_status}
        required={true}
        options={[
          { value: 'selecting', label: 'Selecting' },
          { value: 'training', label: 'Training' },
          { value: 'completed', label: 'Completed' },
          { value: 'postponed', label: 'Postponed' },
          { value: 'withdrawn', label: 'Withdrawn' },
          { value: 'failed', label: 'Failed' },
        ]}
        className='mb-6'
      />

      {/*  section: buttons  */}
      <div className='flex gap-4 justify-end mt-6'>
        <ButtonCreateCancel />
        <ButtonCreateSubmit />
      </div>
    </form>
  );
}

//  UPDATE

export function FormUpdate() {
  //  declaration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UpdateCandidateSchema),
  });
  function recalling(data: any) {
    handle_update_submit(data);
  }
  //  display
  return (
    <form onSubmit={handleSubmit(recalling)}>
      {/*  section: field inputs  */}
      <FormTextField
        label='First Name'
        register={register('first_name')}
        error={errors.first_name}
      />
      <FormTextField
        label='Last Name'
        register={register('last_name')}
        error={errors.last_name}
      />
      <FormTextField
        label='Email'
        type='email'
        register={register('email')}
        error={errors.email}
      />
      <FormSelectInput
        label='Gender'
        register={register('gender')}
        error={errors.gender}
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
      />
      <FormSelectInput
        label='Probation Status'
        register={register('prob_status')}
        error={errors.prob_status}
        options={[
          { value: 'selecting', label: 'Selecting' },
          { value: 'training', label: 'Training' },
          { value: 'completed', label: 'Completed' },
          { value: 'postponed', label: 'Postponed' },
          { value: 'withdrawn', label: 'Withdrawn' },
          { value: 'failed', label: 'Failed' },
        ]}
        className='mb-6'
      />

      {/*  section: buttons  */}
      <div className='flex gap-4 justify-end mt-6'>
        <ButtonUpdateCancel />
        <ButtonUpdateSubmit onClick={handleSubmit(recalling)} />
      </div>
    </form>
  );
}
