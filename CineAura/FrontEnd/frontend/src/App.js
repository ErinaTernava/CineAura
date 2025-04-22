import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MoviePage from './pages/MoviePage';
import CinemaBookingSystem from './pages/CinemaBookingSystem';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/movies/:id" element={<MoviePage/>}/>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/CinemaBookingSystem" element={<CinemaBookingSystem/>}/>
    </Routes>
  );
}

export default App;
