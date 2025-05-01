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
    <header className="py-3" style={{ 
        backgroundColor: '#0b1214',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 25px',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
      <div className="container d-flex justify-content-between align-items-center">
  
        <div className="d-flex align-items-center">
          <Link to="/" className="text-decoration-none">
            <img 
              src="/Images/CineAura.png" 
              alt="CineAura Logo"
              style={{
                height: '1000%', 
                width: 'auto',
                maxHeight: '75px', 
                objectFit: 'contain', 
                padding: '5px 0' 
              }}
            />
          </Link>
         
          <div className="ms-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

       
        <nav className="d-flex align-items-center">
          <Link to="/" className="text-decoration-none mx-3" style={{ color: '#ebd0ad' }}>
            Home
          </Link>

          <Link to="/cart" className="text-decoration-none mx-3" style={{ color: '#ebd0ad' }}>
            Cart
          </Link>

          {token ? (
            <>
              {userRole === 'Admin' && (
                <Link to="/admin" className="text-decoration-none mx-3" style={{ color: '#ebd0ad' }}>
                  Admin
                </Link>
              )}
              <Link to="/profile" className="text-decoration-none mx-3" style={{ color: '#ebd0ad' }}>
                Profile
              </Link>
              <button 
                onClick={handleLogout} 
                className="btn ms-3"
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
              className="btn ms-3"
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
