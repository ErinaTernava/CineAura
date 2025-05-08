import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HallForm from '../../components/admin/HallForm';

const AddHallPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    hallName: '',
    hallType: '',
    seatLayout: ''
  });

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        'http://localhost:5283/api/Hall/save',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        navigate('/admin/halls');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: '#ebd0ad' }}>Add New Hall</h2>
      <HallForm 
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AddHallPage;