import { Navigate, Outlet } from "react-router";
import isAuthenticated from "../utils/isAuthenticated";

function ProtectedRoute() {
  return isAuthenticated() ?  <Outlet />: <Navigate to='/login' />
}

export default ProtectedRoute;
