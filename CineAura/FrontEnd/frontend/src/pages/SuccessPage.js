import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

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
      }}>✓</div>
      
      <h1 style={{ marginBottom: '16px',color:'white' }}>Payment Successful!</h1>
      
      <p style={{ 
        color: '#666',
        marginBottom: '32px',
        fontSize: '18px'
      }}>
        Thank you for your purchase.
      </p>
      
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '12px 24px',
          backgroundColor: isHovered ? '#d6b889' : '#ebd0ad', 
          color: isHovered ? 'black' : 'black',
          font:'bold',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={() => setIsHovered(true)}  
        onMouseLeave={() => setIsHovered(false)} 
      >
        Return to Home Page
      </button>
    </div>
  );
};

export default SuccessPage;