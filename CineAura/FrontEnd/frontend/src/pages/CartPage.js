import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthToken from '../hooks/useAuthToken';
import { jwtDecode } from 'jwt-decode';

const CartPage = () => {
  const { token } = useAuthToken();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [temporaryTickets, setTemporaryTickets] = useState([]);

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

  useEffect(() => {
    if (state?.tickets) {
      setTemporaryTickets(state.tickets);
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      setLoading(true);
      setError(null);

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
        const response = await fetch(`http://localhost:5283/api/Cart/user?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.status === 404) {
          const createResponse = await fetch(`http://localhost:5283/api/Cart/create?userId=${userId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          });
          
          if (!createResponse.ok) {
            throw new Error('Error creating cart');
          }
          
          const newCart = await createResponse.json();
          setCart(newCart);
        } else if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching cart: ${response.status} - ${errorText}`);
        } else {
          const cartData = await response.json();
          setCart(cartData);
        }
      } catch (err) {
        console.error('Error in fetchCart:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token, navigate, state]);

  const handleRemoveTicket = async (ticketId) => {
    try {
      if (temporaryTickets.length > 0) {
        setTemporaryTickets(prev => prev.filter(t => 
          t.seatId !== ticketId
        ));
        return;
      }

      if (!cart?.id) {
        throw new Error('No cart available');
      }

      const response = await fetch(`http://localhost:5283/api/CartTicket/remove?ticketId=${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to remove ticket: ${errorText}`);
      }

      setCart(prevCart => ({
        ...prevCart,
        cartTickets: prevCart.cartTickets.filter(ticket => ticket.id !== ticketId),
      }));
    } catch (err) {
      console.error('Error removing ticket:', err);
      setError(err.message);
    }
  };

  const handleCheckout = async () => {
    try {
      if (temporaryTickets.length > 0) {
        const userId = getUserId();
        if (!userId) {
          throw new Error('User not identified');
        }

        const createResponse = await fetch(`http://localhost:5283/api/Cart/create?userId=${userId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        
        if (!createResponse.ok) {
          throw new Error('Error creating cart');
        }
        
        const newCart = await createResponse.json();

        for (const ticket of temporaryTickets) {
          const addResponse = await fetch(`http://localhost:5283/api/CartTicket/add`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cartId: newCart.id,
              seatId: ticket.seatId,
              showtimeId: ticket.showtimeId,
              price: ticket.price
            })
          });

          if (!addResponse.ok) {
            throw new Error('Error adding ticket to cart');
          }
        }

        const paymentResponse = await fetch(`http://localhost:5283/api/Cart/pay?cartId=${newCart.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!paymentResponse.ok) {
          const errorText = await paymentResponse.text();
          throw new Error(`Payment failed: ${errorText}`);
        }

        navigate('/payment-success');
        return;
      }

      if (!cart?.id) {
        throw new Error('No cart available for checkout');
      }

      const response = await fetch(`http://localhost:5283/api/Cart/pay?cartId=${cart.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Payment failed: ${errorText}`);
      }

      navigate('/payment-success');
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message);
    }
  };

  const getTicketsToDisplay = () => {
    if (temporaryTickets.length > 0) {
      return temporaryTickets.map(ticket => ({
        id: ticket.seatId,
        movie: ticket.movieTitle,
        showtime: ticket.showtime,
        hall: ticket.hallName,
        seat: `${ticket.row}${ticket.position}`,
        price: ticket.price,
        type: ticket.type || 'regular',
        movieId: ticket.movieId,
        showtimeId: ticket.showtimeId,
        hallId: ticket.hallId
      }));
    }
  
    if (cart?.cartTickets) {
      return cart.cartTickets.map(ticket => ({
        id: ticket.id,
        movie: ticket.showtime?.movie?.title || 'Unknown Movie',
        showtime: ticket.showtime?.startTime ? 
          new Date(ticket.showtime.startTime).toLocaleString() : 'Unknown Time',
        hall: ticket.showtime?.hall?.hallName || 'Unknown Hall',
        seat: ticket.seat?.number || 'Unknown Seat',
        price: ticket.price,
        type: ticket.type || 'regular',
        movieId: ticket.showtime?.movieId,
        showtimeId: ticket.showtimeId,
        hallId: ticket.showtime?.hallId
      }));
    }
  
    return [];
  };

  const calculateTotal = () => {
    const tickets = getTicketsToDisplay();
    return tickets.reduce((sum, ticket) => sum + ticket.price, 0);
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
            <p>Price: ${ticket.price.toFixed(2)}</p>
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
        <button 
          style={{
            padding: '10px 20px',
            backgroundColor: '#ebd0ad',
            color: '#1a1a2e',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onClick={handleCheckout}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;