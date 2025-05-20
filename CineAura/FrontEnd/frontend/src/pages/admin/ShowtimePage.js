import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShowtimeCard from '../../components/admin/ShowtimeCard'; 
import DeleteShowtimeModal from '../../components/admin/DeleteShowtimeModal';

const ShowtimesPage = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showtimeIdToDelete, setShowtimeIdToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get('http://localhost:5283/api/Showtime/getAll', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setShowtimes(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShowtimes();
  }, []);

  const handleDeleteClick = (id) => {
    setShowtimeIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5283/api/Showtime/delete?id=${showtimeIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setShowtimes(showtimes.filter(showtime => showtime.id !== showtimeIdToDelete));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setShowtimeIdToDelete(null);
    }
  };

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#ebd0ad' }}>Showtime Management</h2>
        <Link to="/admin/add-showtime" className="btn" style={{ backgroundColor: '#ebd0ad', color: '#1a1a2e' }}>
          Add New Showtime
        </Link>
      </div>

      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {showtimes.map(showtime => (
          <div 
            key={showtime.id} 
            style={{ flex: '1 1 300px', maxWidth: '400px' }}
          >
            <ShowtimeCard 
              showtime={showtime} 
              onDeleteClick={handleDeleteClick} 
            />
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <DeleteShowtimeModal 
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setShowtimeIdToDelete(null);
          }}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default ShowtimesPage;