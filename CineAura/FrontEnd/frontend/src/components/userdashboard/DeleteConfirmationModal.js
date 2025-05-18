import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

const DeleteConfirmationModal = ({ setShowDeleteConfirm, setMessage }) => {
  
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

    const handleDeleteAccount = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(`http://localhost:5283/api/User/delete?id=${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = '/login';
      } else {
        throw new Error('Deletion failed');
      }
    } catch (error) {
      setMessage({ text: 'Failed to delete account', type: 'error' });
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(11, 18, 20, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#1a252f',
        border: '1px solid #ebd0ad',
        borderRadius: '4px',
        padding: '25px',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h3 style={{ 
          color: '#e74c3c',
          fontSize: '1.3rem',
          fontWeight: 'bold',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <FiTrash2 style={{ marginRight: '10px' }} />
          Confirm Account Deletion
        </h3>
        <p style={{ 
          color: '#ebd0ad',
          marginBottom: '25px',
          lineHeight: '1.5'
        }}>
          This action cannot be undone. All your data will be permanently removed from our systems.
        </p>
        <div style={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '15px'
        }}>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            onMouseEnter={() => setIsCancelHovered(true)}
            onMouseLeave={() => setIsCancelHovered(false)}
            style={{
              padding: '10px 20px',
              backgroundColor: isCancelHovered ? '#95a5a6' : '#7f8c8d',
              color: '#0b1214',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAccount}
            onMouseEnter={() => setIsDeleteHovered(true)}
            onMouseLeave={() => setIsDeleteHovered(false)}
            style={{
              padding: '10px 20px',
              backgroundColor: isDeleteHovered ? '#c0392b' : '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.3s'
            }}
          >
            <FiTrash2 style={{ marginRight: '8px' }} />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;