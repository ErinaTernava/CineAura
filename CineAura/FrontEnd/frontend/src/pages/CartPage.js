import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthToken from '../hooks/useAuthToken';
import { jwtDecode } from 'jwt-decode';
import { loadStripe } from '@stripe/stripe-js';


const CartPage = () => {
  const { token } = useAuthToken();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [temporaryTickets, setTemporaryTickets] = useState([]);
  const [cartTickets, setCartTickets] = useState([]);
  const [stripe, setStripe] = useState(null); 

  const getUserId = () => {
    if (!token) return null;
    
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) return storedUserId;
  
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.nameid || decodedToken.sub || decodedToken.id || decodedToken.userId || null;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  };

  const fetchUserTickets = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5283/api/Ticket/ticketbyuser?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user tickets');
      }
      
      const ticketsData = await response.json();
      return ticketsData.map(ticket => ({
        id: ticket.id,
        movie: ticket.movieTitle,
        hall: ticket.hallName,
        showtime: ticket.showtimeStartTime ? 
          new Date(ticket.showtimeStartTime).toLocaleString() : 'Unknown Time',
        seat: `${ticket.seatRow}${ticket.seatNumber}`,
        price: ticket.ticketPrice || 0,
        type: 'regular'
      }));
      
    } catch (err) {
      console.error('Error fetching user tickets:', err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (state?.tickets) {
        setTemporaryTickets(state.tickets);
        setLoading(false);
        return;
      }

      if (!token) {
        setLoading(false);
        navigate('/login', { state: { from: '/cart' } });
        return;
      }

      const userId = getUserId();
      if (!userId) {
        setError('Unable to identify user. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const userTickets = await fetchUserTickets(userId);
        setCartTickets(userTickets);

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const loadStripeInstance = async () => {
      const stripeInstance = await loadStripe('pk_test_51RKmRI2UNUC7EBJS2QfsKLle0a1utXhhgNvxYog1cN0CuHLWkS3WsfHPGO2Ust0NDyeTHGL8NVLhWHQiNH9QQI0f00t8fHz0Pv');
      setStripe(stripeInstance);
    };

    loadStripeInstance();
  }, [token, navigate, state]);

  const handleRemoveTicket = async (ticketId) => {
    try {
      if (temporaryTickets.length > 0) {
        setTemporaryTickets(prev => prev.filter(t => t.seatId !== ticketId));
      } else {
        const response = await fetch(`http://localhost:5283/api/Ticket/remove?ticketId=${ticketId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to remove ticket: ${errorText}`);
        }
  
        setCartTickets(prev => prev.filter(t => t.id !== ticketId));
          const userId = getUserId();
        if (userId) {
          const userTickets = await fetchUserTickets(userId);
          setCartTickets(userTickets);
        }
      }
    } catch (err) {
      console.error('Error removing ticket:', err);
      setError(err.message);
    }
  };

  const getTicketsToDisplay = () => {
    if (temporaryTickets.length > 0) {
      return temporaryTickets.map(ticket => ({
        id: ticket.seatId,
        movie: ticket.movieTitle,
        hall: ticket.hallName,
        showtime: ticket.showtime,
        seat: `${ticket.row}${ticket.position}`,
        price: ticket.price || 0,
        type: 'regular'
      }));
    }
    
    return cartTickets;
  };

  const calculateTotal = () => {
    const tickets = getTicketsToDisplay();
    return tickets.reduce((sum, ticket) => sum + (ticket.price || 0), 0);
  };

   const handleProceedToPayment = async () => {
    const userId = getUserId();
    if (!userId) {
      alert('Please log in first.');
      return;
    }

    try {
      const userId = getUserId();
      const response = await fetch(`http://localhost:5283/api/Payment/create-checkout-session?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId })
      });
       if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();
      const sessionUrl = data.url;

      window.location.href = sessionUrl;
    } catch (err) {
      console.error('Error initiating payment:', err);
      setError('Failed to initiate payment.');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" style={{ color: '#ebd0ad' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ color: '#ebd0ad' }}>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
        <h2>Error</h2>
        <p>{error}</p>
        {!token && (
          <button 
            style={{
              padding: '8px 16px',
              backgroundColor: '#ebd0ad',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        )}
        {token && (
          <button 
            style={{
              padding: '8px 16px',
              backgroundColor: '#ebd0ad',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (!token) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
        <h2>Please log in to view your cart</h2>
        <button 
          style={{
            padding: '8px 16px',
            backgroundColor: '#ebd0ad',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    );
  }

  const ticketsToDisplay = getTicketsToDisplay();

  if (ticketsToDisplay.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
        <h2>Your cart is empty</h2>
        <p>No tickets have been selected yet.</p>
        <button 
          style={{
            padding: '8px 16px',
            backgroundColor: '#ebd0ad',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          Browse Movies
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', color: 'white' }}>
      <h1 style={{ color: '#ebd0ad', textAlign: 'center', marginBottom: '30px' }}>Your Cart</h1>
      
      <div style={{ marginTop: '20px' }}>
        {ticketsToDisplay.map(ticket => (
          <div key={ticket.id} 
               style={{
                 padding: '15px',
                 marginBottom: '15px',
                 border: '1px solid #2c3e50',
                 borderRadius: '5px',
                 backgroundColor: '#1a252f'
               }}>
            <h3 style={{ color: '#ebd0ad' }}>{ticket.movie}</h3>
            <p>Hall: {ticket.hall}</p>
            <p>Showtime: {ticket.showtime}</p>
            <p>Seat: {ticket.seat}</p>
            <p>Price: ${(ticket.price || 0).toFixed(2)}</p>
            <button
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => handleRemoveTicket(ticket.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: '#1a252f',
        borderRadius: '5px',
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0 }}>Total: ${calculateTotal().toFixed(2)}</h3>
        <button onClick={handleProceedToPayment}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ebd0ad',
            color: '#1a1a2e',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;