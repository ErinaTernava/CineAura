import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CartPage = () => {
  const { state } = useLocation();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    console.log("Received state:", state); // Debug log
    if (state?.tickets) {
      setTickets(state.tickets);
    }
  }, [state]);

  const calculateTotal = () => {
    return tickets.reduce((sum, ticket) => sum + ticket.price, 0);
  };

  if (!tickets || tickets.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <p>No tickets have been selected yet.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Your Tickets</h1>
      <div style={{ marginTop: '20px' , color:'white'}}>
        {tickets.map(ticket => (
          <div key={`${ticket.id}-${ticket.row}-${ticket.position}`} 
               style={{
                 padding: '15px',
                 marginBottom: '15px',
                 border: '1px solid #ddd',
                 borderRadius: '5px'
               }}>
            <h3>{ticket.movie} ({ticket.type.toUpperCase()})</h3>
            <p>Seat: {ticket.row}{ticket.position}</p>
            <p>Showtime: {ticket.showtime}</p>
            <p>Price: ${ticket.price}</p>
          </div>
        ))}
      </div>
      <div style={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h3>Total: ${calculateTotal()}</h3>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#ff5722',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;