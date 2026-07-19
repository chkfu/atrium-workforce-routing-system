//  remarks: specific structure

//  remarks: form login
const login_structure = [
  {
    name: 'username',
    label: 'Username',
    placeholder: 'Insert your username...',
    type: 'text',
  },
  {
    name: '_password',
    label: 'Password',
    placeholder: 'Insert your password...',
    type: 'password',
  },
] as const;

//  remarks: forget password
const reset_pw_opt_out_structure = [
  {
    name: 'input',
    label: 'User Identifier',
    placeholder: 'Insert your username or email address...',
    type: 'text',
  },
] as const;

//  remarks: reset password
const reset_pw_opt_in_structure = [
  {
    name: '_password',
    label: 'New Password',
    placeholder: 'Insert your password...',
    type: 'password',
  },
  {
    name: '_password_confirm',
    label: 'Confirm Password',
    placeholder: 'Confirm your password...',
    type: 'password',
  },
] as const;

//  remarks: structure collection with export
export const AUTH_STRUCTURE = {
  login: login_structure,
  reset_pw_opt_out: reset_pw_opt_out_structure,
  reset_pw_opt_in: reset_pw_opt_in_structure,
};
