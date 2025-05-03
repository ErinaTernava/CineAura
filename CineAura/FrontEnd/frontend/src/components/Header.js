import { Link, useNavigate } from 'react-router-dom';
import useAuthToken from '../hooks/useAuthToken';
import SearchBar from './SearchBar';

const Header = () => {
  const { token, userRole, clearToken } = useAuthToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/');
    window.location.reload();
  };

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <header
      className="py-3"
      style={{
        backgroundColor: '#0b1214',
        padding: '10px 25px',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      <div
        className="container d-flex flex-wrap justify-content-between align-items-center"
        style={{ width: '100%' }}
      >
        <div className="flex-shrink-0 me-3 mb-2 mb-md-0">
          <Link to="/" className="text-decoration-none">
            <img
              src="/Images/CineAura.png"
              alt="CineAura Logo"
              style={{
                maxHeight: '60px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </Link>
        </div>

        <div className="flex-grow-1 mb-2 mb-md-0" style={{ minWidth: '250px' }}>
          <SearchBar onSearch={handleSearch} />
        </div>

        <nav className="d-flex align-items-center flex-wrap justify-content-end ms-md-3">
          <Link to="/cart" className="text-decoration-none mx-2" style={{ color: '#ebd0ad' }}>
            Cart
          </Link>

          {token ? (
            <>
              {userRole === 'Admin' && (
                <Link to="/admin" className="text-decoration-none mx-2" style={{ color: '#ebd0ad' }}>
                  Admin
                </Link>
              )}
              <Link to="/profile" className="text-decoration-none mx-2" style={{ color: '#ebd0ad' }}>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="btn mx-2 mt-2 mt-md-0"
                style={{
                  backgroundColor: '#ebd0ad',
                  color: '#0b1214',
                  fontWeight: 'bold',
                  padding: '0.375rem 0.75rem'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn mx-2 mt-2 mt-md-0"
              style={{
                backgroundColor: '#ebd0ad',
                color: '#0b1214',
                fontWeight: 'bold',
                padding: '0.375rem 0.75rem'
              }}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
