import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCandidateContext } from '../utils/context';
import { ButtonUpdateCancel, ButtonUpdateSubmit } from './buttons';
import FormTextField from '../../../elements/FormTextField';
import FormSelectInput from '../../../elements/FormSelectInput';
import { UpdateCandidateSchema } from '../utils/schema';
import { handle_update_submit } from '../utils/handlers';

//  remarks: react state management with use-context
export default function FormUpdateState() {
  const {
    selectedCandidates,
    setCandidates,
    setSelectedCandidates,
    setIsUpdating,
    setTriggerUpdate,
  } = useCandidateContext();

  //  remarks: calling built-in methods from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UpdateCandidateSchema),
  });

  //  remarks: calling handlers, as parameters required
  function recall_submission(data: any) {
    handle_update_submit(
      data,
      selectedCandidates,
      setIsUpdating,
      setCandidates,
      setSelectedCandidates,
      setTriggerUpdate,
      UpdateCandidateSchema,
    );
  }
  return (
    <form>
      {/*  section: field inputs  */}
      <FormTextField
        label='First Name'
        register={register('firstName')}
        error={errors.firstName}
      />
      <FormTextField
        label='Last Name'
        register={register('lastName')}
        error={errors.lastName}
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
        <ButtonUpdateSubmit onClick={handleSubmit(recall_submission)} />
      </div>
    </form>
  );
}
