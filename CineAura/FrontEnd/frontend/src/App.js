import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MoviePage from './pages/MoviePage';
import CinemaBookingSystem from './pages/CinemaBookingSystem';
import TermsAndConditions from './pages/TermsAndConditions';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/seatPicker" element={<CinemaBookingSystem />} />
              <Route path="/cart" element={<CartPage />} />
      </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}

export default App;


