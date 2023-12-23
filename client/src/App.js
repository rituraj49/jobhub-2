import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Error, Register, ProtectedRoute } from './pages'
import { AddJob, AllJobs, Profile, Stats, SharedLayout } from './pages/dashboard/';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
          }>
            <Route element={<Stats />} index />
            <Route path='add-job' element={<AddJob />} />
            <Route path='all-jobs' element={<AllJobs />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer autoClose={3000} position='top-center' closeOnClick theme='dark' draggable />
    </div>
  );
}

export default App;
