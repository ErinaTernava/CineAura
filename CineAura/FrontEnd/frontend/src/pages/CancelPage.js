import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        color: '#ebd0ad',
        fontSize: '80px',
        marginBottom: '20px'
      }}>✕</div>
      
      <h1 style={{ marginBottom: '16px',color:'white' }}>Payment Cancelled</h1>
      
      <p style={{ 
        color: '#666',
        marginBottom: '32px',
        fontSize: '18px'
      }}>
        Your payment was not completed. Your cart items have been saved.
      </p>
      
      <div style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => navigate('/cart')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#ebd0ad',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          View Cart
        </button>
        
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#ebd0ad',
            color: '#333',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default CancelPage;