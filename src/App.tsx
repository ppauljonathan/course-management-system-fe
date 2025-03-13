import { Route, Routes } from 'react-router'
import LeftNav from './components/LeftNav'
import About from './pages/About';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {

  const routes = (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )

  return (
    <>
      <LeftNav />
      <div className='h-full w-full ml-5 overflow-scroll'>
        {routes}
      </div>
    </>
  );
}

export default App
