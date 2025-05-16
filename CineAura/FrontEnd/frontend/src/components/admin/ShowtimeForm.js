import React, { useState } from 'react';
import { FiSave } from 'react-icons/fi';

const ShowtimeForm = ({ formData = {}, setFormData, handleSubmit, movies , halls }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(formData);
    }}>
      
      <div className="mb-3">
        <label className="form-label" style={{ color: '#ebd0ad' }}>Select Movie</label>
        <select
         name="MovieId"
          value={formData.MovieId?.toString() || ''}
          onChange={handleChange}
          className="form-select bg-dark text-white border-secondary"
         required
        >
  <option value="">Choose movie</option>
  {movies.map(Movie => (
    <option key={Movie.Id} value={Movie.Id}>{Movie.Title}</option>
  ))}
</select>

      </div>

      <div className="mb-3">
        <label className="form-label" style={{ color: '#ebd0ad' }}>Select Hall</label>
        <select
          name="HallId"
          value={formData.HallId?.toString() || ''}
          onChange={handleChange}
          className="form-select bg-dark text-white border-secondary"
          required
        >       
  <option value="">Choose hall</option>
  {halls.map(Hall => (
    <option key={Hall.Id} value={Hall.Id}>{Hall.Name}</option>
  ))}
</select>

      </div>

      <div className="mb-3">
        <label className="form-label" style={{ color: '#ebd0ad' }}>Showtime Date and Time</label>
        <input
          type="datetime-local"
          name="StartTime"
          value={formData.StartTime || ''}
          onChange={handleChange}
          className="form-control bg-dark text-white border-secondary"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label" style={{ color: '#ebd0ad' }}>Ticket Price (€)</label>
        <input
          type="number"
          name="TicketPrice"
          value={formData.TicketPrice || ''}
          onChange={handleChange}
          className="form-control bg-dark text-white border-secondary"
          required
        />
      </div>

      <button
        type="submit"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="btn w-100"
        style={{  backgroundColor: isHovered ? '#d4b77c' : '#ebd0ad', 
          color: '#1a1a2e', 
          transition: 'background-color 0.3s ease' 
        }}
      >
        <FiSave className="me-2" />
        Save Showtime
      </button>
    </form>
  );
};

export default ShowtimeForm;
