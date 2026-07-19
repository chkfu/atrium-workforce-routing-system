import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AUTH_TYPES } from '../utils/types';
import { AUTH_SCHEMA } from '../utils/schema';
import { AUTH_STRUCTURE } from '../utils/structure';
import FormTextField from '../../../elements/FormTextField';
import { HREF } from '../../../config/href';
import { handle_reset_opt_in } from '../utils/handlers';
import { ResetChangeSubmitButton } from '../elements/buttons';
import { AuthSectHeading } from '../../../elements/AuthSectHeading';
import NavigateAnchor from '../../../elements/NavigateAnchor';

export default function ResetPassword() {
  //
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  //  reamrks: init react hook fo rm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AUTH_TYPES['reset_pw_opt_in']>({
    resolver: yupResolver(AUTH_SCHEMA.reset_pw_opt_in),
  });

  //  remarks: state managerment
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //  remarks: handle submission
  const submit_handler = async (data: AUTH_TYPES['reset_pw_opt_in']) => {
    if (!token) {
      alert('[ResetPassword] error: reset token is missing from the URL.');
      return;
    }
    await handle_reset_opt_in(data, token, navigate, setIsLoading);
  };

  //  remarks: display
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(submit_handler)}
        className="relative bg-white px-12 py-24 rounded-lg shadow-lg w-full max-w-md"
      >
        {/*  Back Button  */}
        <NavigateAnchor url={HREF.HOME} text="Back" />

        {/*  Heading  */}
        <AuthSectHeading title="Reset Password" description="Please provide your new passwords." />

        {/* Login Fields */}
        {AUTH_STRUCTURE['reset_pw_opt_in'].map((el) => (
          <FormTextField
            key={el.label}
            label={el.label}
            placeholder={el.placeholder}
            type={el.type}
            register={register(el.name)}
            error={errors[el.name]}
          />
        ))}

        {/*  Action Button  */}
        <ResetChangeSubmitButton isLoading={isLoading} />
      </form>
    </div>
  );
}
