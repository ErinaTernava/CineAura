import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const DeleteUserModal = ({ onConfirm, onCancel, isDeleting }) => {
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
          Confirm User Deletion
        </h3>
        <p style={{ 
          color: '#ebd0ad',
          marginBottom: '25px',
          lineHeight: '1.5'
        }}>
          This action cannot be undone. The user and all their associated data will be permanently removed.
        </p>
        <div style={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '15px'
        }}>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            style={{
              padding: '10px 20px',
              backgroundColor: '#7f8c8d',
              color: '#0b1214',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              opacity: isDeleting ? 0.7 : 1
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            style={{
              padding: '10px 20px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              opacity: isDeleting ? 0.7 : 1
            }}
          >
            <FiTrash2 style={{ marginRight: '8px' }} />
            {isDeleting ? 'Deleting...' : 'Delete User'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;