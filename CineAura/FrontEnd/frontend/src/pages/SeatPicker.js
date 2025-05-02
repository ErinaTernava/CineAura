import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import useAuthToken from '../hooks/useAuthToken'; 
import { jwtDecode } from 'jwt-decode';

const SeatPicker = () => {
  const [hallSeats, setHallSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('2d');
  const [bookedSeats, setBookedSeats] = useState([]);
  const [movie, setMovie] = useState(null);
  const [showtime, setShowtime] = useState(null);
  const [hall, setHall] = useState(null);
  const { token } = useAuthToken();
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get('movieId');
  const hallId = searchParams.get('hallId');
  const showtimeId = searchParams.get('showtimeId');
  
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
    const userId=getUserId();

  useEffect(() => {
    const fetchTakenSeats = async () => {
      if (!showtimeId) return;
      
      try {
        const response = await fetch(`http://localhost:5283/api/Ticket/takenseats?showtimeId=${showtimeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch taken seats');
        }
        const data = await response.json();
        setBookedSeats(data);
      } catch (err) {
        console.error('Error fetching taken seats:', err);
        setError(err.message);
      }
    };

    fetchTakenSeats();
  }, [showtimeId]);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;
      
      try {
        const response = await fetch(`http://localhost:5283/api/Movie/getbyid?id=${movieId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie:', err);
      }
    };

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    const fetchHall = async () => {
      if (!hallId) return;
      
      try {
        const response = await fetch(`http://localhost:5283/api/Hall/getbyid?id=${hallId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch hall');
        }
        const data = await response.json();
        setHall(data);
      } catch (err) {
        console.error('Error fetching hall:', err);
      }
    };

    fetchHall();
  }, [hallId]);

  useEffect(() => {
    const fetchShowtime = async () => {
      if (!showtimeId) return;
      
      try {
        const response = await fetch(`http://localhost:5283/api/Showtime/getById?id=${showtimeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch showtime');
        }
        const data = await response.json();
        setShowtime(data);
        setViewType(data.hallId <= 2 ? '2d' : '3d');
      } catch (err) {
        console.error('Error fetching showtime:', err);
      }
    };

    fetchShowtime();
  }, [showtimeId]);

  useEffect(() => {
    const generateSeatLayout = () => {
      try {
        setLoading(true);
        
        const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
        const seatsPerRow = viewType === '2d' ? 11 : 10;
        const totalSeats = viewType === '2d' ? 66 : 56;
        
        const generatedSeats = [];
        let seatNumber = 1;
        
        for (let row of rows) {
          for (let i = 1; i <= seatsPerRow; i++) {
            if (seatNumber > totalSeats) break;
            const seatId = `${row}${i}`;
            generatedSeats.push({
              id: seatId,
              seatNumber: seatNumber,
              row: row,
              position: i,
              isAvailable: !bookedSeats.includes(seatNumber), 
              price: showtime ? showtime.ticketPrice : 4,
              type: viewType,
              movieTitle: movie ? movie.title : 'Unknown Movie',
              showtime: showtime ? new Date(showtime.startTime).toLocaleString() : 'Unknown Time',
              hallName: hall ? hall.hallName : 'Unknown Hall'
            });
            seatNumber++;
          }
          if (seatNumber > totalSeats) break;
        }
        
        setHallSeats(generatedSeats);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    generateSeatLayout();
  }, [viewType, bookedSeats, movie, showtime, hall]);

  const toggleSeatSelection = (seat) => {
    if (!seat.isAvailable) return;
    
    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.id === seat.id);
      if (isSelected) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const addToCart = async () => {
    if (!getUserId) {
      alert('Please log in to book tickets');
      navigate('/login');
      return;
    }

    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    try {
      const seatNumbers = selectedSeats.map(seat => seat.seatNumber);
      const seatIdsParam = seatNumbers.join(',');

      const response = await fetch(`http://localhost:5283/api/Ticket/addtocart?userId=${userId}&showtimeId=${showtimeId}&seatIds=${seatIdsParam}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add tickets to cart');
      }

      const takenSeatsResponse = await fetch(`http://localhost:5283/api/Ticket/takenseats?showtimeId=${showtimeId}`);
      if (takenSeatsResponse.ok) {
        const updatedTakenSeats = await takenSeatsResponse.json();
        setBookedSeats(updatedTakenSeats);
      }

      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.message);
    }
  };

  if (loading) return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200px',
      color: 'white'
    }}>
      <div style={{
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        borderTop: '4px solid #ebd0ad',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
        marginBottom: '10px'
      }}></div>
      <p>Loading seats...</p>
    </div>
  );
  
  if (error) return (
    <div style={{ 
      color: '#f44336', 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#1a1a1a'
    }}>
      Error: {error}
    </div>
  );

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#ebd0ad', marginBottom: '10px' }}>Seat Selection</h1>
      {movie && <h2 style={{ textAlign: 'center', color: '#ebd0ad', marginTop: '0' }}>{movie.title}</h2>}
      {showtime && hall && (
        <p style={{ textAlign: 'center', color: '#bdbdbd' }}>
          {new Date(showtime.startTime).toLocaleString()} | {hall.hallName} ({hall.hallType})
        </p>
      )}
      
      <div style={{ 
        textAlign: 'center', 
        margin: '20px 0 5px', 
        fontWeight: 'bold', 
        color: 'white',
        fontSize: '1.2rem'
      }}>SCREEN</div>
      
      <div style={{
        height: '20px',
        background: 'linear-gradient(to bottom, #4a90e2, #2a70c8)',
        marginBottom: '30px',
        borderRadius: '2px',
        boxShadow: '0 3px 10px rgba(74, 144, 226, 0.5)'
      }}></div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginBottom: '30px'
      }}>
        {['A', 'B', 'C', 'D', 'E', 'F'].map(row => {
          const rowSeats = hallSeats.filter(seat => seat.row === row);
          if (rowSeats.length === 0) return null;
          
          return (
            <div key={row} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '20px', 
                fontWeight: 'bold', 
                color: '#ebd0ad',
                fontSize: '1.1rem'
              }}>{row}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {rowSeats.map(seat => (
                  <button
                    key={seat.id}
                    onClick={() => toggleSeatSelection(seat)}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: 'none',
                      borderRadius: '4px',
                      background: !seat.isAvailable 
                        ? '#f44336' 
                        : selectedSeats.some(s => s.id === seat.id) 
                          ? '#4caf50' 
                          : '#e0e0e0',
                      color: !seat.isAvailable || selectedSeats.some(s => s.id === seat.id) 
                        ? 'white' 
                        : '#333',
                      cursor: seat.isAvailable ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease'
                    }}
                    disabled={!seat.isAvailable}
                  >
                    {seat.position}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        marginBottom: '30px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '15px',
            height: '15px',
            borderRadius: '2px',
            marginRight: '5px',
            background: '#e0e0e0'
          }}></div>
          Available
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '15px',
            height: '15px',
            borderRadius: '2px',
            marginRight: '5px',
            background: '#4caf50'
          }}></div>
          Selected
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '15px',
            height: '15px',
            borderRadius: '2px',
            marginRight: '5px',
            background: '#f44336'
          }}></div>
          Booked
        </div>
      </div>
      
      {selectedSeats.length > 0 && (
        <div style={{
          background: '#2d2d2d',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
          border: '1px solid #444',
          color: 'white'
        }}>
          <h3 style={{ marginTop: '0', color: '#ebd0ad' }}>Your Selection ({selectedSeats.length})</h3>
          <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
            {selectedSeats.map(seat => (
              <li key={seat.id} style={{ marginBottom: '5px' }}>
                Seat {seat.row}{seat.position} - ${seat.price.toFixed(2)} ({seat.type.toUpperCase()})
              </li>
            ))}
          </ul>
          <p style={{ 
            fontWeight: 'bold', 
            fontSize: '1.1rem',
            borderTop: '1px solid #444',
            paddingTop: '10px'
          }}>
            Total: ${selectedSeats.reduce((sum, seat) => sum + seat.price, 0).toFixed(2)}
          </p>
          <button 
            onClick={addToCart} 
            style={{
              background: '#ebd0ad',
              color: '#1a1a2e',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '15px',
              width: '100%',
              fontSize: '1rem',
              transition: 'background 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#d4b98c'}
            onMouseOut={(e) => e.target.style.background = '#ebd0ad'}
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatPicker;