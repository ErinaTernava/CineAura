import React from 'react';
import { FiSave } from 'react-icons/fi';

const HallForm = ({ formData = {}, setFormData, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(formData);
    }}>
      <div className="mb-3">
        <label className="form-label" style={{ color: '#ebd0ad' }}>Hall Name</label>
        <input
          type="text"
          name="hallName"
          value={formData.hallName || ''}
          onChange={handleChange}
          className="form-control bg-dark text-white border-secondary"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label" style={{ color: '#ebd0ad' }}>Hall Type</label>
        <select
          name="hallType"
          value={formData.hallType || ''}
          onChange={(e) => {
            const hallType = e.target.value;
            setFormData({
              ...formData,
              hallType,
              capacityOfSeats: hallType === '2D' ? 66 : 56
            });
          }}
          className="form-select bg-dark text-white border-secondary"
          required
        >
          <option value="">Select Type</option>
          <option value="2D">2D (66 seats)</option>
          <option value="3D">3D (56 seats)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label" style={{ color: '#ebd0ad' }}>Capacity</label>
        <input
          type="number"
          name="capacityOfSeats"
          value={formData.capacityOfSeats || ''}
          readOnly
          className="form-control bg-dark text-white border-secondary"
        />
        <small className="text-muted">
          {formData.hallType === '2D' 
            ? 'Standard capacity: 66 seats' 
            : formData.hallType === '3D' 
              ? 'Premium capacity: 56 seats'
              : 'Capacity will auto-set based on hall type'}
        </small>
      </div>

      <button
        type="submit"
        className="btn w-100"
        style={{ backgroundColor: '#ebd0ad', color: '#1a1a2e' }}
      >
        <FiSave className="me-2" />
        Save Hall
      </button>
    </form>
  );
};

export default HallForm;