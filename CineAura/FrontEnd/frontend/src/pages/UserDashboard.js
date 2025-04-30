import { useState, useEffect } from 'react';
import { 
  FiUser, FiKey, FiEdit2, FiX, FiCheck, FiTrash2, 
  FiChevronRight, FiLock, FiMail, FiUserPlus 
} from 'react-icons/fi';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || ''
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`http://localhost:5283/api/User/getbyid?id=${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setUserData(data);
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || ''
        });
      } catch (error) {
        setMessage({ text: 'Failed to load profile', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
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
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ text: "Passwords don't match", type: 'error' });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5283/api/Auth/changepassword`, {
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

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:5283/api/User/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        localStorage.clear();
        window.location.href = '/login';
      } else {
        throw new Error('Deletion failed');
      }
    } catch (error) {
      setMessage({ text: 'Failed to delete account', type: 'error' });
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-pulse text-gray-400">Loading profile...</div>
      </div>
    );
  }

    return (
      <div style={{ backgroundColor: '#0b1214', minHeight: '100vh', display: 'flex' }}>
        <div style={{ 
          width: '250px',
          backgroundColor: '#1a252f',
          borderRight: '1px solid #ebd0ad',
          padding: '20px'
        }}>
          <div style={{ 
            paddingBottom: '20px',
            borderBottom: '1px solid #ebd0ad',
            marginBottom: '20px'
          }}>
            <h2 style={{ color: '#ebd0ad', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <FiUserPlus style={{ marginRight: '10px' }} />
              User Panel
            </h2>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              {userData?.email}
            </p>
          </div>
  
          <nav style={{ marginBottom: '20px' }}>
            <button
              onClick={() => setActiveTab('profile')}
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
                textAlign: 'left'
              }}
            >
              <FiUser style={{ marginRight: '10px' }} />
              My Profile
              <FiChevronRight style={{ marginLeft: 'auto' }} />
            </button>
  
            <button
              onClick={() => setActiveTab('password')}
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
                textAlign: 'left'
              }}
            >
              <FiKey style={{ marginRight: '10px' }} />
              Change Password
              <FiChevronRight style={{ marginLeft: 'auto' }} />
            </button>
          </nav>
  
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '12px',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              color: '#e74c3c',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              marginTop: 'auto'
            }}
          >
            <FiTrash2 style={{ marginRight: '10px' }} />
            Delete Account
          </button>
        </div>
  
        <div style={{ flex: 1, padding: '30px' }}>
          {message.text && (
            <div style={{ 
              marginBottom: '20px',
              padding: '15px',
              borderRadius: '4px',
              border: message.type === 'success' ? '1px solid #2ecc71' : '1px solid #e74c3c',
              backgroundColor: message.type === 'success' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
              color: message.type === 'success' ? '#2ecc71' : '#e74c3c'
            }}>
              {message.text}
            </div>
          )}
  
          {activeTab === 'profile' && (
            <div style={{ 
              maxWidth: '600px',
              margin: '0 auto',
              padding: '25px',
              backgroundColor: '#1a252f',
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
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 15px',
                      backgroundColor: '#ebd0ad',
                      color: '#0b1214',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
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
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 15px',
                      backgroundColor: '#7f8c8d',
                      color: '#0b1214',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    <FiX style={{ marginRight: '8px' }} />
                    Cancel
                  </button>
                )}
              </div>
  
              {editMode ? (
                <form onSubmit={handleUpdateProfile}>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <label style={{ 
                        display: 'block',
                        color: '#ebd0ad',
                        marginBottom: '8px',
                        fontSize: '0.9rem'
                      }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        style={{ 
                          width: '100%',
                          padding: '12px',
                          backgroundColor: '#1a252f',
                          border: '1px solid #ebd0ad',
                          borderRadius: '4px',
                          color: 'white'
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block',
                        color: '#ebd0ad',
                        marginBottom: '8px',
                        fontSize: '0.9rem'
                      }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        style={{ 
                          width: '100%',
                          padding: '12px',
                          backgroundColor: '#1a252f',
                          border: '1px solid #ebd0ad',
                          borderRadius: '4px',
                          color: 'white'
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ 
                      display: 'block',
                      color: '#ebd0ad',
                      marginBottom: '8px',
                      fontSize: '0.9rem'
                    }}>
                      Email
                    </label>
                    <div style={{ display: 'flex' }}>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 12px',
                        backgroundColor: '#1a252f',
                        border: '1px solid #ebd0ad',
                        borderRight: 'none',
                        borderTopLeftRadius: '4px',
                        borderBottomLeftRadius: '4px',
                        color: '#ebd0ad'
                      }}>
                        <FiMail />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        style={{ 
                          flex: 1,
                          padding: '12px',
                          backgroundColor: '#1a252f',
                          border: '1px solid #ebd0ad',
                          borderLeft: 'none',
                          borderTopRightRadius: '4px',
                          borderBottomRightRadius: '4px',
                          color: 'white'
                        }}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#ebd0ad',
                      color: '#0b1214',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '1rem'
                    }}
                  >
                    <FiCheck style={{ marginRight: '8px' }} />
                    Save Changes
                  </button>
                </form>
              ) : (
                <div style={{ marginTop: '20px' }}>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '30px',
                    marginBottom: '25px'
                  }}>
                    <div>
                      <h3 style={{ 
                        color: '#7f8c8d',
                        fontSize: '0.9rem',
                        marginBottom: '5px'
                      }}>
                        First Name
                      </h3>
                      <p style={{ 
                        color: '#ebd0ad',
                        fontSize: '1.1rem'
                      }}>
                        {userData.firstName}
                      </p>
                    </div>
                    <div>
                      <h3 style={{ 
                        color: '#7f8c8d',
                        fontSize: '0.9rem',
                        marginBottom: '5px'
                      }}>
                        Last Name
                      </h3>
                      <p style={{ 
                        color: '#ebd0ad',
                        fontSize: '1.1rem'
                      }}>
                        {userData.lastName}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ 
                      color: '#7f8c8d',
                      fontSize: '0.9rem',
                      marginBottom: '5px'
                    }}>
                      Email
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FiMail style={{ 
                        marginRight: '10px',
                        color: '#7f8c8d'
                      }} />
                      <p style={{ 
                        color: '#ebd0ad',
                        fontSize: '1.1rem'
                      }}>
                        {userData.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
  
          {activeTab === 'password' && (
            <div style={{ 
              maxWidth: '600px',
              margin: '0 auto',
              padding: '25px',
              backgroundColor: '#1a252f',
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
  
              <form onSubmit={handleChangePassword}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block',
                    color: '#ebd0ad',
                    marginBottom: '8px',
                    fontSize: '0.9rem'
                  }}>
                    Current Password
                  </label>
                  <div style={{ display: 'flex' }}>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      backgroundColor: '#1a252f',
                      border: '1px solid #ebd0ad',
                      borderRight: 'none',
                      borderTopLeftRadius: '4px',
                      borderBottomLeftRadius: '4px',
                      color: '#ebd0ad'
                    }}>
                      <FiLock />
                    </div>
                    <input
                      type="password"
                      value={passwordForm.oldPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                      style={{ 
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#1a252f',
                        border: '1px solid #ebd0ad',
                        borderLeft: 'none',
                        borderTopRightRadius: '4px',
                        borderBottomRightRadius: '4px',
                        color: 'white'
                      }}
                      required
                    />
                  </div>
                </div>
  
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block',
                    color: '#ebd0ad',
                    marginBottom: '8px',
                    fontSize: '0.9rem'
                  }}>
                    New Password
                  </label>
                  <div style={{ display: 'flex' }}>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      backgroundColor: '#1a252f',
                      border: '1px solid #ebd0ad',
                      borderRight: 'none',
                      borderTopLeftRadius: '4px',
                      borderBottomLeftRadius: '4px',
                      color: '#ebd0ad'
                    }}>
                      <FiLock />
                    </div>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      style={{ 
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#1a252f',
                        border: '1px solid #ebd0ad',
                        borderLeft: 'none',
                        borderTopRightRadius: '4px',
                        borderBottomRightRadius: '4px',
                        color: 'white'
                      }}
                      required
                    />
                  </div>
                </div>
  
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ 
                    display: 'block',
                    color: '#ebd0ad',
                    marginBottom: '8px',
                    fontSize: '0.9rem'
                  }}>
                    Confirm New Password
                  </label>
                  <div style={{ display: 'flex' }}>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      backgroundColor: '#1a252f',
                      border: '1px solid #ebd0ad',
                      borderRight: 'none',
                      borderTopLeftRadius: '4px',
                      borderBottomLeftRadius: '4px',
                      color: '#ebd0ad'
                    }}>
                      <FiLock />
                    </div>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      style={{ 
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#1a252f',
                        border: '1px solid #ebd0ad',
                        borderLeft: 'none',
                        borderTopRightRadius: '4px',
                        borderBottomRightRadius: '4px',
                        color: 'white'
                      }}
                      required
                    />
                  </div>
                </div>
  
                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#ebd0ad',
                    color: '#0b1214',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}
                >
                  <FiCheck style={{ marginRight: '8px' }} />
                  Update Password
                </button>
              </form>
            </div>
          )}
  
          {showDeleteConfirm && (
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
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#7f8c8d',
                      color: '#0b1214',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <FiTrash2 style={{ marginRight: '8px' }} />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default UserDashboard;