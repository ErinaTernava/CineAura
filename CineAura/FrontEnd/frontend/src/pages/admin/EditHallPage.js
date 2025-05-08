import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HallForm from '../../components/admin/HallForm';

const EditHallPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hall, setHall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHall = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5283/api/Hall/getbyid?id=${id}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setHall(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHall();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:5283/api/Hall/update?id=${id}`,
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

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!hall) return <div className="alert alert-danger">Hall not found</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: '#ebd0ad' }}>Edit Hall</h2>
      <HallForm 
        formData={hall}
        setFormData={setHall}
        handleSubmit={handleSubmit}
      />
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default EditHallPage;