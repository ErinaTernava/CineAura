import { useState } from 'react';
import { FiUser, FiEdit2, FiX } from 'react-icons/fi';
import UserInfo from './UserInfo';
import UserForm from './UserForm';

const ProfileTab = ({ userData, setUserData, setMessage }) => {
  const [editMode, setEditMode] = useState(false);
  const [editHover, setEditHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    email: userData.email || ''
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(`http://localhost:5283/api/User/update?id=${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: localStorage.getItem("userId"),
          ...formData
        })
      });
  
      const result = await response.json();
      
      if (result === false) {
        throw new Error("Update failed - server returned false");
      }
  
      if (!response.ok || !result) {
        throw new Error("Update failed");
      }
  
      setUserData(result);
      setEditMode(false);
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
  
    } catch (error) {
      console.error("Update error:", error);
      setMessage({
        text: error.message || 'Failed to update profile',
        type: 'error'
      });
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
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        borderBottom: '1px solid #ebd0ad',
        paddingBottom: '15px'
      }}>
        <h1 style={{ 
          color: '#ebd0ad',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center'
        }}>
          <FiUser style={{ marginRight: '10px' }} />
          Personal Information
        </h1>
        
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            onMouseEnter={() => setEditHover(true)}
            onMouseLeave={() => setEditHover(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 15px',
              backgroundColor: editHover ? '#d1b386' : '#ebd0ad',
              color: '#0b1214',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease'
            }}
          >
            <FiEdit2 style={{ marginRight: '8px' }} />
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => {
              setEditMode(false);
              setFormData({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email
              });
            }}
            onMouseEnter={() => setCancelHover(true)}
            onMouseLeave={() => setCancelHover(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 15px',
              backgroundColor: cancelHover ? '#95a5a6' : '#7f8c8d',
              color: '#0b1214',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease'
            }}
          >
            <FiX style={{ marginRight: '8px' }} />
            Cancel
          </button>
        )}
      </div>

      {editMode ? (
        <UserForm 
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleUpdateProfile}
        />
      ) : (
        <UserInfo userData={userData} />
      )}
    </div>
  );
};

export default ProfileTab;