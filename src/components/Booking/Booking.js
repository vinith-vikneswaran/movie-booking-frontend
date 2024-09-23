import React, { useEffect, useState } from "react";
import { Box, Button, FormLabel, TextField, Typography, Modal, IconButton, Snackbar, Alert, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import CloseIcon from '@mui/icons-material/Close';

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "", paymentMethod: "", paymentDetails: "" });
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.seatNumber || !inputs.date || !inputs.paymentMethod || !inputs.paymentDetails) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => {
        setSuccessOpen(true);
      })
      .catch((err) => {
        setErrorMessage("Booking failed. Please try again.");
        console.log(err);
      });
  };

  const handleCloseSuccess = () => {
    setSuccessOpen(false);
    // Clear form inputs
    setInputs({ seatNumber: "", date: "", paymentMethod: "", paymentDetails: "" });
  };

  return (
    <div>
      {movie && (
        <>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign="center"
            gutterBottom
          >
            Book Tickets For Movie: {movie.title}
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6} display="flex" justifyContent="center">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                padding={3}
                bgcolor="background.paper"
                borderRadius={2}
                boxShadow={3}
                textAlign="center"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  style={{ width: '100%', maxWidth: '400px', height: 'auto', borderRadius: '8px' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                padding={3}
                bgcolor="background.paper"
                borderRadius={2}
                boxShadow={3}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Movie Details
                </Typography>
                <Typography fontSize="1.2rem" marginBottom={1}>
                  <strong>Starring:</strong> {movie.actors.join(", ")}
                </Typography>
                <Typography fontSize="1.2rem" marginBottom={1}>
                  <strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}
                </Typography>
                <Typography fontSize="1.2rem" marginBottom={2} color="green">
                  <strong>Ticket Price:</strong> ₹190
                </Typography>
                <form onSubmit={handleSubmit}>
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type="number"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type="date"
                    margin="normal"
                    variant="outlined"
                    value={inputs.date}
                    onChange={handleChange}
                    fullWidth
                  />
                  <FormLabel>Payment Method</FormLabel>
                  <TextField
                    name="paymentMethod"
                    value={inputs.paymentMethod}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    placeholder="UPI, Credit/Debit Card, Net Banking"
                    fullWidth
                  />
                  <FormLabel>Payment Details</FormLabel>
                  <TextField
                    name="paymentDetails"
                    value={inputs.paymentDetails}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    placeholder="Enter payment details"
                    fullWidth
                  />
                  <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>

          <Modal
            open={successOpen}
            onClose={handleCloseSuccess}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: 400 },
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                textAlign: 'center',
                borderRadius: 2
              }}
            >
              <Typography id="modal-title" variant="h6" component="h2">
                Booking Successful!
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                Your booking for {movie.title} has been confirmed. Enjoy the show!
              </Typography>
              <Button
                onClick={handleCloseSuccess}
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
              >
                Close
              </Button>
              <IconButton
                onClick={handleCloseSuccess}
                sx={{ position: 'absolute', top: 10, right: 10 }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Modal>

          {errorMessage && (
            <Snackbar
              open={Boolean(errorMessage)}
              autoHideDuration={6000}
              onClose={() => setErrorMessage("")}
            >
              <Alert onClose={() => setErrorMessage("")} severity="error">
                {errorMessage}
              </Alert>
            </Snackbar>
          )}
        </>
      )}
    </div>
  );
};

export default Booking;
