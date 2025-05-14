import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HallCard from '../../components/admin/HallCard'; 

const HallsPage = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await axios.get('http://localhost:5283/api/Hall/getAll', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setHalls(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHalls();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hall?')) {
      try {
        await axios.delete(`http://localhost:5283/api/Hall/delete?id=${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setHalls(halls.filter(hall => hall.id !== id));
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#ebd0ad' }}>Hall Management</h2>
        <Link to="/admin/add-hall" className="btn" style={{ backgroundColor: '#ebd0ad', color: '#1a1a2e' }}>
          Add New Hall
        </Link>
      </div>

        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {halls.map(hall => (
            <div 
              key={hall.id} 
              style={{ flex: '1 1 300px', maxWidth: '400px' }}
            >
          <HallCard hall={hall} onDelete={handleDelete} />
          </div>
         ))}
        </div>
    </div>
  );
};

export default HallsPage;