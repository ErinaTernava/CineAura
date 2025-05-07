import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieForm from '../../components/admin/MovieForm';

const AddMoviePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    releaseDate: '',
    endDate: '',
    genreId: '',
    photo: null
  });

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

  const handleSubmit = async (formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Title', formData.title);
      formDataToSend.append('Description', formData.description);
      formDataToSend.append('Duration', formData.duration);
      formDataToSend.append('ReleaseDate', formData.releaseDate);
      formDataToSend.append('EndDate', formData.endDate);
      formDataToSend.append('GenreId', formData.genreId);
      formDataToSend.append('Photo', formData.photo);

      const response = await axios.post(
        'http://localhost:5283/api/Movie/save',
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        navigate('/admin/movies');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: '#ebd0ad' }}>Add New Movie</h2>
      <MovieForm 
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        genres={staticGenres}
      />
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AddMoviePage;
