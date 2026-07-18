//  remarks: specific structure

//  remarks: form login
const login_structure = (
  setUsername: (value: string) => void,
  setPassword: (value: string) => void
): {
  name: 'username' | '_password';
  label: string;
  placeholder: string;
  type: 'text' | 'password';
  customisedOnChange: (el: React.ChangeEvent<HTMLInputElement>) => void;
}[] => [
  {
    name: 'username',
    label: 'Username',
    placeholder: 'Insert your username...',
    type: 'text',
    customisedOnChange: (el) => setUsername(el.target.value),
  },
  {
    name: '_password',
    label: 'Password',
    placeholder: 'Insert your password...',
    type: 'password',
    customisedOnChange: (el) => setPassword(el.target.value),
  },
];


//  remarks: structure collection with export 

export const AUTH_STRUCTURE = {
  login: login_structure
}
