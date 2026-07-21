import logo_atrium from '../../assets/svg/atrium-logo.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginButton, LogoutButton, NavItem } from './items';
import { TNavItem } from '../utils/types';
import { RootState } from '../../redux/store';

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
  //  remarks: validate user login status
  const has_login: boolean = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user_fname: string = useSelector(
    (state: RootState) => state.auth.user?.first_name
  ) as string;

  return (
    <div className="flex absolute right-8 top-8 gap-2">
      {has_login ? (
        <div className="flex gap-4 items-center">
          <h4 className="text-md font-bold text-gray-300">
            Hi, {user_fname[0].toUpperCase() + user_fname.slice(1).toLowerCase()}
          </h4>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
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
