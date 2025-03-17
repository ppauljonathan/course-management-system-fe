import { Navigate, Outlet } from "react-router";
import isAuthenticated from "../utils/isAuthenticated";

function UnAuthRoute() {
  return isAuthenticated() ? <Navigate to='/' /> : <Outlet />
}

export default UnAuthRoute;
