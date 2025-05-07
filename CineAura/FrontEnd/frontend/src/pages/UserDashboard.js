import { useState, useEffect } from 'react';
import Sidebar from '../components/userdashboard/Sidebar';
import ProfileTab from '../components/userdashboard/ProfileTab';
import Password from '../components/userdashboard/Password';
import DeleteConfirmationModal from '../components/userdashboard/DeleteConfirmationModal';
import MessageAlert from '../components/userdashboard/MessageAlert';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
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
      } catch (error) {
        setMessage({ text: 'Failed to load profile', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-pulse text-gray-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#1a252f', minHeight: '60vh', display: 'flex'}}>
      <Sidebar 
        userEmail={userData?.email} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        setShowDeleteConfirm={setShowDeleteConfirm}
      />
      
      <div style={{ flex: 1, padding: '70px' }}>
        {message.text && <MessageAlert message={message} />}

        {activeTab === 'profile' && (
          <ProfileTab 
            userData={userData} 
            setUserData={setUserData}
            setMessage={setMessage}
          />
        )}

        {activeTab === 'password' && (
          <Password setMessage={setMessage} />
        )}
      </div>

      {showDeleteConfirm && (
        <DeleteConfirmationModal 
          setShowDeleteConfirm={setShowDeleteConfirm}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default UserDashboard;