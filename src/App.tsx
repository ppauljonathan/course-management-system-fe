import { Route, Routes } from 'react-router'

import LeftNav from './components/LeftNav'
import About from './pages/About';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ThemeToggle from './components/ThemeToggle';
import UnAuthRoute from './components/UnAuthRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './pages/Logout';
import TopBar from './components/TopBar';
import useAuthUser from './hooks/useAuthUser';
import ServerError from './pages/ServerError'; 

function App() {
  const user = useAuthUser();

  const routes = (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:category" element={<Home />} />
        <Route element={< ProtectedRoute/>}>
          <Route path="/about" element={<About />} />
        </Route>
        <Route element={<UnAuthRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="/logout" element={<Logout />} />
        <Route path="/500" element={<ServerError />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )


  return (
    <>
      <div className="h-dvh w-dvw flex dark:bg-gray-900 dark:text-white">
        <LeftNav />
        <div className='h-full w-full flex-col overflow-y-scroll'>
          { user && <TopBar user={user} /> }
          <div className={`ml-5  ${user ? 'mt-5' : 'h-dvh pt-5' }`}>
            {routes}
          </div>
        </div>
        <ThemeToggle />
      </div>
    </>
  );
}

export default App
