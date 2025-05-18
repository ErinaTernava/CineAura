import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthToken from '../../hooks/useAuthToken';
import MovieCard from '../../components/admin/MovieCard';

const MoviesPage = () => {
  const { token } = useAuthToken();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5283/api/Movie/getAll', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    
    try {
      const response = await fetch(`http://localhost:5283/api/Movie/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to delete movie');
      
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center py-5">Loading movies...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
     <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#ebd0ad' }}>Movie Management</h2>
        <Link to="/admin/add-movie" className="btn" style={{ backgroundColor: '#ebd0ad', color: '#1a1a2e' }}>
          Add New Movie
        </Link>
      </div>
    
      <div className="row g-4" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        padding: '0 1rem'
      }}>
       {movies.map(movie => (
          <div key={movie.id} style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <MovieCard 
              movie={movie}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;