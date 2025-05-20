import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

const UserRow = ({ user, onDeleteClick }) => {
  const [isHoveredRow, setIsHoveredRow] = useState(false);
  const [isHoveredBtn, setIsHoveredBtn] = useState(false);

  return (
    <tr
      onMouseEnter={() => setIsHoveredRow(true)}
      onMouseLeave={() => setIsHoveredRow(false)}
      style={{
        borderBottom: '1px solid #2c3e50',
        borderRadius: '12px',
        transition: 'background-color 0.2s',
        backgroundColor: isHoveredRow ? 'rgba(44, 62, 80, 0.5)' : 'transparent',
      }}
    >
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
          backgroundColor: user.role === 'Admin' ? 'rgba(235, 208, 173, 0.2)' : 'rgba(23, 162, 184, 0.2)',
          color: user.role === 'Admin' ? '#ebd0ad' : '#17a2b8',
          border: `1px solid ${user.role === 'Admin' ? '#ebd0ad' : '#17a2b8'}`
        }}>
          {user.role}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        <button
          onClick={() => onDeleteClick(user.id)}
          onMouseEnter={() => setIsHoveredBtn(true)}
          onMouseLeave={() => setIsHoveredBtn(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '6px 12px',
            backgroundColor: isHoveredBtn ? '#e74c3c' : 'transparent',
            color: isHoveredBtn ? 'white' : '#e74c3c',
            border: '1px solid #e74c3c',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s'           
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