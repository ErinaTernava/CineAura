import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useAuthToken from '../hooks/useAuthToken';
import axios from 'axios';

const Login = () => {
  const [, setCookie] = useCookies(['access_token']);
  const { token } = useAuthToken();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/IndexPage'); 
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5283/api/Auth/login', {
        email: email.trim(),
        password: password.trim(),
      });

      setCookie('access_token', response.data.token, { path: '/' });
      navigate('/');
      window.location.reload();
    } catch (err) {
      if (err.response) {
        console.log('Error Response:', err.response);
        alert(`Error: ${err.response.data.message || 'Invalid credentials'}`);
      } else {
        console.log('Error:', err);
        alert('An error occurred');
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#0b1214', minHeight: '100vh' }}>
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="col-md-5 p-4 rounded" style={{ backgroundColor: '#1a252f' }}>
          <h2 className="text-center mb-4" style={{ color: '#ebd0ad' }}>Login</h2>
          

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label" style={{ color: '#ebd0ad' }}>Email Address</label>
              <input
                type="email"
                id="loginEmail"
                className="form-control form-control-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                style={{ 
                  backgroundColor: '#1a252f', 
                  borderColor: '#ebd0ad', 
                  color: 'white' 
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label" style={{ color: '#ebd0ad' }}>Password</label>
              <input
                type="password"
                id="loginPassword"
                className="form-control form-control-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ 
                  backgroundColor: '#1a252f', 
                  borderColor: '#ebd0ad', 
                  color: 'white' 
                }}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn w-100 py-2 mt-3"
              style={{ 
                backgroundColor: '#ebd0ad', 
                color: '#0b1214',
                fontWeight: 'bold'
              }}
            >
              Login
            </button>
          </form>
          <p className="text-center mt-3" style={{ color: '#ebd0ad' }}>
            Don't have an account? <a href="/signup" style={{ color: '#ebd0ad' }}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
