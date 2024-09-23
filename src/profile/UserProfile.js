import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import {
  getUserBooking,
  getUserDetails,
  deleteBooking, // import deleteBooking function
} from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"; // Import the delete icon

const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
      bgcolor="#f0f2f5"
      minHeight="100vh"
    >
      {user && (
        <Box
          component={Paper}
          elevation={3}
          padding={4}
          borderRadius={6}
          bgcolor="white"
          width={{ xs: "90%", sm: "70%", md: "50%" }}
          textAlign="center"
        >
          <AccountCircleIcon
            sx={{ fontSize: "6rem", color: "#1976d2" }}
          />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            {user.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {user.email}
          </Typography>
        </Box>
      )}

      {bookings && bookings.length > 0 && (
        <Box
          component={Paper}
          elevation={3}
          mt={4}
          padding={4}
          borderRadius={6}
          bgcolor="white"
          width={{ xs: "90%", sm: "80%", md: "70%" }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            My Bookings
          </Typography>

          <List sx={{ width: "100%" }}>
            {bookings.map((booking, index) => (
              <Fragment key={booking._id}>
                <ListItem
                  sx={{
                    bgcolor: "#1976d2",
                    color: "white",
                    borderRadius: 3,
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ListItemText
                    primary={`Movie: ${booking.movie.title}`}
                    secondary={`Seat: ${booking.seatNumber} | Date: ${new Date(
                      booking.date
                    ).toDateString()}`}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                  <IconButton
                    onClick={() => handleDelete(booking._id)}
                    aria-label="delete booking"
                    sx={{ color: "white" }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItem>
                {index !== bookings.length - 1 && <Divider />}
              </Fragment>
            ))}
          </List>
        </Box>
      )}

      {!bookings || bookings.length === 0 ? (
        <Typography mt={4} variant="h6" color="textSecondary">
          You have no bookings yet.
        </Typography>
      ) : null}
    </Box>
  );
};

export default UserProfile;
