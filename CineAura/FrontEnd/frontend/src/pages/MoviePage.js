import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
 

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5283/api/Movie/getbyid?id=${id}`);
        setMovie(response.data);
        const today = new Date();
        const release = new Date(response.data.releaseDate);
        const end = new Date(response.data.endDate);
        
        if (today < release) setStatus('Coming Soon');
        else if (today > end) setStatus('Expired');
        else setStatus('Available');

      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleButtonClick = () => {
    if (status === 'Coming Soon') {
      alert(`"${movie.title}" will be available on ${new Date(movie.releaseDate).toLocaleDateString()}`);
    } else if (status === 'Expired') {
      alert(`"${movie.title}" is no longer showing in theaters`);
    } else {
      alert('Ticket purchasing will be available soon!');
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!movie) return <div className="alert alert-danger">Movie not found</div>;

  const getButtonConfig = () => {
    switch(status) {
      case 'Coming Soon':
        return {
          text: 'Coming Soon',
          style: { backgroundColor: '#6c757d', color: 'white' }
        };
      case 'Expired':
        return {
          text: 'Unavailable',
          style: { backgroundColor: '#6c757d', color: 'white' }
        };
      default:
        return {
          text: 'Buy Tickets',
          style: { backgroundColor: '#ebd0ad', color: '#1a1a2e' }
        };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-5">
          {movie.photo && (
            <img
              src={`data:image/jpeg;base64,${movie.photo}`}
              className="img-fluid rounded shadow"
              alt={movie.title}
            />
          )}
        </div>
        
        <div className="col-md-7 text-light">
          <h1 className="mb-3">{movie.title}</h1>
          
          <div className="d-flex gap-3 mb-4 align-items-center">
            <span className="badge bg-gold-accent text-dark">{movie.genre?.name}</span>
            <span>{movie.duration} mins</span>
            <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
            <span className={`badge ${
              status === 'Available' ? 'badge rounded-pill text-bg-light' : 
              status === 'Coming Soon' ? 'badge rounded-pill text-bg-secondary' : 'bg-secondary'
            }`}>
              {status}
            </span>
          </div>
        
          <h4 className="mb-3" style={{ color: '#ebd0ad' }}>Synopsis</h4>
          <p className="lead">{movie.description}</p>
          
          <div className="mt-4">
            <button 
              className="btn btn-lg px-5" 
              style={buttonConfig.style}
              onClick={handleButtonClick}
            >
              {buttonConfig.text}
            </button>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default MoviePage;