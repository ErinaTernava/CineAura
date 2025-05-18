import {useState} from 'react';
import { FiUser, FiKey, FiTrash2, FiChevronRight, FiUserPlus } from 'react-icons/fi';

const Sidebar = ({ userEmail, activeTab, setActiveTab, setShowDeleteConfirm }) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  return (
    <div style={{ 
      width: '220px',
      backgroundColor:'transparent',
      borderRight: '1px solid #ebd0ad',
      padding: '15px',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      margin: -40,
      top: 0,
     
    }}>
      <div style={{ 
        paddingBottom: '20px',
        borderBottom: '1px solid #ebd0ad',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#ebd0ad', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '20px' }}>
          <FiUserPlus style={{ marginRight: '10px' }} />
          User Panel
        </h2>
        <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
          {userEmail}
        </p>
      </div>

      <nav style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('profile')}
          onMouseEnter={() => setHoveredButton('profile')}
          onMouseLeave={() => setHoveredButton(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '12px',
            marginBottom: '8px',
            borderRadius: '4px',
            backgroundColor: activeTab === 'profile' ? '#2c3e50' : 'transparent',
            color: activeTab === 'profile' ? '#ebd0ad' : '#ffffff',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'background-color 0.3s ease'
          }}
        >
          <FiUser style={{ marginRight: '10px' }} />
          My Profile
          <FiChevronRight style={{ marginLeft: 'auto' }} />
        </button>

        <button
          onClick={() => setActiveTab('password')}
          onMouseEnter={() => setHoveredButton('password')}
          onMouseLeave={() => setHoveredButton(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '12px',
            borderRadius: '4px',
            backgroundColor: activeTab === 'password' ? '#2c3e50' : 'transparent',
            color: activeTab === 'password' ? '#ebd0ad' : '#ffffff',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'background-color 0.3s ease'
          }}
        >
          <FiKey style={{ marginRight: '10px' }} />
          Change Password
          <FiChevronRight style={{ marginLeft: 'auto' }} />
        </button>
      </nav>

      <button 
        onClick={() => setShowDeleteConfirm(true)}
        onMouseEnter={() => setHoveredButton('delete')}
        onMouseLeave={() => setHoveredButton(null)}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: '12px',
          borderRadius: '4px',
          backgroundColor: hoveredButton === 'delete' ? '#341f1f' : 'transparent',
          color: '#e74c3c',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          marginTop: '0px',
          transition: 'background-color 0.3s ease'
        }}
      >
        <FiTrash2 style={{ marginRight: '10px' }} />
        Delete Account
      </button>
    </div>
  );
};

export default Sidebar;