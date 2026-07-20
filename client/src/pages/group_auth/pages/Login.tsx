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
import { LoginSubmitButton } from '../elements/buttons';
import { AuthSectHeading } from '../../../elements/AuthSectHeading';
import NavAnchorBack from '../../../elements/NavAnchorBack';

export default function Login(): JSX.Element {

  //  remarks: navigation
  const navigate = useNavigate();

  //  remarks: state management
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //  remarks: handle submission
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
        {/*  section: back anchor  */}
        <NavAnchorBack url={HREF.HOME} />

        {/*  section: heading  */}
        <AuthSectHeading title="Login" />

        {/*  section: form filling  */}
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

        {/*  section: anchor to forget password  */}
        <a
          href={HREF.FORGET_PASSWORD}
          className="block text-left bold text-sm text-teal-600 underline bold hover:brightness-110 mb-4"
        >
          Forgot your password?
        </a>

        {/*  section: button trigger  */}
        <LoginSubmitButton isLoading={isLoading} />
      </form>
    </div>
  );
}
