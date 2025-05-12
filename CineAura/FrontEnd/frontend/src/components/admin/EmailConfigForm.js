import React, { useState } from 'react';
import { FiSave, FiX } from 'react-icons/fi';

const EmailConfigForm = ({ existingConfig, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    senderEmail: existingConfig?.senderEmail || '',
    displayName: existingConfig?.displayName || '',
    smtpHost: existingConfig?.smtpHost || '',
    port: existingConfig?.port || 587,
    enableSsl: existingConfig?.enableSsl || true,
    encryptedPassword: ''
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    if (!formData.senderEmail || !formData.smtpHost || !formData.port) {
      setError('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const url = existingConfig 
        ? `http://localhost:5283/api/EmailConfig/update?id=${existingConfig.id}`
        : 'http://localhost:5283/api/EmailConfig/create';

      const method = existingConfig ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          port: Number(formData.port)
        })
      });

      const responseText = await response.text();
      let responseData = {};
      
      try {
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (err) {
        console.error('JSON parse error:', err);
        throw new Error('Invalid server response');
      }

      if (!response.ok) {
        throw new Error(responseData.message || 'Request failed');
      }

      onSuccess(responseData);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card" style={{ 
      backgroundColor: '#0b1214',
      border: '1px solid #2c3e50',
      borderRadius: '8px',
      padding: '20px'
    }}>
      <h5 style={{ color: '#ebd0ad', marginBottom: '20px' }}>
        {existingConfig ? 'Edit Configuration' : 'Create Configuration'}
      </h5>

      {error && (
        <div className="alert alert-danger mb-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label" style={{ color: '#ebd0ad' }}>Sender Email*</label>
            <input
              type="email"
              name="senderEmail"
              value={formData.senderEmail}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: '#ebd0ad' }}>Display Name*</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label" style={{ color: '#ebd0ad' }}>SMTP Host*</label>
            <input
              type="text"
              name="smtpHost"
              value={formData.smtpHost}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              required
              placeholder="smtp.example.com"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: '#ebd0ad' }}>Port*</label>
            <input
              type="number"
              name="port"
              value={formData.port}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              required
              min="1"
              max="65535"
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label" style={{ color: '#ebd0ad' }}>
              Password{!existingConfig && '*'}
            </label>
            <input
              type="password"
              name="encryptedPassword"
              value={formData.encryptedPassword}
              onChange={handleChange}
              className="form-control bg-dark text-white border-secondary"
              required={!existingConfig}
              placeholder={existingConfig ? 'Leave blank to keep current' : ''}
            />
          </div>
          <div className="col-md-6 d-flex align-items-end">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="enableSsl"
                checked={formData.enableSsl}
                onChange={handleChange}
                id="enableSsl"
              />
              <label className="form-check-label" htmlFor="enableSsl" style={{ color: '#ebd0ad' }}>
                Enable SSL
              </label>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="btn btn-outline-secondary me-2"
          >
            <FiX className="me-1" />
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-warning"
            style={{ minWidth: '120px' }}
          >
            {isSubmitting ? (
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
            ) : (
              <FiSave className="me-1" />
            )}
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailConfigForm;