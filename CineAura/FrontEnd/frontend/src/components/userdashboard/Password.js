import { useState } from 'react';
import { FiLock } from 'react-icons/fi';
import PasswordForm from './PasswordForm';

const Password = ({ setMessage }) => {
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ text: "Passwords don't match", type: 'error' });
      return;
    }
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(`http://localhost:5283/api/Auth/changepassword?id=${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword
        })
      });

      if (response.ok) {
        setMessage({ text: 'Password changed successfully', type: 'success' });
        setPasswordForm({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        throw new Error('Password change failed');
      }
    } catch (error) {
      setMessage({ text: 'Failed to change password', type: 'error' });
    }
  };

  return (
    <div style={{ 
      maxWidth: '600px',
      margin: '0 auto',
      padding: '25px',
      backgroundColor: '#0b1214',
      borderRadius: '4px',
      border: '1px solid #ebd0ad'
    }}>
      <h1 style={{ 
        color: '#ebd0ad',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '25px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #ebd0ad',
        paddingBottom: '15px'
      }}>
        <FiLock style={{ marginRight: '10px' }} />
        Change Password
      </h1>

      <PasswordForm 
        passwordForm={passwordForm}
        setPasswordForm={setPasswordForm}
        handleSubmit={handleChangePassword}
      />
    </div>
  );
};

export default Password;