import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const TicketModal = ({ open, onClose, ticket }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Your Ticket
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Movie: {ticket.movieTitle}
        </Typography>
        <Typography>
          Showtime: {ticket.showtime}
        </Typography>
        <Typography>
          Seat Number: {ticket.seatNumber}
        </Typography>
        <Typography>
          Date: {ticket.date}
        </Typography>
        <Button onClick={() => window.location.href = `/download/${ticket.id}`} variant="contained" color="primary">
          Download Ticket
        </Button>
      </Box>
    </Modal>
  );
};
 
export default TicketModal;
