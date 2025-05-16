import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LogoutButton = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} 
    className="btn btn-danger">
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
       style={{
        backgroundColor: hovered ? '#c0392b' : '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
        fontWeight: 'bold'
      }}
    
      Logout
    </button>
  );
};

export default LogoutButton;
