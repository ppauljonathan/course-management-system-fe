import { UserCircleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

import UserInterface from '../interfaces/graphql/users/userInterface.tsx'
import useToast from "../hooks/useToast";

interface TopBarProps {
  user: UserInterface
}

function TopBar({ user }: TopBarProps) {
  const userFullName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(" ");

  const navigate = useNavigate()
  const { showToast } = useToast();

  return (
    <>
      <div className="h-12 flex bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex ml-auto mr-2">
          <div className="self-center flex hover:bg-gray-300 p-3 cursor-pointer dark:hover:bg-gray-600">
            <UserCircleIcon className="size-8 self-center" />
            <p className="self-center ml-2">{userFullName}</p>
          </div>
          <div
            className="self-center flex hover:bg-gray-300 p-3 cursor-pointer dark:hover:bg-gray-600"
            onClick={
              () => {
                navigate('/logout')
                showToast("Logged out Successfully", 'success')
              }
            }
          >
            <ArrowRightStartOnRectangleIcon className="size-6 self-center" />
            <p className="self-center ml-2">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBar;
