import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiMail } from 'react-icons/fi';
import EmailConfigForm from '../../components/admin/EmailConfigForm';

const EmailConfigPage = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const fetchConfig = async () => {
    try {
      const response = await fetch('http://localhost:5283/api/EmailConfig/get', {
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        if (response.status === 404) {
          setConfig(null); 
          return;
        }
        throw new Error(responseText || 'Failed to fetch configuration');
      }

      const data = responseText ? JSON.parse(responseText) : null;
      setConfig(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this configuration?')) return;
    
    try {
      const response = await fetch(`http://localhost:5283/api/EmailConfig/delete?id=${config.id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.text();
      if (!response.ok) throw new Error(result || 'Delete failed');

      setConfig(null);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateSuccess = (updatedConfig) => {
    setConfig(updatedConfig);
    setEditMode(false);
    fetchConfig(); 
  };
  
  const handleTestConfiguration = async () => {
  try {
    const response = await fetch('http://localhost:5283/api/EmailConfig/test', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    const resultText = await response.text();
    const result = resultText ? JSON.parse(resultText) : {};

    if (!response.ok) {
      throw new Error(result.message || 'Test failed');
    }

    alert('Email configuration is valid! Test succeeded.');
  } catch (err) {
    alert(`Test failed: ${err.message}`);
  }
};


  if (loading) return <div className="text-center py-5" style={{ color: '#ebd0ad' }}>Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: '#ebd0ad' }}>
        <FiMail className="me-2" />
        Email Configuration
      </h2>

      {!config && !editMode ? (
        <div className="card" style={{ 
          backgroundColor: '#0b1214',
          border: '1px solid #2c3e50',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h5 style={{ color: '#ebd0ad', marginBottom: '20px' }}>No configuration found</h5>
          <button
            onClick={() => setEditMode(true)}
            style={{
              padding: '10px 15px',
              backgroundColor: '#ebd0ad',
              color: '#1a1a2e',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Create Configuration
          </button>
        </div>
      ) : editMode ? (
        <EmailConfigForm 
          existingConfig={config} 
          onSuccess={handleUpdateSuccess} 
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <div className="card" style={{ 
          backgroundColor: '#0b1214',
          border: '1px solid #2c3e50',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <div className="d-flex justify-content-between align-items-start mb-4">
            <h5 style={{ color: '#ebd0ad' }}>Current Configuration</h5>
            <div className="d-flex flex-column align-items-start gap-2">
              <button 
                onClick={() => setEditMode(true)}
                className="btn btn-outline-warning me-2"
              >
                <FiEdit2 className="me-1" />
                Edit
              </button>
              <button 
                onClick={handleDelete}
                className="btn btn-outline-danger"
              >
                <FiTrash2 className="me-1" />
                Delete
              </button>
               <button 
                 onClick={handleTestConfiguration}
                 className="btn btn-outline-info"
              >
                <FiMail className="me-1" />
                Test
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label style={{ color: '#d1d5db' }}>Sender Email</label>
              <p style={{ color: '#ebd0ad' }}>{config.senderEmail}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label style={{ color: '#d1d5db' }}>Display Name</label>
              <p style={{ color: '#ebd0ad' }}>{config.displayName}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label style={{ color: '#d1d5db' }}>SMTP Host</label>
              <p style={{ color: '#ebd0ad' }}>{config.smtpHost}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label style={{ color: '#d1d5db' }}>Port</label>
              <p style={{ color: '#ebd0ad' }}>{config.port}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label style={{ color: '#d1d5db' }}>SSL Enabled</label>
              <p style={{ color: '#ebd0ad' }}>{config.enableSsl ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailConfigPage;