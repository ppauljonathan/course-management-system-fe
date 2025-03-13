import { HomeIcon, UserIcon } from '@heroicons/react/24/solid'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { NavLink } from "react-router";

import AppLogo from '../../assets/logo.svg'
import NavItem from './NavItem';


const navList = [
  { name: "Home", icon: <HomeIcon className="size-6" />, linkTo: '/' },
  { name: "About", icon: <InformationCircleIcon className="size-6" />, linkTo: '/about' },
  { name: "Signup", icon: <UserIcon className="size-6" />, linkTo: '/signup' },
];

function LeftNav() {
  return (
    <nav className="group/nav bg-gray-800 left-0 w-fit p-5 text-gray-50 h-dvh">
      <ul>
        <li>
          <NavLink to="/">
            <div className="p-5">
              <div className="flex">
                <img src={AppLogo} alt="Courses"  className="size-6"/>
                <p className="ml-5 hidden group-hover/nav:block font-extrabold">CMSystem</p>
              </div>
            </div>
          </NavLink>
        </li>
        { navList.map((item, index) => <NavItem key={index} {...item}/>) }
      </ul>
    </nav>
  );
}

export default LeftNav;
