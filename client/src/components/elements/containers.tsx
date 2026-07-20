import logo_atrium from '../../assets/svg/atrium-logo.svg';
import { Link } from 'react-router-dom';
import { LoginButton, LogoutButton, NavItem } from './items';
import { TNavItem } from '../utils/types';

//  remarks: logo container
export const SectionLogo = function () {
  return (
    <Link to="/">
      <div className="flex items-center justify-center">
        {/* Static - Large Logo Banner */}
        <div className="flex active:scale-98 justify-center items-center p-4 cursor-pointer">
          <img src={logo_atrium} alt="Atrium" width="48" height="48" />
          <h1 className="text-2xl font-bold text-slate-200 font-serif px-2 hover:text-white transition duration-900">
            Atrium
          </h1>
        </div>
      </div>
    </Link>
  );
};

//  remarks: login container
export const SectionLogin = function () {
  return (
    <div className="flex absolute right-8 top-8 gap-2">
      <LoginButton />
      <LogoutButton />
    </div>
  );
};

//  remarks: navigation container
export const SectionNavItem = function ({ nav_items }: { nav_items: TNavItem[] }) {
  return (
    <div className="flex items-center justify-center">
      <ul className="flex justify-center">
        {nav_items.map((item: TNavItem) => (
          <NavItem key={item.label} item={item} />
        ))}
      </ul>
    </div>
  );
};
