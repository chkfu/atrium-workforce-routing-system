import { SectionLogo, SectionLogin, SectionNavItem } from './elements/containers';
import { TNavItem } from './utils/types';
import { handle_logout } from './utils/handlers';
import menu_icon from '../assets/svg/menu_icon.svg';
import close_icon from '../assets/svg/close_icon.svg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { HREF } from '../config/href';
import { ROLE_DASHBOARD } from '../pages/group_auth/utils/constants';

export default function Header() {
  const list_nav_items: TNavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-100 bg-teal-800 p-0 h-auto">
      <ExpandedHeader list_nav_items={list_nav_items} />
      <ShrinkedHeader />
    </header>
  );
}

//  Components

function ExpandedHeader({ list_nav_items = [] }: { list_nav_items: TNavItem[] }): JSX.Element {
  return (
    <nav className="hidden lg:block transform-all duration-75 border-gray-200 shadow-sm w-full pt-2 relative h-auto">
      <SectionLogin />
      <SectionLogo />
      <SectionNavItem nav_items={list_nav_items} />
    </nav>
  );
}

function ShrinkedHeader(): JSX.Element {
  const [expandList, setExpandList] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const has_login: boolean = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user_role: string = useSelector((state: RootState) => state.auth.user?.user_role) as string;
  const menu = {
    navigate: {
      home: { name: 'Home', url: '/' },
      about: { name: 'About', url: '/about' },
      contact: { name: 'Contact', url: '/contact' },
    },
  };
  return (
    <nav className="block bg-teal-800 lg:hidden transform-all duration-75 border-gray-200 shadow-sm w-full h-auto pt-2 relative">
      {/*  section: menu control  */}
      <button
        className="flex active:scale-98 justify-self-start items-center p-8 cursor-pointer"
        type="button"
        onClick={() => setExpandList((prev) => !prev)}
      >
        <img 
        src={ expandList ? close_icon : menu_icon } 
        alt="Atrium" width="24" height="24"
        className={expandList ? 'brightness-0 invert' : ''} />
      </button>
      {/*  section: menu list  */}
      <div
        className={`absolute bg-teal-800 md:mt-1 p-4 md:rounded-md shadow-lg md:w-56 w-full h-screen md:h-auto duration-300 overflow-y-auto ${expandList ? 'block' : 'hidden'}`}
      >
        {/*  section a: navigate section  */}
        <div className='py-2'>
          <h4 className="flex md:justify-start justify-center uppercase md:py-4 py-8 px-4 md:text-md text-lg font-bold text-gray-100">
            Navigate
          </h4>
          <ul>
            {Object.values(menu.navigate).map((item) => (
              <Link key={item.name} to={item.url}>
                <li className="flex px-8 md:py-2 py-4 md:text-md md:justify-start justify-center text-lg text-gray-300 hover:bg-teal-700 rounded cursor-pointer duration-300" onClick={()=> setExpandList(false)}>
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {/*   section b: user section  */}
        <div className='py-2'>
          <h4 className="flex md:justify-start justify-center uppercase md:py-4 py-8 px-4 md:text-md text-lg font-bold text-gray-100">
            User
          </h4>
          <ul>
            {has_login ? (
              <>
                <Link to={ROLE_DASHBOARD[user_role] ?? HREF.HOME}>
                  <li className="flex md:justify-start justify-center px-8 md:py-2 py-4 md:text-md text-lg text-gray-300 hover:bg-teal-700 rounded cursor-pointer duration-300" onClick={() => setExpandList(false)}>
                    Dashboard
                  </li>
                </Link>
                <li
                  className="flex md:justify-start justify-center px-8 md:py-2 py-4 md:text-md text-lg text-gray-300 hover:bg-teal-700 rounded cursor-pointer duration-300"
                  onClick={() => {
                    handle_logout(dispatch, navigate);
                    setExpandList(false);
                  }}
                >
                  Logout
                </li>
              </>
            ) : (
              <Link to={HREF.LOGIN}>
                <li className="flex md:justify-start justify-center px-8 py-2 md:text-md text-lg text-gray-300 hover:bg-teal-700 rounded cursor-pointer duration-300" onClick={() => setExpandList(false)}>
                  Login
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
