import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTextField from '../../../elements/FormTextField';
import { useForm } from 'react-hook-form';
import { handle_login } from '../utils/handlers';
import { AUTH_TYPES } from '../utils/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { AUTH_SCHEMA } from '../utils/schema';
import { AUTH_STRUCTURE } from '../utils/structure';
import { HREF } from '../../../config/href';
import nav_left_icon from '../../../assets/svg/nav_left_icon.svg';
import { LoginSubmitButton } from '../elements/buttons';
import { AuthSectHeading } from '../../../elements/AuthSectHeading';
import NavigateAnchor from '../../../elements/NavigateAnchor';

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //  handler
  const submit_handler = async (data: AUTH_TYPES['login']) => {
    await handle_login(data, navigate, setIsLoading);
  };

  //  reamrks: init react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AUTH_TYPES['login']>({
    resolver: yupResolver(AUTH_SCHEMA.login),
  });

  //  remarks: display
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(submit_handler)}
        className="relative bg-white px-12 py-24 rounded-lg shadow-lg w-full max-w-md"
      >
        {/*  Back Button  */}
        <NavigateAnchor url={HREF.HOME} text="Back" />

        {/* Login Title */}
        <AuthSectHeading title="Login" />

        {/* Login Fields */}

        {AUTH_STRUCTURE['login'].map((el) => (
          <FormTextField
            key={el.label}
            label={el.label}
            placeholder={el.placeholder}
            type={el.type}
            register={register(el.name)}
            error={errors[el.name]}
          />
        ))}

        {/* Forgot Password Link */}
        <div>
          <a
            href={HREF.FORGET_PASSWORD}
            className="text-sm text-teal-600 hover:text-teal-800 font-semibold underline"
          >
            Forgot your password?
          </a>
        </div>

        {/* Login Button */}
        <LoginSubmitButton isLoading={isLoading} />
      </form>
    </div>
  );
}
