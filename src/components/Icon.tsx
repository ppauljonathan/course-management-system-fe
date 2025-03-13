import { ReactNode } from "react";
import IconSvg from "../util/IconSvg";

interface IconProps {
  children?: ReactNode,
  iconName?: keyof typeof IconSvg,
  name?: string
}

function Icon({ iconName = 'home', children, name}:IconProps) {
  return (
    <div className="p-5 hover:text-amber-300">
      <div className="w-fit flex">
        {children || IconSvg[iconName]}
        <p className="ml-2 hidden group-hover/nav:block">{name}</p>
      </div>
    </div>
  )
}

export default Icon;
