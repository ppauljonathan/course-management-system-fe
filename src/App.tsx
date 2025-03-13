import { Route, Routes } from 'react-router'
import LeftNav from './components/LeftNav'
// import Signup from './pages/Signup'
import About from './pages/About';

function App() {

  const routes = (
    <Routes>
      <Route path="/about" element={<About />} />
    </Routes>
  )

  return (
    <>
      <LeftNav />
      <div className='absolute left-36'>
        {routes}
      </div>
    </>
  );
}

export default App
