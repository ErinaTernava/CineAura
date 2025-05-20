import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, onDelete }) => {
  const navigate = useNavigate();

  const [isEditHovered, setEditHovered] = useState(false);
  const [isDeleteHovered, setDeleteHovered] = useState(false);

  const getStatus = (releaseDate, endDate) => {
    const today = new Date();
    const release = new Date(releaseDate);
    const end = new Date(endDate);

    if (today < release) return { text: 'Coming Soon', color: '#6c757d' };
    if (today > end) return { text: 'Expired', color: '#dc3545' };
    return { text: 'Available', color: '#28a745' };
  };

  const status = getStatus(movie.releaseDate, movie.endDate);

  return (
    <div className="card h-100" style={{ 
      backgroundColor: '#0b1214',
      border: '1px solid #2c3e50',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
    }}>
      {movie.photo && (
        <img
          src={`data:image/jpeg;base64,${movie.photo}`}
          className="card-img-top"
          alt={movie.title}
          style={{
            height: '220px',
            width: '100%',
            objectFit: 'cover',
            borderBottom: '1px solid #2c3e50'
          }}
        />
      )}
      
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title" style={{ 
            color: '#ebd0ad',
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
            {movie.title}
          </h5>
          <span style={{
            backgroundColor: status.color,
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: '500',
            marginTop: '4px'
          }}>
            {status.text}
          </span>
        </div>
        
        <div className="mb-3">
          <p style={{ 
            color: '#6c757d',
            fontSize: '0.9rem',
            marginBottom: '4px'
          }}>
            {movie.genre?.name} • {movie.duration} mins
          </p>
          <p style={{ 
            color: '#d1d5db',
            fontSize: '0.9rem'
          }}>
            {movie.description?.substring(0, 100)}...
          </p>
        </div>
      </div>

      <div className="card-footer bg-transparent border-top-0 d-flex flex-wrap gap-2 justify-content-between">
        <button 
          onClick={() => navigate(`/admin/movies/edit/${movie.id}`)}
          onMouseEnter={() => setEditHovered(true)}
          onMouseLeave={() => setEditHovered(false)}
          className="btn btn-sm"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: isEditHovered ? '#ebd0ad' : 'transparent',
            color: isEditHovered ? '#0b1214' : '#ebd0ad',
            border: '1px solid #ebd0ad',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
          }}
        >
          <FiEdit2 style={{ marginRight: '6px' }} />
          Edit
        </button>
        
        <button 
          onClick={onDelete}
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
          className="btn btn-sm"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: isDeleteHovered ? '#e74c3c' : 'transparent',
            color: isDeleteHovered ? '#fff' : '#e74c3c',
            border: '1px solid #e74c3c',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
          }}
        >
          <FiTrash2 style={{ marginRight: '6px' }} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;