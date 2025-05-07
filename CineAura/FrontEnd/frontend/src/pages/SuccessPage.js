import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');

    if (!sessionId) {
      setError('No session ID found in URL');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        
        const response = await fetch(`/api/payments/verify?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Payment verification failed');
        }

        const data = await response.json();
        setOrderDetails(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to verify payment');
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location.search]);

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
        <CircularProgress size={60} />
        <Typography variant="h6" mt={3}>Verifying your payment...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
        <Typography color="error" variant="h5">Payment Verification Error</Typography>
        <Typography mt={2}>{error}</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ mt: 3 }}>
          Return Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
      <Box textAlign="center" mb={4}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
        <Typography variant="h3" gutterBottom>Payment Successful!</Typography>
        <Typography variant="body1" color="text.secondary">
          Thank you for your purchase. Your tickets have been booked successfully.
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h5" gutterBottom>Order Summary</Typography>
        
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography>Order ID:</Typography>
          <Typography fontWeight="bold">{orderDetails?.orderId || 'N/A'}</Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography>Date:</Typography>
          <Typography fontWeight="bold">
            {new Date(orderDetails?.createdAt).toLocaleString()}
          </Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography>Total Amount:</Typography>
          <Typography fontWeight="bold">
            ${(orderDetails?.totalAmount || 0).toFixed(2)}
          </Typography>
        </Box>

        <Typography variant="h6" mt={4} mb={2}>Tickets</Typography>
        
        {orderDetails?.tickets?.map((ticket: any, index: number) => (
          <Box key={index} sx={{ p: 2, mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Typography fontWeight="bold">{ticket.movieTitle}</Typography>
            <Typography>Seat: {ticket.seatId}</Typography>
            <Typography>Showtime: {new Date(ticket.showtime).toLocaleString()}</Typography>
            <Typography>Price: ${ticket.price.toFixed(2)}</Typography>
          </Box>
        ))}

        <Box textAlign="center" mt={4}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/profile/tickets')}
            size="large"
          >
            View My Tickets
          </Button>
        </Box>
      </Box>

      <Box textAlign="center" mt={4}>
        <Typography variant="body2" color="text.secondary">
          A confirmation email has been sent to {orderDetails?.customerEmail}
        </Typography>
      </Box>
    </Box>
  );
};

export default SuccessPage;