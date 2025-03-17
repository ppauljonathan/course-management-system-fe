import { UserCircleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import useAuthUser from "../../hooks/useAuthUser";
import { useNavigate } from "react-router";

function TopBar() {
  const user = useAuthUser();
  const userFullName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(" ");

  const navigate = useNavigate()

  return (
    <>
      <div className="h-12 flex bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex ml-auto mr-2">
          <div className="self-center flex hover:bg-gray-300 p-3 cursor-pointer">
            <UserCircleIcon className="size-8 self-center" />
            <p className="self-center ml-2">{userFullName}</p>
          </div>
          <div className="self-center flex hover:bg-gray-300 p-3 cursor-pointer" onClick={() => navigate('/logout')}>
            <ArrowRightStartOnRectangleIcon className="size-6 self-center" />
            <p className="self-center ml-2">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBar;
