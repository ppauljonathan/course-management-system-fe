import { Navigate } from "react-router"

function Logout() {
  localStorage.removeItem('accessToken');
  return (
    <Navigate to='/login' />
  )
}

export default Logout
