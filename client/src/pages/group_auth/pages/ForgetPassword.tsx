import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AUTH_TYPES } from '../utils/types';
import { AUTH_SCHEMA } from '../utils/schema';
import { HREF } from '../../../config/href';
import { useState } from 'react';
import FormTextField from '../../../elements/FormTextField';
import { handle_reset_opt_out } from '../utils/handlers';
import { useNavigate } from 'react-router-dom';
import { AUTH_STRUCTURE } from '../utils/structure';
import { ResetTokenEmailButton } from '../elements/buttons';
import { AuthSectHeading } from '../../../elements/AuthSectHeading';
import NavigateAnchor from '../../../elements/NavigateAnchor';

export default function ForgetPassword() {
  //  reamrks: init react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AUTH_TYPES['reset_pw_opt_out']>({
    resolver: yupResolver(AUTH_SCHEMA.reset_pw_opt_out),
  });

  //  remarks: navigation
  const navigate = useNavigate();

  //  remarks: state management
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //  remarks: handle submission
  const submit_handler = async (data: AUTH_TYPES['reset_pw_opt_out']) => {
    await handle_reset_opt_out(data, navigate, setIsLoading);
  };

  //  remarks display
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(submit_handler)}
        className="relative bg-white px-12 py-24 rounded-lg shadow-lg w-full max-w-md"
      >
        {/*  section: back button  */}
        <NavigateAnchor url={HREF.LOGIN} text="Back" />

        {/*  section: heading  */}
        <AuthSectHeading
          title="Reset Password"
          description="We will email you with a link to reset your password."
        />

        {/*  section: form filling  */}
        {AUTH_STRUCTURE['reset_pw_opt_out'].map((el) => (
          <FormTextField
            key={el.label}
            label={el.label}
            placeholder={el.placeholder}
            type={el.type}
            register={register(el.name)}
            error={errors[el.name]}
          />
        ))}

        {/*  section: button trigger  */}
        <ResetTokenEmailButton isLoading={isLoading} />
      </form>
    </div>
  );
}
