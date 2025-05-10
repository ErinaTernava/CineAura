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
import SearchResultPage from './pages/SearchResultPage'; 
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import AdminLayout from './components/admin/AdminLayout';
import MoviesPage from './pages/admin/MoviePage';
import AddMoviePage from './pages/admin/AddMoviePage';
import UsersPage from './pages/admin/UsersPage';
import EditMoviePage from './pages/admin/EditMoviePage';
import AddHallPage from './pages/admin/AddHallPage';
import EditHallPage from './pages/admin/EditHallPage';
import HallsPage from './pages/admin/HallsPage';
import AddShowtimePage from './pages/admin/AddShowtimePage';
import EditShowtimePage from './pages/admin/EditShowtimePage';
import ShowtimesPage from './pages/admin/ShowtimePage';


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
              <Route path="/search" element={<SearchResultPage />} />
              <Route path="/success" element={<SuccessPage/>}/>
              <Route path="/cancel" element={<CancelPage />} />
              <Route path="admin" element={<AdminLayout />}>
                  <Route index element={<MoviesPage />} />
                  <Route path="movies" element={<MoviesPage />} />
                  <Route path="add-movie" element={<AddMoviePage />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="movies/edit/:id" element={<EditMoviePage />} />
                  <Route path="halls" element={<HallsPage />} />
                  <Route path="add-hall" element={<AddHallPage />} />
                  <Route path="halls/edit/:id" element={<EditHallPage />} />
                  <Route path="showtimes" element={<ShowtimesPage />} />
                  <Route path="add-showtime" element={<AddShowtimePage />} />
                  <Route path="showtimes/edit/:id" element={<EditShowtimePage />} />
              </Route>   
              
      </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}

export default App;


