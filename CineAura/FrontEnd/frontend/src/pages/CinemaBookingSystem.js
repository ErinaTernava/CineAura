import React, { useState } from 'react';

const CinemaBookingSystem = () => {
    const initialSeats = {
        A: Array.from({ length: 10 }, (_, i) => ({ id: `A${10 - i}`, number: 10 - i, status: 'available' })),
        B: Array.from({ length: 10 }, (_, i) => ({ id: `B${10 - i}`, number: 10 - i, status: 'available' })),
        C: Array.from({ length: 10 }, (_, i) => ({ id: `C${10 - i}`, number: 10 - i, status: 'available' })),
        D: Array.from({ length: 10 }, (_, i) => ({ id: `D${10 - i}`, number: 10 - i, status: 'available' })),
        E: Array.from({ length: 9 }, (_, i) => ({ id: `E${9 - i}`, number: 9 - i, status: 'available' })),
        F: Array.from({ length: 8 }, (_, i) => ({ id: `F${8 - i}`, number: 8 - i, status: 'available' })),
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
        if (status === 'booked') return '#e63946';
        if (status === 'selected') return '#f1c40f';
        return isPremium ? '#3498db' : '#7f8c8d';
    };

    const calculateTotal = (seatsToCalculate = selectedSeats) => {
        return seatsToCalculate.reduce((total, seatId) => {
            const isPremium = ['E', 'F'].includes(seatId[0]);
            return total + (isPremium ? 15 : 12);
        }, 0);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#0b0c10', minHeight: '100vh', color: 'white' }}>
            <div style={{ width: '100%', maxWidth: '1000px' }}>

                <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', letterSpacing: '2px' }}>
                    SCREEN
                </div>

                <div style={{ marginBottom: '40px', padding: '10px', backgroundColor: '#1f2833', borderRadius: '8px' }}>
                    {Object.entries(seats).map(([row, rowSeats]) => (
                        <div key={row} style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                            {rowSeats.map(seat => (
                                <button
                                    key={seat.id}
                                    onClick={() => handleSeatClick(row, seat)}
                                    disabled={seat.status === 'booked'}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        margin: '5px',
                                        backgroundColor: getSeatColor(seat.status, ['E', 'F'].includes(row)),
                                        border: '2px solid #45a29e',
                                        borderRadius: '6px',
                                        cursor: seat.status === 'booked' ? 'not-allowed' : 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        transition: 'transform 0.2s',
                                        transform: seat.status === 'selected' ? 'scale(1.1)' : 'scale(1)'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = seat.status === 'selected' ? 'scale(1.1)' : 'scale(1)'}
                                >
                                    {seat.number}
                                </button>
                            ))}
                            <span style={{ marginLeft: '15px', alignSelf: 'center', fontWeight: 'bold' }}>Row {row}</span>
                        </div>
                    ))}

                    <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: '#66fcf1' }}>
                        ENTRANCE
                    </div>
                </div>

                <div style={{ backgroundColor: '#1f2833', padding: '20px', borderRadius: '8px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Booking Summary</h2>

                    {selectedSeats.length > 0 ? (
                        <>
                            <p>Selected Seats: {selectedSeats.join(', ')}</p>
                            <p>Standard: {selectedSeats.filter(id => !['E', 'F'].includes(id[0])).length} × $12</p>
                            <p>Premium: {selectedSeats.filter(id => ['E', 'F'].includes(id[0])).length} × $15</p>
                            <h3>Total: ${calculateTotal()}</h3>
                        </>
                    ) : bookedSeats.length > 0 ? (
                        <>
                            <p>Booked Seats: {bookedSeats.join(', ')}</p>
                            <h3>Total Paid: ${calculateTotal(bookedSeats)}</h3>
                        </>
                    ) : (
                        <p>No seats selected or booked.</p>
                    )}

                    <button
                        onClick={handleBooking}
                        disabled={selectedSeats.length === 0}
                        style={{
                            marginTop: '20px',
                            padding: '12px',
                            width: '100%',
                            backgroundColor: selectedSeats.length > 0 ? '#45a29e' : '#555',
                            border: 'none',
                            borderRadius: '5px',
                            color: 'white',
                            fontSize: '16px',
                            cursor: selectedSeats.length > 0 ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Confirm Booking
                    </button>

                    <button
                        onClick={handleCancelTicket}
                        disabled={bookedSeats.length === 0}
                        style={{
                            marginTop: '10px',
                            padding: '12px',
                            width: '100%',
                            backgroundColor: bookedSeats.length > 0 ? '#e63946' : '#555',
                            border: 'none',
                            borderRadius: '5px',
                            color: 'white',
                            fontSize: '16px',
                            cursor: bookedSeats.length > 0 ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Cancel Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CinemaBookingSystem;