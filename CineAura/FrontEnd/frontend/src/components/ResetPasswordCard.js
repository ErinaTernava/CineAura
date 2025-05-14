import { useState } from 'react';
import axios from 'axios';

const ResetPasswordCard = ({ onClose }) => {
  const [step, setStep] = useState(1); 
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [email, setEmailState] = useState(localStorage.getItem('reset_email') || '');

  const setEmail = (value) => {
    setEmailState(value);
    localStorage.setItem('reset_email', value);
  };

  const handleSendCode = async () => {
    try {
      await axios.post(`http://localhost:5283/api/PasswordReset/code?email=${email}`);
      setStep(2);
      setError('');
    } catch (err) {
      setError('Failed to send verification code. Make sure your email is correct.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      await axios.post(`http://localhost:5283/api/PasswordReset/verify`, {
        email: email,
        code: code
      });
      setStep(3);
      setError('');
    } catch (err) {
      setError('Invalid or expired code.');
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post(`http://localhost:5283/api/PasswordReset/reset`, {
        email: email,
        newPassword: newPassword
      });
      setSuccessMessage('Password reset successful. You can now log in.');
      setError('');
      setTimeout(() => {
        onClose(); 
      }, 3000);
    } catch (err) {
      setError('Failed to reset password.');
    }
  };

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000
    }}>
      <div className="modal-content p-4 rounded" style={{
        backgroundColor: '#1a252f',
        color: '#ebd0ad',
        maxWidth: '400px',
        margin: '100px auto',
        boxShadow: '0 0 10px #000'
      }}>
        <button onClick={onClose} style={{ float: 'right', background: 'none', border: 'none', color: '#ebd0ad' }}>✕</button>
        <h4 className="mb-3">Reset Password</h4>

        {step === 1 && (
          <>
            <p>Enter your email below to receive a verification code.</p>
            <input
              type="email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
            <button type="submit" 
              className="btn w-100 py-2 mt-3"
              style={{ 
                backgroundColor: '#ebd0ad', 
                color: '#0b1214',
                fontWeight: 'bold'
              }} onClick={handleSendCode}>Send Code</button>
          </>
        )}

        {step === 2 && (
          <>
            <p>Check your email and enter the 6-digit code below.</p>
            <input
              type="text"
              className="form-control mb-3"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
            />
            <button type="submit" 
              className="btn w-100 py-2 mt-3"
              style={{ 
                backgroundColor: '#ebd0ad', 
                color: '#0b1214',
                fontWeight: 'bold'
              }} onClick={handleVerifyCode}>Verify Code</button>
          </>
        )}

        {step === 3 && (
          <>
            <p>Enter your new password.</p>
            <input
              type="password"
              className="form-control mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
            />
            <button type="submit" 
              className="btn w-100 py-2 mt-3"
              style={{ 
                backgroundColor: '#ebd0ad', 
                color: '#0b1214',
                fontWeight: 'bold'
              }} onClick={handleResetPassword}>Reset Password</button>
          </>
        )}

        {error && <div className="text-danger mt-3">{error}</div>}
        {successMessage && <div className="text-success mt-3">{successMessage}</div>}
      </div>
    </div>
  );
};

export default ResetPasswordCard;
