import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieForm from '../../components/admin/MovieForm';

const EditMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const staticGenres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Sci-Fi' },
    { id: 4, name: 'Horror' },
    { id: 5, name: 'Romance' },
    { id: 6, name: 'Thriller' },
    { id: 7, name: 'Drama' },
    { id: 8, name: 'Fantasy' },
    { id: 9, name: 'Animation' },
    { id: 10, name: 'Documentary' }
  ];

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5283/api/Movie/getbyid?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMovie(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:5283/api/Movie/update?id=${id}`,
        {
          title: formData.title,
          description: formData.description,
          duration: parseInt(formData.duration),
          releaseDate: formData.releaseDate,
          endDate: formData.endDate,
          genreId: parseInt(formData.genreId),
          photo: formData.photo || null, 
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data) {
        navigate('/admin/movies');
      } else {
        setError('Failed to update movie');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!movie) return <div className="alert alert-danger">Movie not found</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: '#ebd0ad' }}>Edit Movie</h2>
      <MovieForm 
        formData={{
          title: movie.title,
          description: movie.description,
          duration: movie.duration,
          releaseDate: movie.releaseDate?.split('T')[0] || '',
          endDate: movie.endDate?.split('T')[0] || '',
          genreId: movie.genreId,
          photo: movie.photo
        }}
        setFormData={(newData) => setMovie({ ...movie, ...newData })}
        handleSubmit={handleSubmit}
        genres={staticGenres}
      />
    </div>
  );
};

export default EditMoviePage;