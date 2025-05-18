import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../../components/admin/MovieCard'; 
import DeleteMovieModal from '../../components/admin/DeleteMovieModal'; 

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5283/api/Movie/getAll', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMovies(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleDelete = (id) => {
    setMovieIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5283/api/Movie/delete?id=${movieIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMovies(movies.filter(movie => movie.id !== movieIdToDelete));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setShowDeleteModal(false);
      setMovieIdToDelete(null);
    }
  };

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#ebd0ad' }}>Movie Management</h2>
        <Link to="/admin/add-movie" className="btn" style={{ backgroundColor: '#ebd0ad', color: '#1a1a2e' }}>
          Add New Movie
        </Link>
      </div>

      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {movies.map(movie => (
          <div 
            key={movie.id} 
            style={{ flex: '1 1 300px', maxWidth: '400px' }}
          >
            <MovieCard movie={movie} onDelete={() => handleDelete(movie.id)} />
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <DeleteMovieModal 
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default MoviesPage;