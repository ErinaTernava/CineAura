import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
  const navigate = useNavigate();

  const [hoverCart, setHoverCart] = React.useState(false);
const [hoverHome, setHoverHome] = React.useState(false);

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
          onMouseEnter={() => setHoverCart(true)}
          onMouseLeave={() => setHoverCart(false)}
          style={{
            padding: '12px 24px',
             backgroundColor: hoverCart ? '#d4b68a' : '#ebd0ad',
            color: hoverCart ? '#1a1a1a' : '#333',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          View Cart
        </button>
        
        <button
          onClick={() => navigate('/')}
           onMouseEnter={() => setHoverHome(true)}
          onMouseLeave={() => setHoverHome(false)}
          style={{
            padding: '12px 24px',
            backgroundColor: hoverHome ? '#d4b68a' : '#ebd0ad',
            color: hoverHome ? '#1a1a1a' : '#333',
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