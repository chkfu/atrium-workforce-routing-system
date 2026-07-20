import { Link } from 'react-router-dom';
import logo_login from '../../assets/svg/user-icon.svg';
import { handle_logout } from '../utils/handlers';
import { TNavItem } from '../utils/types';

//  remarks: entry point for login
export const LoginButton = () => {
  return (
    <Link to="/login">
      <button 
        type='button'
        className="transform px-4 h-8 rounded-3xl bg-slate-300 flex items-center justify-left cursor-pointer hover:bg-slate-100 hover:text-teal-800 transition duration-500 active:scale-95">
        <img src={logo_login} alt="User" width="24" height="24" className="text-teal-800" />
        <span className="px-2 text-sm text-teal-800">Login</span>
      </button>
    </Link>
  );
};

//  remarks: entry point for nav item
export const NavItem = ({ item }: { item: TNavItem }) => {
  return (
    <Link to={item.href}>
      <li
        key={item.label}
        className="flex items-center px-8 py-2 text-l text-slate-300 font-serif font-bold cursor-pointer border-b-6 border-transparent hover:border-teal-600 transition duration-900"
      >
        <div className="inline-block hover:brightness-200 hover:text-white transition duration-900 active:scale-90">
          {item.label}
        </div>
      </li>
    </Link>
  );
};

//  remarks: entry point for login
export const LogoutButton = () => {
  return (
    <Link to="/">
    <button 
      type='button'
      className="transform px-4 h-8 rounded-3xl bg-slate-300 flex items-center justify-left cursor-pointer hover:bg-slate-100 hover:text-teal-800 transition duration-500 active:scale-95"
      onClick={handle_logout}>
      <img src={logo_login} alt="User" width="24" height="24" className="text-teal-800" />
      <span className="px-2 text-sm text-teal-800">Logout</span>
    </button>
    </Link>
  );
};