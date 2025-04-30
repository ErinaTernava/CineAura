import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthToken from '../hooks/useAuthToken';
import { jwtDecode } from 'jwt-decode';

const CartPage = () => {
  const { token } = useAuthToken();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(`Fetching cart for user ID: ${userId}`);

        const response = await fetch(`http://localhost:5283/api/Cart/user?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.status === 404) {
          console.log('Cart not found, creating new cart...');
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
  }, [token, navigate]);

  const handleRemoveTicket = async (ticketId) => {
    try {
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
    if (!cart?.id) {
      setError('No cart available for checkout');
      return;
    }

    try {
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
      <div className="container py-4">
        <div className="alert alert-danger">
          Error: {error}
          {!token && (
            <button 
              className="btn btn-sm btn-outline-secondary ms-3"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )}
          {token && (
            <button 
              className="btn btn-sm btn-outline-secondary ms-3"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning">
          Please log in to view your cart.
          <button 
            className="btn btn-sm btn-outline-primary ms-3"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (!cart || !cart.cartTickets || cart.cartTickets.length === 0) {
    return (
      <div className="container py-4">
        <div className="alert alert-info">
          Your cart is empty.
          <button 
            className="btn btn-sm btn-outline-primary ms-3"
            onClick={() => navigate('/')}
          >
            Browse Movies
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = cart.cartTickets.reduce((sum, ticket) => sum + ticket.price, 0);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4" style={{ color: '#ebd0ad' }}>Your Cart</h1>

      <div className="row">
        {cart.cartTickets.map(ticket => (
          <div key={ticket.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm" style={{ backgroundColor: '#1a252f', border: '1px solid #2c3e50' }}>
              <div className="card-body text-light">
                <h5 className="card-title" style={{ color: '#ebd0ad' }}>{ticket.movie.title}</h5>
                <p className="card-text">
                  <strong>Seat: </strong>{ticket.seat.number}
                </p>
                <p className="card-text">
                  <strong>Price: </strong>${ticket.price.toFixed(2)}
                </p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveTicket(ticket.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 p-3" style={{ backgroundColor: '#1a252f', borderRadius: '5px' }}>
        <h4 className="m-0" style={{ color: '#ebd0ad' }}>
          Total: <strong>${totalAmount.toFixed(2)}</strong>
        </h4>
        <button
          className="btn btn-success"
          style={{ backgroundColor: '#ebd0ad', color: '#1a1a2e', padding: '10px 25px' }}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;