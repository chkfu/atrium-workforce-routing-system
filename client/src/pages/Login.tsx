import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonConfirm from '../elements/ButtonConfirm';

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //  TODO: Manage Login
  const handleLogin = () => {
    console.log('Login:', { username, password });
    navigate('#');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form className='bg-white px-12 py-32 rounded-lg shadow-lg w-full max-w-md'>
        {/* Login Title */}
        <h1 className='text-2xl font-bold text-teal-800 mb-12 text-center'>
          Login
        </h1>

        {/* Username Input */}
        <div className='mb-6'>
          <label
            htmlFor='username'
            className='block text-sm font-semibold text-gray-800 mb-2'
          >
            Username
          </label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600'
            placeholder='Enter your username'
          />
        </div>

        {/* Password Input */}
        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block text-sm font-semibold text-gray-800 mb-2'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600'
            placeholder='Enter your password'
          />
        </div>

        {/* Forgot Password Link */}
        <div className='mb-16'>
          <a
            href='#'
            className='text-sm text-teal-600 hover:text-teal-800 font-semibold underline'
          >
            Forgot your password?
          </a>
        </div>

        {/* Login Button */}
        <div className='flex justify-end'>
          <ButtonConfirm
            label='Login'
            onClick={handleLogin}
          />
        </div>
      </form>
    </div>
  );
}
