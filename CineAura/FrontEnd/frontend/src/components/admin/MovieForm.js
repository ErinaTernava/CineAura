import React from 'react';
import { FiSave } from 'react-icons/fi';

const MovieForm = ({ formData = {}, setFormData, handleSubmit, genres = [] }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1]; 
      setFormData({ ...formData, photo: base64String });
    };
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(formData);
    }}>
      <div className="mb-3">
        <label className="form-label" style={{ color: '#ebd0ad' }}>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="form-control bg-dark text-white border-secondary"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label" style={{ color: '#ebd0ad' }}>Description</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="form-control bg-dark text-white border-secondary"
          required
          rows="3"
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label" style={{ color: '#ebd0ad' }}>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration || ''}
            onChange={handleChange}
            className="form-control bg-dark text-white border-secondary"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" style={{ color: '#ebd0ad' }}>Genre</label>
          <select
            name="genreId"
            value={formData.genreId || ''}
            onChange={handleChange}
            className="form-select bg-dark text-white border-secondary"
            required
          >
            <option value="">Select Genre</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.genreName}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label" style={{ color: '#ebd0ad' }}>Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate || ''}
            onChange={handleChange}
            className="form-control bg-dark text-white border-secondary"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" style={{ color: '#ebd0ad' }}>End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate || ''}
            onChange={handleChange}
            className="form-control bg-dark text-white border-secondary"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label" style={{ color: '#ebd0ad' }}>Movie Poster</label>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="form-control bg-dark text-white border-secondary"
          accept="image/*"
          required={!formData.photo}
        />
        {formData.photo && typeof formData.photo === 'string' && (
          <div className="mt-2">
            <img 
              src={`data:image/jpeg;base64,${formData.photo}`} 
              alt="Current poster" 
              style={{ maxHeight: '150px' }} 
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn w-100"
        style={{ backgroundColor: '#ebd0ad', color: '#1a1a2e' }}
      >
        <FiSave className="me-2" />
        Save Movie
      </button>
    </form>
  );
};

export default MovieForm;