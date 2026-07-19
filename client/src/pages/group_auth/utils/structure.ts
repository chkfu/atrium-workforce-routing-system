//  remarks: specific structure

//  remarks: form login
const login_structure = (
  setUsername: (value: string) => void,
  setPassword: (value: string) => void
) => [
  {
    name: 'username',
    label: 'Username',
    placeholder: 'Insert your username...',
    type: 'text',
    customisedOnChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setUsername(event.target.value),
  },
  {
    name: '_password',
    label: 'Password',
    placeholder: 'Insert your password...',
    type: 'password',
    customisedOnChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(event.target.value),
  },
] as const;

//  remarks: forget password
const reset_pw_opt_out_structure = (
  setUsername: (value: string) => void,
) => [
  {
    name: 'username',
    label: 'Username',
    placeholder: 'Insert your username...',
    type: 'text',
    customisedOnChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setUsername(event.target.value),
  }
] as const;

//  remarks: structure collection with export

export const AUTH_STRUCTURE = {
  login: login_structure,
  forget_password: reset_pw_opt_out_structure
};
