import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [showtimes, setShowtimes] = useState([]);
  const [showPickShowtimeMessage, setShowPickShowtimeMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await axios.get(`http://localhost:5283/api/Movie/getbyid?id=${id}`);
        setMovie(movieResponse.data);
        
        const today = new Date();
        const release = new Date(movieResponse.data.releaseDate);
        const end = new Date(movieResponse.data.endDate);
        
        if (today < release) setStatus('Coming Soon');
        else if (today > end) setStatus('Expired');
        else {
          setStatus('Available');
          
          const showtimesResponse = await axios.get(`http://localhost:5283/api/Showtime/getByMovie?movieId=${id}`);
          
          const formattedShowtimes = showtimesResponse.data.map(showtime => ({
            ...showtime,
            startTime: new Date(showtime.startTime),
            hallName: showtime.hall?.hallName || `Hall ${showtime.hallId}`,
            hallType: showtime.hall?.hallType || '2D'
          }));
          
          setShowtimes(formattedShowtimes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleButtonClick = () => {
    if (status === 'Coming Soon') {
      alert(`"${movie.title}" will be available on ${new Date(movie.releaseDate).toLocaleDateString()}`);
    } else if (status === 'Expired') {
      alert(`"${movie.title}" is no longer showing in theaters`);
    } else if (status === 'Available') {
      setShowPickShowtimeMessage(true);
    }
  };

  const handleShowtimeClick = (showtime) => {
    setShowPickShowtimeMessage(false);
    navigate(`/seatPicker?movieId=${id}&hallId=${showtime.hallId}&showtimeId=${showtime.id}`);
  };

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
          style: { backgroundColor: '#ebd0ad', color: '#1a1a2e', fontWeight: 'bold' }
        };
    }
  };

  const groupShowtimesByDate = () => {
    const grouped = {};
    
    showtimes.forEach(showtime => {
      const date = showtime.startTime.toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(showtime);
    });
    
    return grouped;
  };

  const buttonConfig = getButtonConfig();
  const groupedShowtimes = groupShowtimesByDate();

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (!movie) return <div className="alert alert-danger">Movie not found</div>;

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-5">
          {movie.photo && (
            <img
              src={`data:image/jpeg;base64,${movie.photo}`}
              className="img-fluid rounded shadow"
              alt={movie.title}
              style={{ maxHeight: '600px', objectFit: 'cover' }}
            />
          )}
        </div>
        
        <div className="col-md-7 text-light">
          <h1 className="mb-3">{movie.title}</h1>
          
          <div className="d-flex gap-3 mb-4 align-items-center flex-wrap">
            <span className="badge badge-secondary">{movie.genreName}</span>
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
              disabled={status === 'Available' && showtimes.length === 0}
            >
              {buttonConfig.text}
            </button>
            {showPickShowtimeMessage && (
              <p className="mt-2" style={{ color: '#ebd0ad' }}>Pick a showtime below</p>
            )}
          </div>

          {status === 'Available' && (
            <div className="mt-5">
              <h4 className="mb-4" style={{ color: '#ebd0ad' }}>Available Showtimes</h4>
              
              {showtimes.length > 0 ? (
                Object.entries(groupedShowtimes).map(([date, dateShowtimes]) => (
                  <div key={date} className="mb-4">
                    <h5 className="text-light mb-3">{date}</h5>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                      {dateShowtimes.map(showtime => (
                        <div key={showtime.id} className="col">
                          <div 
                            className="card bg-dark text-light border-secondary hover-effect"
                            style={{ 
                              cursor: 'pointer',
                              transition: 'transform 0.2s, box-shadow 0.2s',
                              borderColor: '#ebd0ad'
                            }}
                            onClick={() => handleShowtimeClick(showtime)}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = ''}
                          >
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h5 className="card-title" style={{ color: '#ebd0ad' }}>
                                    {showtime.hallName}
                                  </h5>
                                  <p className="card-text mb-1">
                                    {showtime.startTime.toLocaleTimeString([], { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </p>
                                  <p className="card-text mb-1">
                                    Price: ${showtime.ticketPrice}
                                  </p>
                                </div>
                                <div className="text-end">
                                  <span className="badge bg-secondary">
                                    {showtime.hallType}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="alert alert-info bg-dark text-light border-secondary">
                  No showtimes available for this movie.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;