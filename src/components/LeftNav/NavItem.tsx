import { NavLink } from "react-router";
import { ReactNode } from "react";

interface NavItemProps {
  name: string
  icon: ReactNode
  linkTo: string
}

function NavItem({ name, icon, linkTo }: NavItemProps) {
  return (
    <li>
      <NavLink
        to={linkTo}
        className={({ isActive }) => (isActive ? "text-amber-300" : "")}
        >
        <div className="p-5 hover:text-amber-300">
          <div className="flex">
            {icon}
            <p className="ml-5 hidden group-hover/nav:block">{name}</p>
          </div>
        </div>
      </NavLink>
    </li>
  )
}

export default NavItem
