import { yupResolver } from '@hookform/resolvers/yup';
import ButtonConfirm from '../../../elements/ButtonConfirm';
import { useForm } from 'react-hook-form';
import { AUTH_TYPES } from '../utils/types';
import { AUTH_SCHEMA } from '../utils/schema';
import { HREF } from '../../../config/href';
import { useState } from 'react';
import { COLORS } from '../../../styles/color';
import FormTextField from '../../../elements/FormTextField';
import { handle_reset_opt_out } from '../utils/handlers'
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  //  reamrks: init react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AUTH_TYPES['reset_pw_opt_out']>({
    resolver: yupResolver(AUTH_SCHEMA.reset_pw_opt_out),
  });
  const navigate = useNavigate();

  //  remarks: state management
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //  remarks: handle submission
  const submit_handler = async (data: AUTH_TYPES['reset_pw_opt_out']) => {
    await handle_reset_opt_out(data, navigate, setIsLoading)
  };

  //  remarks display
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(submit_handler)}
        className="relative bg-white px-12 py-24 rounded-lg shadow-lg w-full max-w-md"
      >
        {/*  Back Button  */}
        <a
          href={HREF.LOGIN}
          className="absolute top-12 left-12 text-sm text-teal-600 underline bold"
        >
          {' '}
          Back
        </a>

        {/*  Login Title  */}
        <h1 className="text-2xl font-bold text-teal-800 mb-12 text-center">Reset Password</h1>

        {/* Username Detection Fields */}
        <FormTextField
          label="Username or Email"
          placeholder="Username or email..."
          type="text"
          register={register('input')}
          error={errors.input}
          required
        />

        {/*  Login Button  */}
        <div className="flex justify-end mt-8">
          <ButtonConfirm
            label={isLoading ? 'Loading...' : "Send Verification"}
            type="submit"
            style={{
              background: isLoading ? COLORS.gray : COLORS.dark_teal,
              color: isLoading ? COLORS.dark_gray : 'white',
            }}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
}
