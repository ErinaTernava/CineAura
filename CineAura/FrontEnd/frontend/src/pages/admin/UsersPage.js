import React, { useEffect, useState } from 'react';
import useAuthToken from '../../hooks/useAuthToken';
import UserRow from '../../components/admin/UserRow';
import DeleteUserModal from '../../components/admin/DeleteUserModal';

const UsersPage = () => {
  const { token } = useAuthToken();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5283/api/User/getAll', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5283/api/User/delete?id=${userIdToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to delete user');
      
      setUsers(users.filter(user => user.id !== userIdToDelete));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setUserIdToDelete(null);
    }
  };

  if (loading) return <div className="text-center py-5">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-4" style={{ color: '#ebd0ad' }}>Manage Users</h2>
      
      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th style={{ color: '#ebd0ad' }}>Name</th>
              <th style={{ color: '#ebd0ad' }}>Email</th>
              <th style={{ color: '#ebd0ad' }}>Role</th>
              <th style={{ color: '#ebd0ad' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <UserRow 
                key={user.id}
                user={user}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <DeleteUserModal 
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setUserIdToDelete(null);
          }}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default UsersPage;