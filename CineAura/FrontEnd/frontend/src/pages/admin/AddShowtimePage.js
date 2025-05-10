import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShowtimeForm from '../../components/admin/ShowtimeForm';

const AddShowtimePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);

  const [formData, setFormData] = useState({
    Id: '',
    MovieId: '',
    HallId: '',
    StartTime: '',
    TicketPrice: ''
  });

  
    useEffect(() => {
    fetchMovies();
    fetchHalls();
  }, []);

 
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
     console.log('Fetched Halls from API:', res.data);
    const mappedHalls = res.data.map(hall => ({
      Id: hall.id,
      Name: hall.hallName
    }));
    setHalls(mappedHalls);
  } catch (err) {
    console.error('Failed to fetch halls:', err);
  }
};


   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handleSubmit = async (formData) => {
  try {
    const payload = {
      Id: 0, 
      MovieId: parseInt(formData.MovieId),
      HallId: parseInt(formData.HallId),
      StartTime: formData.StartTime,
      TicketPrice: parseFloat(formData.TicketPrice)
    };

    console.log("Payload:", payload); 

    await axios.post('http://localhost:5283/api/Showtime/save', payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    alert('Showtime created successfully!');
  } catch (err) {
    console.error('Failed to create showtime:', err);
  }
};



  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: '#ebd0ad' }}>Add New Showtime</h2>
      <ShowtimeForm 
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit} 
        movies={movies}
        halls={halls} 
      />
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AddShowtimePage;