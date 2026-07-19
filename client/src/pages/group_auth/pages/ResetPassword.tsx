import React from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AUTH_TYPES } from '../utils/types';
import { AUTH_SCHEMA } from '../utils/schema';

export default function ResetPassword() {
  //
  const navigate = useNavigate();

  //  reamrks: init react hook fo rm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AUTH_TYPES['reset_pw_opt_in']>({
    resolver: yupResolver(AUTH_SCHEMA.reset_pw_opt_in),
  });

  //  remarks: handle submission
  const submit_handler = async () => {
    return;
  };

  //  remarks: display
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(submit_handler)}
        className="relative bg-white px-12 py-24 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1>reset password</h1>
      </form>
    </div>
  );
}
