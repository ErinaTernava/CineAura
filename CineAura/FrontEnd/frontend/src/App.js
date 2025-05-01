import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MoviePage from './pages/MoviePage';
import SeatPicker from './pages/SeatPicker';
import TermsAndConditions from './pages/TermsAndConditions';
import CartPage from './pages/CartPage';
import UserDashboard from './pages/UserDashboard';
import Help from './pages/Help';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/profile" element={<UserDashboard />} />
              <Route path="/seatPicker" element={<SeatPicker />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/help" element={<Help />} />
              
      </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}

export default App;


