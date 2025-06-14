import { Route, Routes, Navigate } from 'react-router'

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
import CourseCreate from './pages/CourseCreate';
import CourseUpdate from './pages/CourseUpdate';
import MarkdownTutorial from './pages/MarkdownTutorial';
import CourseShow from './pages/CourseShow';
import ChapterCreate from './pages/ChapterCreate';
import ChapterUpdate from './pages/ChapterUpdate';
import ChapterShow from './pages/ChapterShow';

function App() {
  const user = useAuthUser();

  const routes = (
    <Routes>
      <Route>
        <Route path="/" element={<Navigate to="/courses-list/all" replace />} />
        <Route path="/courses" element={<Navigate to="/courses-list/all" replace />} />
        <Route path="/courses-list" element={<Navigate to="/courses-list/all" replace />} />

        <Route path="/courses-list/all" element={<Home />} />
        <Route path="/courses/:id" element={<CourseShow />} />
        <Route path='/courses/:courseId/chapters/:id' element={<ChapterShow />} />

        <Route path="/md-help" element={<MarkdownTutorial />} />

        <Route element={< ProtectedRoute />}>
          <Route path="/courses-list/:category" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses/new" element={<CourseCreate />} />
          <Route path="/courses/:id/edit" element={<CourseUpdate />} />
          <Route path='/courses/:courseId/chapters/new' element={<ChapterCreate />} />
          <Route path='/courses/:courseId/chapters/:id/edit' element={<ChapterUpdate />} />
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
        <div className='h-full w-full flex-col overflow-y-auto'>
          {user && <TopBar user={user} />}
          <div className={`ml-5 mr-5 mb-5 ${user ? 'mt-5' : 'h-dvh pt-5'}`}>
            {routes}
          </div>
        </div>
        <ThemeToggle />
      </div>
    </>
  );
}

export default App
