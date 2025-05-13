import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, onDelete }) => {
  const navigate = useNavigate();

  const getStatus = (releaseDate, endDate) => {
    const today = new Date();
    const release = new Date(releaseDate);
    const end = new Date(endDate);

    if (today < release) return { text: 'Coming Soon', color: '#6c757d' };
    if (today > end) return { text: 'Expired', color: '#dc3545' };
    return { text: 'Available', color: '#28a745' };
  };

  const status = getStatus(movie.releaseDate, movie.endDate);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        const response = await fetch(`http://localhost:5283/api/Movie/delete?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }); window.location.reload();
        
        if (!response.ok) throw new Error('Failed to delete movie');
        onDelete(id);
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete movie');
      }
    }
  };

  return (
       <div className="card h-100" style={{
      backgroundColor: '#0b1214',
      border: '1px solid #2c3e50',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {movie.photo && (
        <img
          src={`data:image/jpeg;base64,${movie.photo}`}
          className="card-img-top"
          alt={movie.title}
          style={{
            height: '220px',
            objectFit: 'cover',
            borderBottom: '1px solid #2c3e50',
            width: '100%'
          }}
        />
      )}

      
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap">
          <h5 className="card-title" style={{ 
            color: '#ebd0ad',
            fontSize: '1.1rem',
            fontWeight: '500',
            marginBottom: '0.5rem'
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
              whiteSpace: 'nowrap'
            }}>
            {status.text}
          </span>
        </div>
        
        <p className="mb-2" style={{ 
          color: '#6c757d',
          fontSize: '0.9rem'
        }}>
          {movie.genre?.name} • {movie.duration} mins
        </p>
        
        <p className="card-text" style={{
          color: '#d1d5db',
          fontSize: '0.95rem',
          marginBottom: '20px'
        }}>
          {movie.description?.substring(0, 100)}...
        </p>
      </div>
      
       <div className="card-footer bg-transparent border-top-0 d-flex flex-wrap gap-2 justify-content-between">
        <button
          onClick={() => navigate(`/admin/movies/edit/${movie.id}`)}
          className="btn btn-sm"
          style={{
            flex: '1 1 45%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 12px',
            backgroundColor: 'transparent',
            color: '#ebd0ad',
            border: '1px solid #ebd0ad',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          <FiEdit2 style={{ marginRight: '6px' }} />
          Edit
        </button>
        
       <button
          onClick={() => handleDelete(movie.id)}
          className="btn btn-sm"
          style={{
            flex: '1 1 45%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 12px',
            backgroundColor: 'transparent',
            color: '#e74c3c',
            border: '1px solid #e74c3c',
            borderRadius: '6px',
            cursor: 'pointer'
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