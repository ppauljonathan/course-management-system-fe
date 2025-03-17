import { HomeIcon, UserIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router";

import AppLogo from "../../assets/logo.svg";
import NavItem from "./NavItem";
import isAuthenticated from "../../utils/isAuthenticated";

function LeftNav() {
  return (
    <nav className="group/nav bg-gray-800 left-0 w-fit p-5 text-gray-50 h-dvh">
      <ul>
        <li>
          <NavLink to="/">
            <div className="p-5">
              <div className="flex">
                <img src={AppLogo} alt="Courses" className="size-6" />
                <p className="ml-5 hidden group-hover/nav:block font-extrabold">
                  CMSystem
                </p>
              </div>
            </div>
          </NavLink>
        </li>
        <NavItem
          name="Home"
          icon={<HomeIcon className="size-6" />}
          linkTo="/"
        />
        {isAuthenticated() && (
          <NavItem
            name="About"
            icon={<InformationCircleIcon className="size-6" />}
            linkTo="/about"
          />
        )}
        {!isAuthenticated() && (
          <NavItem
            name="Login"
            icon={<UserIcon className="size-6" />}
            linkTo="/login"
          />
        )}
      </ul>
    </nav>
  );
}

export default LeftNav;
