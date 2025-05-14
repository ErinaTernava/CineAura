import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useAuthToken from '../hooks/useAuthToken';
import axios from 'axios';
import ResetPasswordCard from '../components/ResetPasswordCard';


const Login = () => {
  const [, setCookie] = useCookies(['access_token']);
  const { token } = useAuthToken();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorFields, setErrorFields] = useState({ email: false, password: false });
  const navigate = useNavigate();
  const [showResetCard, setShowResetCard] = useState(false);

  

  useEffect(() => {
    if (token) {
      navigate('/'); 
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5283/api/Auth/login', {
        email: email.trim(),
        password: password.trim(),
      });

      const { token } = response.data;

      setCookie('access_token', token, { path: '/' });

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      localStorage.setItem("userId", userId);  

      localStorage.setItem("token", token); 

      navigate('/'); 

      window.location.reload(); 
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.message || 'Invalid credentials');
        setErrorFields({ email: true, password: true });
      } else {
        setErrorMessage('Invalid email or password');
        setErrorFields({ email: true, password: true });
      }
    }
  };



  return (
    <div style={{ backgroundColor: '#0b1214', minHeight: '100vh' }}>
      {showResetCard && <ResetPasswordCard onClose={() => setShowResetCard(false)} />}
    <div style={{ backgroundColor: '#0b1214', minHeight: '100vh' }}>
      <img 
          src="/Images/CineAura.png" 
          alt="CineAura Logo"
          onClick={() => navigate('/')}
          style={{
            width: '150px',
            cursor: 'pointer',
            display: 'block',
            margin: '0 auto 20px auto'
          }}
        />
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="col-md-5 p-4 rounded" style={{ backgroundColor: '#1a252f' }}>
          <h2 className="text-center mb-4" style={{ color: '#ebd0ad' }}>Login</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label" style={{ color: '#ebd0ad' }}>Email Address</label>
              <input
                type="email"
                id="loginEmail"
                className={`form-control form-control-lg ${errorFields.email ? 'is-invalid' : ''}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorFields({ ...errorFields, email: false });
                  setErrorMessage('');
                }}
                placeholder="Enter your email address"
                style={{
                  backgroundColor: '#1a252f',
                  borderColor: errorFields.email ? 'red' : '#ebd0ad',
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
                className={`form-control form-control-lg ${errorFields.password ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorFields({ ...errorFields, password: false });
                  setErrorMessage('');
                }}
                placeholder="Enter your password"
                style={{
                  backgroundColor: '#1a252f',
                  borderColor: errorFields.password ? 'red' : '#ebd0ad',
                  color: 'white'
                }}
                required
              />
              <p className="text-start mt-3" style={{ color: '#a69074' }}>
                Forgot Password? <span style={{ color: '#ebd0ad', cursor: 'pointer' }} onClick={() => setShowResetCard(true)}>Reset Password</span>
              </p>
            {errorMessage && (
              <div className="text-danger mt-2" style={{ fontSize: '0.9rem' }}>
                {errorMessage}
              </div>
            )}
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
     </div>
  );
};

export default Login;
