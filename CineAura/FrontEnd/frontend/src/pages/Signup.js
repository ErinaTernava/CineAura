import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const requestBody = {
      firstName,
      lastName,
      email,
      password
    };

    try {
      const response = await axios.post('http://localhost:5283/api/Auth/register', requestBody);

      if (response.status === 200) {
        alert('Signup successful!');
      }
    }catch (error) {
        if (error.response) {
            console.log("Error data: ", error.response.data);
            alert(`An error occurred: ${error.response.data.message || error.response.data}`);
        } else if (error.request) {
            console.log("No response received: ", error.request);
            alert("An error occurred with the request. Please try again.");
        } else {
            console.log("Error message: ", error.message);
            alert(`An error occurred: ${error.message}`);
        }
    }
  };

  return (
    <div style={{ backgroundColor: '#0b1214', minHeight: '100vh' }}>
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="col-md-5 p-4 rounded" style={{ backgroundColor: '#1a252f' }}>
          <h2 className="text-center mb-4" style={{ color: '#ebd0ad' }}>Create an Account</h2>
          
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSignup}> 
            <label htmlFor="firstName" className="form-label" style={{ color: '#ebd0ad' }}>First Name</label>
            <div className="mb-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="form-control form-control-lg"
                style={{ 
                  backgroundColor: '#1a252f', 
                  borderColor: '#ebd0ad', 
                  color: 'white' 
                }}
                required
              />
            </div>
            <div className="mb-3">
               <label htmlFor="lastName" className="form-label" style={{ color: '#ebd0ad' }}>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="form-control form-control-lg"
                style={{ 
                  backgroundColor: '#1a252f', 
                  borderColor: '#ebd0ad', 
                  color: 'white' 
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: '#ebd0ad' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="form-control form-control-lg"
                style={{ 
                  backgroundColor: '#1a252f', 
                  borderColor: '#ebd0ad', 
                  color: 'white' 
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{ color: '#ebd0ad' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="form-control form-control-lg"
                style={{ 
                  backgroundColor: '#1a252f', 
                  borderColor: '#ebd0ad', 
                  color: 'white' 
                }}
                required
              />
            </div>
            <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label" style={{ color: '#ebd0ad' }}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="form-control form-control-lg"
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
              Sign Up
            </button>
          </form>
          <p className="text-center mt-3" style={{ color: '#ebd0ad' }}>
            Already have an account? <a href="/login" style={{ color: '#ebd0ad' }}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
