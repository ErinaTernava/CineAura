import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const UserRow = ({ user, onDelete }) => {
  return (
    <tr style={{ 
      borderBottom: '1px solid #2c3e50',
       borderRadius:'12px',
      transition: 'background-color 0.2s',
      ':hover': {
        backgroundColor: 'rgba(44, 62, 80, 0.5)'
      }
    }}>
      <td style={{ padding: '16px', color: '#d1d5db'}}>
        {user.firstName} {user.lastName}
      </td>
      <td style={{ padding: '16px', color: '#d1d5db' }}>
        {user.email}
      </td>
      <td style={{ padding: '16px' }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '20px',
          fontWeight: '500',
          fontSize: '0.85rem',
          backgroundColor: user.role === 'Admin' ? '#ebd0ad(159, 161, 41, 0.58)' : '',
          color: user.role === 'Admin' ? '#ffc107' : '#17a2b8',
          border: `1px solid ${user.role === 'Admin' ? '#ffc107' : '#17a2b8'}`
        }}>
          {user.role}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        <button
          onClick={() => onDelete(user.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '6px 12px',
            backgroundColor: 'transparent',
            color: '#e74c3c',
            border: '1px solid #e74c3c',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            ':hover': {
              backgroundColor: 'rgba(231, 76, 60, 0.1)'
            }
          }}
        >
          <FiTrash2 style={{ marginRight: '6px' }} />
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;