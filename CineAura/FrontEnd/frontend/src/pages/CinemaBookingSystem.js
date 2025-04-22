import React, { useState } from 'react';

const CinemaBookingSystem = () => {
  // Seat status: 'available', 'booked', 'selected'
  const initialSeats = {
    A: Array.from({ length: 10 }, (_, i) => ({
      id: `A${10 - i}`,
      number: 10 - i,
      status: Math.random() < 0.7 ? 'available' : 'booked'
    })),
    B: Array.from({ length: 10 }, (_, i) => ({
      id: `B${10 - i}`,
      number: 10 - i,
      status: Math.random() < 0.7 ? 'available' : 'booked'
    })),
    C: Array.from({ length: 10 }, (_, i) => ({
      id: `C${10 - i}`,
      number: 10 - i,
      status: 'available'
    })),
    D: Array.from({ length: 10 }, (_, i) => ({
      id: `D${10 - i}`,
      number: 10 - i,
      status: 'available'
    })),
    E: Array.from({ length: 9 }, (_, i) => ({
      id: `E${9 - i}`,
      number: 9 - i,
      status: 'available'
    })),
    F: Array.from({ length: 8 }, (_, i) => ({
      id: `F${8 - i}`,
      number: 8 - i,
      status: 'available'
    }))
  };

  const [seats, setSeats] = useState(initialSeats);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);

  const showTimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];

  const handleSeatClick = (row, seat) => {
    if (seat.status === 'booked') return;
    
    const newSeats = { ...seats };
    const seatIndex = newSeats[row].findIndex(s => s.id === seat.id);
    
    if (newSeats[row][seatIndex].status === 'available') {
      newSeats[row][seatIndex].status = 'selected';
      setSelectedSeats([...selectedSeats, seat.id]);
    } else {
      newSeats[row][seatIndex].status = 'available';
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    }
    
    setSeats(newSeats);
  };

  const getSeatColor = (status, isPremium) => {
    if (status === 'booked') return '#DC3545'; // Red
    if (status === 'selected') return '#FFC107'; // Yellow
    return isPremium ? '#007BFF' : '#6C757D'; // Blue/Grey
  };

  return (
    <div style={{ 
      display: 'flex',
      gap: '40px',
      padding: '40px',
      backgroundColor: '#1a1a1a',
      minHeight: '100vh'
    }}>
      {/* Cinema Layout */}
      <div style={{ flex: 2 }}>
        <div style={{
          backgroundColor: '#2d2d2d',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ color: 'white', textAlign: 'center' }}>SCREEN</h2>
          
          {/* Seating Rows */}
          <div style={{ margin: '30px 0' }}>
            {Object.entries(seats).map(([row, seats]) => (
              <div key={row} style={{ 
                display: 'flex',
                justifyContent: 'center',
                margin: '15px 0'
              }}>
                {seats.map(seat => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(row, seat)}
                    disabled={seat.status === 'booked'}
                    style={{
                      width: '30px',
                      height: '30px',
                      margin: '5px',
                      backgroundColor: getSeatColor(seat.status, row >= 'E'),
                      border: 'none',
                      borderRadius: '4px',
                      cursor: seat.status === 'booked' ? 'not-allowed' : 'pointer',
                      transition: 'transform 0.2s',
                      ':hover': {
                        transform: seat.status !== 'booked' ? 'scale(1.1)' : 'none'
                      }
                    }}
                  >
                    <span style={{ 
                      color: seat.status === 'selected' ? 'black' : 'white',
                      fontSize: '0.8rem'
                    }}>
                      {seat.number}
                    </span>
                  </button>
                ))}
                <span style={{ 
                  color: 'white',
                  marginLeft: '15px',
                  alignSelf: 'center'
                }}>
                  Row {row}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            backgroundColor: '#28A745',
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'center',
            color: 'white'
          }}>
            ENTRANCE
          </div>
        </div>
      </div>

      {/* Booking Controls */}
      <div style={{ flex: 1 }}>
        <div style={{
          backgroundColor: '#2d2d2d',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ color: 'white', marginBottom: '20px' }}>Booking Details</h2>
          
          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block',
              color: 'white',
              marginBottom: '10px'
            }}>
             
             Select Showtime:
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                backgroundColor: '#333',
                color: 'white',
                border: '1px solid #444',
                fontSize: '16px'
              }}
            >
              <option value="">Select a time</option>
              {showTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {selectedTime && (
            <div style={{ 
              color: 'white',
              padding: '15px',
              backgroundColor: '#333',
              borderRadius: '5px',
              marginBottom: '20px'
            }}>
              <h3>Selected Showtime: {selectedTime}</h3>
              <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
              <p>Total Price: ${selectedSeats.length * (selectedSeats[0]?.startsWith('E-F') ? 15 : 12)}</p>
              
              <button
                style={{
                  backgroundColor: '#28A745',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '15px'
                }}
                disabled={selectedSeats.length === 0}
              >
                Confirm Booking
              </button>
            </div>
          )}
          <div style={{ color: '#888' }}>
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#6C757D',
                marginRight: '10px'
              }}></div>
              Standard Seat ($12)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#007BFF',
                marginRight: '10px'
              }}></div>
              Premium Seat ($15)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#DC3545',
                marginRight: '10px'
              }}></div>
              Booked
            </div>
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#FFC107',
                marginRight: '10px'
              }}></div>
              Selected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaBookingSystem;