import { NavLink } from "react-router";
import Icon from "./Icon";

function LeftNav() {
  return (
    <nav className="group/nav fixed bg-gray-800 left-0 w-fit p-5 text-gray-50 h-dvh">
      <ul>
        <li>
          <NavLink to="/">
            <Icon iconName="mainLogo" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-amber-300" : "")}
          >
            <Icon iconName="home" name="Home" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-amber-300" : "")}
          >
            <Icon iconName="about" name="About" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? "text-amber-300" : "")}
          >
            <Icon iconName="user" name="Profile" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default LeftNav;
