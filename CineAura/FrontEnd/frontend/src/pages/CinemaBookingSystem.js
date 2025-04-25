import React, { useState } from 'react';

const CinemaBookingSystem = () => {
    // Seat status: 'available', 'booked', 'selected'
    const initialSeats = {
        A: Array.from({ length: 10 }, (_, i) => ({
            id: `A${10 - i}`,
            number: 10 - i,
            status: 'available'
        })),
        B: Array.from({ length: 10 }, (_, i) => ({
            id: `B${10 - i}`,
            number: 10 - i,
            status: 'available'
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
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);

    const handleSeatClick = (row, seat) => {
        const newSeats = { ...seats };
        const seatIndex = newSeats[row].findIndex(s => s.id === seat.id);

        if (newSeats[row][seatIndex].status === 'available') {
            newSeats[row][seatIndex].status = 'selected';
            setSelectedSeats([...selectedSeats, seat.id]);
        } else if (newSeats[row][seatIndex].status === 'selected') {
            newSeats[row][seatIndex].status = 'available';
            setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
        }

        setSeats(newSeats);
    };

    const handleBooking = () => {
        const newSeats = { ...seats };

        // Mark all selected seats as booked
        selectedSeats.forEach(seatId => {
            const row = seatId[0];
            const seatIndex = newSeats[row].findIndex(s => s.id === seatId);
            if (seatIndex !== -1) {
                newSeats[row][seatIndex].status = 'booked';
            }
        });

        setSeats(newSeats);
        setBookedSeats([...bookedSeats, ...selectedSeats]);
        setSelectedSeats([]);
    };

    const handleCancelTicket = () => {
        const newSeats = { ...seats };

        // Mark all booked seats as available
        bookedSeats.forEach(seatId => {
            const row = seatId[0];
            const seatIndex = newSeats[row].findIndex(s => s.id === seatId);
            if (seatIndex !== -1) {
                newSeats[row][seatIndex].status = 'available';
            }
        });

        setSeats(newSeats);
        setBookedSeats([]);
    };

    const getSeatColor = (status, isPremium) => {
        if (status === 'booked') return '#DC3545'; // Red
        if (status === 'selected') return '#FFC107'; // Yellow
        return isPremium ? '#007BFF' : '#6C757D'; // Blue (premium) / Grey (standard)
    };

    const calculateTotal = (seatsToCalculate = selectedSeats) => {
        return seatsToCalculate.reduce((total, seatId) => {
            const isPremium = ['E', 'F'].includes(seatId[0]);
            return total + (isPremium ? 15 : 12);
        }, 0);
    };

    return (
        <div style={{
            display: 'flex',
            gap: '40px',
            padding: '40px',
            backgroundColor: '#121212',
            minHeight: '100vh',
            color: '#e0e0e0',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Cinema Layout */}
            <div style={{ flex: 2 }}>
                <div style={{
                    backgroundColor: '#1e1e1e',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }}>
                    <h2 style={{
                        color: '#fff',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '30px'
                    }}>
                        Screen
                    </h2>

                    {/* Seating Rows */}
                    <div style={{ margin: '30px 0' }}>
                        {Object.entries(seats).map(([row, rowSeats]) => (
                            <div key={row} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                margin: '15px 0'
                            }}>
                                {rowSeats.map(seat => (
                                    <button
                                        key={seat.id}
                                        onClick={() => handleSeatClick(row, seat)}
                                        disabled={seat.status === 'booked'}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            margin: '5px',
                                            backgroundColor: getSeatColor(seat.status, ['E', 'F'].includes(row)),
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: seat.status === 'booked' ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s',
                                            ':hover': {
                                                transform: seat.status !== 'booked' ? 'scale(1.1)' : 'none',
                                                boxShadow: seat.status !== 'booked' ? '0 0 8px rgba(255,255,255,0.3)' : 'none'
                                            }
                                        }}
                                    >
                                        <span style={{
                                            color: seat.status === 'selected' ? '#121212' : '#fff',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {seat.number}
                                        </span>
                                    </button>
                                ))}
                                <span style={{
                                    color: '#fff',
                                    marginLeft: '15px',
                                    alignSelf: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    Row {row}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        backgroundColor: '#1a252f',
                        padding: '10px',
                        borderRadius: '5px',
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Entrance
                    </div>
                </div>
            </div>

            {/* Booking Controls */}
            <div style={{ flex: 1 }}>
                <div style={{
                    backgroundColor: '#1e1e1e',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }}>
                    <h2 style={{
                        color: '#fff',
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Booking Summary
                    </h2>

                    <div style={{
                        color: '#e0e0e0',
                        padding: '20px',
                        backgroundColor: '#252525',
                        borderRadius: '5px',
                        marginBottom: '20px'
                    }}>
                        <h3 style={{
                            color: '#fff',
                            marginTop: '0',
                            borderBottom: '1px solid #333',
                            paddingBottom: '10px'
                        }}>
                            Your Selection
                        </h3>

                        {selectedSeats.length > 0 ? (
                            <>
                                <p style={{ marginBottom: '5px' }}>
                                    <strong>Seats:</strong> {selectedSeats.join(', ')}
                                </p>
                                <p style={{ marginBottom: '5px' }}>
                                    <strong>Standard Seats:</strong> {selectedSeats.filter(id => !['E', 'F'].includes(id[0])).length} × $12
                                </p>
                                <p style={{ marginBottom: '5px' }}>
                                    <strong>Premium Seats:</strong> {selectedSeats.filter(id => ['E', 'F'].includes(id[0])).length} × $15
                                </p>
                                <p style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    margin: '15px 0'
                                }}>
                                    Total: ${calculateTotal()}
                                </p>
                            </>
                        ) : bookedSeats.length > 0 ? (
                            <>
                                <p style={{ marginBottom: '5px' }}>
                                    <strong>Booked Seats:</strong> {bookedSeats.join(', ')}
                                </p>
                                <p style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    margin: '15px 0'
                                }}>
                                    Total Paid: ${calculateTotal(bookedSeats)}
                                </p>
                            </>
                        ) : (
                            <p>No seats selected or booked</p>
                        )}

                        <button
                            onClick={handleBooking}
                            style={{
                                backgroundColor: selectedSeats.length > 0 ? '#28A745' : '#555',
                                color: 'white',
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: selectedSeats.length > 0 ? 'pointer' : 'not-allowed',
                                marginTop: '15px',
                                width: '100%',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                transition: 'background-color 0.2s',
                                ':hover': {
                                    backgroundColor: selectedSeats.length > 0 ? '#218838' : '#555'
                                }
                            }}
                            disabled={selectedSeats.length === 0}
                        >
                            Confirm Booking
                        </button>

                        <button
                            onClick={handleCancelTicket}
                            style={{
                                backgroundColor: bookedSeats.length > 0 ? '#DC3545' : '#555',
                                color: 'white',
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: bookedSeats.length > 0 ? 'pointer' : 'not-allowed',
                                marginTop: '15px',
                                width: '100%',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                transition: 'background-color 0.2s',
                                ':hover': {
                                    backgroundColor: bookedSeats.length > 0 ? '#C82333' : '#555'
                                }
                            }}
                            disabled={bookedSeats.length === 0}
                        >
                            Cancel Ticket
                        </button>
                    </div>

                    <div style={{ color: '#aaa' }}>
                        <h3 style={{
                            color: '#fff',
                            marginTop: '0',
                            marginBottom: '15px'
                        }}>
                            Seat Legend
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '12px 0' }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: '#6C757D',
                                marginRight: '15px',
                                borderRadius: '3px'
                            }}></div>
                            <span>Standard Seat ($12)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '12px 0' }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: '#007BFF',
                                marginRight: '15px',
                                borderRadius: '3px'
                            }}></div>
                            <span>Premium Seat ($15)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '12px 0' }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: '#DC3545',
                                marginRight: '15px',
                                borderRadius: '3px'
                            }}></div>
                            <span>Booked</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '12px 0' }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: '#FFC107',
                                marginRight: '15px',
                                borderRadius: '3px'
                            }}></div>
                            <span>Selected</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CinemaBookingSystem;