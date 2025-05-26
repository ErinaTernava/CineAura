import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthToken from '../hooks/useAuthToken';
import MovieFilterNav from '../components/MovieFilterNav';
import axios from 'axios';

const IndexPage = () => {
  const { token } = useAuthToken();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedGenreId, setSelectedGenreId] = useState('');
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const indexOfLastMovie = currentPage * pageSize;
  const indexOfFirstMovie = indexOfLastMovie - pageSize;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / pageSize);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await fetch('http://localhost:5283/api/Movie/getAll', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!moviesResponse.ok) throw new Error('Failed to fetch movies');
        const moviesData = await moviesResponse.json();
        setMovies(moviesData);
        setFilteredMovies(moviesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const filterMovies = async () => {
      if (selectedGenreId && activeFilter === 'genre') {
        try {
          const response = await axios.get(`http://localhost:5283/api/Movie/bygenre?genreId=${selectedGenreId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setFilteredMovies(response.data);
        } catch (error) {
          console.error('Failed to fetch movies by genre:', error);
        }
      } else {
        const filtered = movies.filter(movie => {
          const status = getMovieStatus(movie.releaseDate, movie.endDate);
          
          if (activeFilter === 'available' && status !== 'Available') return false;
          if (activeFilter === 'coming-soon' && status !== 'Coming Soon') return false;
          
          return true;
        });
        setFilteredMovies(filtered);
      }
      setCurrentPage(1);
    };

    filterMovies();
  }, [activeFilter, selectedGenreId, movies, token]);

  const getMovieStatus = (releaseDate, endDate) => {
    const today = new Date();
    const release = new Date(releaseDate);
    const end = new Date(endDate);

    if (today < release) return 'Coming Soon';
    if (today > end) return 'Expired';
    return 'Available';
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenreId(genreId);
  };

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border" style={{ color: '#ebd0ad' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p style={{ color: '#ebd0ad' }}>Loading movies...</p>
    </div>
  );

  if (error) return (
    <div className="container py-4">
      <div className="alert alert-danger">Error: {error}</div>
    </div>
  );

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4" style={{ color: '#ebd0ad' }}>Now Showing at CineAura</h1>
      
      <MovieFilterNav 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onGenreSelect={handleGenreSelect}
      />
      
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {currentMovies.map(movie => {
          const status = getMovieStatus(movie.releaseDate, movie.endDate);
          const statusColors = {
            'Available': { bg: 'badge rounded-pill text-bg-light', text: 'text-dark' },
            'Coming Soon': { bg: 'badge rounded-pill text-bg-secondary', text: 'text-dark' },
            'Expired': { bg: 'badge rounded-pill text-bg-dark', text: 'text-white' }
          }[status];
          const isAvailable = status === 'Available';

          

          return (
            <div key={movie.id} className="col">
              <div 
                className="card h-100 shadow-sm"
                onClick={() => navigate(`/movies/${movie.id}`)}
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: '#0b1214',
                  border: '1px solid #2c3e50'
                }}
              >
                {movie.photo && (
                  <img 
                    src={`data:image/jpeg;base64,${movie.photo}`} 
                    className="card-img-top" 
                    alt={movie.title}
                    style={{ 
                      height: '300px', 
                      objectFit: 'cover',
                      borderBottom: '1px solid #2c3e50'
                    }}
                  />
                )}

                <div className="card-body text-light">
                  <h5 className="card-title" style={{ color: '#ebd0ad' }}>{movie.title}</h5>
                  
                  <p className="card-text small" style={{ color: '#6c757d' }}> 
                    {movie.genre?.name} • <span style={{ color: '#d1d5db' }}>{movie.duration} mins</span>
                  </p>
                  
                  <p className="card-text">
                    {movie.description?.substring(0, 100)}...
                  </p>
                </div>

                <div className="card-footer bg-transparent border-top-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge ${statusColors.bg} ${statusColors.text}`}>
                      {status}
                    </span>
                    
                    <button 
                      className="btn btn-sm" 
                      style={{ 
                       backgroundColor:
                          hoveredMovieId === movie.id
                            ? (isAvailable ? '#d4c68d' : '#5a626a')
                            : (isAvailable ? '#ebd0ad' : '#6c757d'),
                        color: isAvailable ? '#1a1a2e' : 'white',
                        padding: '0.25rem 0.5rem',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={() => setHoveredMovieId(movie.id)}
                      onMouseLeave={() => setHoveredMovieId(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/movies/${movie.id}`);
                      }}
                    >
                      {isAvailable ? 'Tickets' : 'More Info'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
     <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button
                  className="page-link"
                  style={{
                    backgroundColor: currentPage === i + 1 ? '#ebd0ad' : 'white',
                    color: currentPage === i + 1 ? '#1a1a2e' : '#000',
                    border: '1px solid #ccc'
                  }}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default IndexPage;