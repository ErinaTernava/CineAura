import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShowtimeForm from '../../components/admin/ShowtimeForm';

const EditShowtimePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showtime, setShowtime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    fetchShowtime();
    fetchMovies();
    fetchHalls();
  }, [id]);

  const fetchShowtime = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5283/api/Showtime/getbyid?id=${id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      console.log("Showtime API response:", response.data);

      const raw = response.data;

      const formattedStartTime = raw.startTime
        ? new Date(raw.startTime).toISOString().slice(0, 16)
        : '';

      setShowtime({
        ...raw,
        MovieId: raw.movieId?.toString(),
        HallId: raw.hallId?.toString(),
        StartTime: formattedStartTime,
        TicketPrice: raw.ticketPrice?.toString() || ''
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await axios.get('http://localhost:5283/api/Movie/getAll', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      const mappedMovies = res.data.map(movie => ({
        Id: movie.id,
        Title: movie.title
      }));
      setMovies(mappedMovies);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    }
  };

  const fetchHalls = async () => {
    try {
      const res = await axios.get('http://localhost:5283/api/Hall/getAll', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      const mappedHalls = res.data.map(hall => ({
        Id: hall.id,
        Name: hall.hallName
      }));
      setHalls(mappedHalls);
    } catch (err) {
      console.error('Failed to fetch halls:', err);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await axios.put(
        `http://localhost:5283/api/Showtime/update?id=${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      navigate('/admin/showtimes');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading || !showtime || movies.length === 0 || halls.length === 0) {
    return <div className="text-center py-5 text-light">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: '#ebd0ad' }}>Edit Showtime</h2>
      <ShowtimeForm
        formData={showtime}
        setFormData={setShowtime}
        handleSubmit={handleSubmit}
        movies={movies}
        halls={halls}
      />
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default EditShowtimePage;
