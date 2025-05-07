import React, { useEffect, useState } from 'react';
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
    <div>
      <h2 className="mb-4" style={{ color: '#ebd0ad' }}>Manage Movies</h2>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {movies.map(movie => (
          <div key={movie.id} className="col">
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