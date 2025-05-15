import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieForm from '../../components/admin/MovieForm';

const EditMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieAndGenres = async () => {
      try {
        const [movieRes, genresRes] = await Promise.all([
          axios.get(`http://localhost:5283/api/Movie/getbyid?id=${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          axios.get(`http://localhost:5283/api/Movie/genres`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);

        setMovie(movieRes.data);
        setGenres(genresRes.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndGenres();
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
          }
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
        genres={genres}
      />
    </div>
  );
};

export default EditMoviePage;
