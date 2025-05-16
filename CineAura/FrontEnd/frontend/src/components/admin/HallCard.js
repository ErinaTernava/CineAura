import React, {useState} from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HallCard = ({ hall, onDelete }) => {
  const navigate = useNavigate();

  const [isEditHovered, setEditHovered] = useState(false);
  const [isDeleteHovered, setDeleteHovered] = useState(false);


  const getStatusColor = (hallType) => {
    return hallType === '3D' ? '#9b59b6' : '#3498db'; 
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hall?')) {
        const response = await axios.delete(`http://localhost:5283/api/Hall/delete?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
          },
        });    
        window.location.reload();        
    }
  };

  return (
    <div className="card h-100" style={{ 
      backgroundColor: '#0b1214',
      border: '1px solid #2c3e50',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
    }}>
      <div style={{ 
        height: '220px', 
        backgroundColor: getStatusColor(hall.hallType),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #2c3e50',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          {hall.hallType}
        </h2>
      </div>
      
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title" style={{ 
            color: '#ebd0ad',
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
            {hall.hallName}
          </h5>
          <span style={{
            backgroundColor: getStatusColor(hall.hallType),
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: '500',
            marginTop: '4px'
          }}>
            {hall.hallType}
          </span>
        </div>
        
        <div className="mb-3">
          <p style={{ 
            color: '#6c757d',
            fontSize: '0.9rem',
            marginBottom: '4px'
          }}>
            Capacity
          </p>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="flex-grow-1" style={{
              height: '8px',
              backgroundColor: '#2c3e50',
              borderRadius: '4px',
              overflow: 'hidden',
              minWidth: '150px'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: getStatusColor(hall.hallType),
                borderRadius: '4px'
              }}></div>
            </div>
            <span style={{
              color: '#ebd0ad',
              fontWeight: '500',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap'
            }}>
              {hall.capacityOfSeats} seats
            </span>
          </div>
        </div>
      </div>

      
       <div className="card-footer bg-transparent border-top-0 d-flex flex-wrap gap-2 justify-content-between">
        <button 
          onClick={() => navigate(`/admin/halls/edit/${hall.id}`)}
          onMouseEnter={() => setEditHovered(true)}
          onMouseLeave={() => setEditHovered(false)}
          className="btn btn-sm"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: isEditHovered ? '#ebd0ad' : 'transparent',
            color: isEditHovered ? '#0b1214' : '#ebd0ad',
            border: '1px solid #ebd0ad',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
          }}
        >
          <FiEdit2 style={{ marginRight: '6px' }} />
          Edit
        </button>
        
       <button 
          onClick={() => handleDelete(hall.id)}
           onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
          className="btn btn-sm"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: isDeleteHovered ? '#e74c3c' : 'transparent',
            color: isDeleteHovered ? '#fff' : '#e74c3c',
            border: '1px solid #e74c3c',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
          }}
        >
          <FiTrash2 style={{ marginRight: '6px' }} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default HallCard;
