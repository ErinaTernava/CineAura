import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5283/api/Movie/search?query=${query}`);
        setResults(response.data);
      } catch (err) {
        setError('Failed to fetch search results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border" style={{ color: '#ebd0ad' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p style={{ color: '#ebd0ad' }}>Loading search results...</p>
    </div>
  );

  if (error) return (
    <div className="container py-4">
      <div className="alert alert-danger">Error: {error}</div>
    </div>
  );

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4" style={{ color: '#ebd0ad' }}>Search Results for "{query}"</h1>

      {results.length === 0 ? (
        <p style={{ color: '#ebd0ad' }}>No movies found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {results.map(movie => {
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
                  style={{ cursor: 'pointer', backgroundColor: '#0b1214', border: '1px solid #2c3e50' }}
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
                          backgroundColor: isAvailable ? '#ebd0ad' : '#6c757d',
                          color: isAvailable ? '#1a1a2e' : 'white',
                          padding: '0.25rem 0.5rem'
                        }}
                        onClick= {() => navigate(`/movies/${movie.id}`)
                        }
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
      )}
    </div>
  );
};

const getMovieStatus = (releaseDate, endDate) => {
  const today = new Date();
  const release = new Date(releaseDate);
  const end = new Date(endDate);

  if (today < release) return 'Coming Soon';
  if (today > end) return 'Expired';
  return 'Available';
};

export default SearchResultsPage;
