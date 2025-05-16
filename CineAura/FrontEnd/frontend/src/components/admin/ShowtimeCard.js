import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowtimeCard = ({ showtime, onDelete }) => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [hall, setHall] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isEditHovered, setEditHovered] = useState(false);
  const [isDeleteHovered, setDeleteHovered] = useState(false);

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchMovieAndHall = async () => {
      try {
        const movieRes = await axios.get(`http://localhost:5283/api/Movie/${showtime.movieId}`);
        const hallRes = await axios.get(`http://localhost:5283/api/Hall/${showtime.hallId}`);
        setMovie(movieRes.data);
        setHall(hallRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMovieAndHall();
  }, [showtime.movieId, showtime.hallId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this showtime?')) return;
    setIsDeleting(true);

    try {
      const response = await axios.delete(
        `http://localhost:5283/api/Showtime/delete?id=${id}`,
        {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }
      );

      window.location.reload();

      if (response.status === 200) onDelete(id);
      else throw new Error('Failed to delete showtime');
    } catch (error) {
      console.error('Delete error:', error);
      alert(`Failed to delete showtime: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
     <div className="card h-100 d-flex flex-column" style={{
      backgroundColor: '#0b1214',
      border: '1px solid #2c3e50',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '100%',
    
      minHeight: '320px', 
   
    
    }}>
      <div className="card-body flex-grow-1 d-flex flex-column justify-content-between">
        <h5 className="card-title" style={{ color: '#ebd0ad' }}>
          Movie Title: {showtime.movieTitle}
        </h5>
        <p className="mb-1" style={{ color: '#6c757d' }}>
          Hall: {showtime.hallName}
        </p>
        <p className="mb-2" style={{ color: '#d1d5db' }}>
          Showtime: {formatDateTime(showtime.startTime)}
        </p>
        <p style={{ color: '#e1b382' }}>
          Ticket Price: {showtime.ticketPrice}€
        </p>
      </div>

       <div className="card-footer bg-transparent border-top-0 d-flex flex-wrap gap-2 justify-content-between">
        <button
          onClick={() => navigate(`/admin/showtimes/edit/${showtime.id}`)}
           onMouseEnter={() => setEditHovered(true)}
          onMouseLeave={() => setEditHovered(false)}
          className="btn btn-sm"
          style={{
            flex: '1 1 45%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 12px',
             backgroundColor: isEditHovered ? '#ebd0ad' : 'transparent',
            color: isEditHovered ? '#1a1a2e' : '#ebd0ad',
            border: '1px solid #ebd0ad',
            borderRadius: '6px'
          }}
          disabled={isDeleting}
        >
          <FiEdit2 style={{ marginRight: '6px' }} />
          Edit
        </button>

        <button
          onClick={() => handleDelete(showtime.id)}
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
          className="btn btn-sm"
          style={{
            flex: '1 1 45%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 12px',
            backgroundColor: isDeleteHovered ? '#e74c3c' : 'transparent',
            color: isDeleteHovered ? 'white' : '#e74c3c',
            border: '1px solid #e74c3c',
            borderRadius: '6px'
          }}
          disabled={isDeleting}
        >
          <FiTrash2 style={{ marginRight: '6px' }} />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default ShowtimeCard;
