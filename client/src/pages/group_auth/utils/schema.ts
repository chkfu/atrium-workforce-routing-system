import * as yup from 'yup';
import { AUTH_TYPES } from './types';

//  remarks: form login

export const login_form_schema: yup.ObjectSchema<AUTH_TYPES['login']> = yup.object({
  username: yup.string().required('Username is required'),
  _password: yup.string().required('Password is required'),
});
