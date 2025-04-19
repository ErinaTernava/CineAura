import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthToken from '../hooks/useAuthToken';

const IndexPage = () => {
  const { token } = useAuthToken();
  const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//     }
//   }, [token, navigate]);

  return (
    <div className="container py-4">
      <h1 style={{ color: '#ebd0ad' }}>CineAura Index Page</h1>
    </div>
  );
};

export default IndexPage;
