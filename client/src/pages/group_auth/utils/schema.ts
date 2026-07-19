import * as yup from 'yup';
import { AUTH_TYPES } from './types';

//  remarks: form login
const login_form_schema: yup.ObjectSchema<AUTH_TYPES['login']> = yup.object({
  input: yup.string().required('Username is required.'),
  _password: yup
    .string()
    .required('Password is required.')
    .matches(/^[a-zA-Z0-9-]+$/, 'Password can only contain letters, numbers and hyphens.'),
});

//  remarks: forget password (sending out reset url)
const reset_opt_out_schema: yup.ObjectSchema<AUTH_TYPES['reset_pw_opt_out']> = yup.object({
  input: yup.string().required('Username is required.'),
});

//  remarks: reset password (via reset url)
const reset_opt_in_schema: yup.ObjectSchema<AUTH_TYPES['reset_pw_opt_in']> = yup.object({
  _password: yup
    .string()
    .required('Password is required.')
    .matches(/^[a-zA-Z0-9-]+$/, 'Password can only contain letters, numbers and hyphens.'),
  _password_confirm: yup
    .string()
    .required('Password confirmation is required.')
    .oneOf([yup.ref('_password')], 'Passwords not matched.'),
});

//  remarks: collection export
export const AUTH_SCHEMA = {
  login: login_form_schema,
  reset_pw_opt_out: reset_opt_out_schema,
  reset_pw_opt_in: reset_opt_in_schema,
};
