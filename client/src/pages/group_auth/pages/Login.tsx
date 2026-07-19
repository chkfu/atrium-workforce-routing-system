import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonConfirm from '../../../elements/ButtonConfirm';
import FormTextField from '../../../elements/FormTextField';
import { useForm } from 'react-hook-form';
import { handle_login } from '../utils/handlers';
import { AUTH_TYPES } from '../utils/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { AUTH_SCHEMA } from '../utils/schema';
import { AUTH_STRUCTURE } from '../utils/structure';
import { COLORS } from '../../../styles/color';
import { HREF } from '../../../config/href';


export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //  handler
  const submit_handler = (async (data: AUTH_TYPES['login']) => {
    await handle_login(data, navigate, setIsLoading)
  });

  //  reamrks: init react hook form
  const { register, handleSubmit, formState: { errors } } = useForm<AUTH_TYPES['login']>({
    resolver: yupResolver(AUTH_SCHEMA.login),
  })

  //  remarks: display
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit(submit_handler)} className="relative bg-white px-12 py-24 rounded-lg shadow-lg w-full max-w-md">
        
                {/*  Back Button  */}
        <a href={HREF.HOME} className='absolute top-12 left-12 text-sm text-teal-600 underline bold'> Back</a>
        
        {/* Login Title */}
        <h1 className="text-2xl font-bold text-teal-800 text-center">Login</h1>
        {/* Login Fields */}
        {AUTH_STRUCTURE['login'](setUsername, setPassword).map((el) => (
          <FormTextField
            key={el.label}
            label={el.label}
            placeholder={el.placeholder}
            type={el.type}
            register={register(el.name, { onChange: el.customisedOnChange })}
            error={errors[el.name]}
          />
        ))}

        {/* Forgot Password Link */}
        <div>
          <a href={HREF.FORGET_PASSWORD} className="text-sm text-teal-600 hover:text-teal-800 font-semibold underline">
            Forgot your password?
          </a>
        </div>

        {/* Login Button */}
        <div className="flex justify-end mt-8">
          <ButtonConfirm 
          type='submit' 
          label={isLoading ? 'Loading' : 'Login'}
          style={{
            background: isLoading ? COLORS.gray : COLORS.dark_teal,
            color: isLoading ? COLORS.dark_gray : 'white',
          }}
          disabled={isLoading} />
        </div>
      </form>
    </div>
  );
}
