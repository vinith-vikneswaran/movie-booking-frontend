import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
  Grid,
} from "@mui/material";
import { getAdminById } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAdminById()
      .then((res) => {
        setAdmin(res.admin);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load admin data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      padding={3}
      sx={{
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={3}>
        {/* Admin Details */}
        <Grid item xs={12} md={4}>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
              bgcolor="white"
              padding={4}
              borderRadius={4}
              boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
            >
              <AccountCircleIcon sx={{ fontSize: "6rem", mb: 2, color: "#1976d2" }} />
              <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                marginBottom={1}
              >
                Admin Profile
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ color: "#555", marginBottom: 2 }}
              >
                Email: {admin.email}
              </Typography>
            </Box>
          )}
        </Grid>

        {/* Added Movies */}
        <Grid item xs={12} md={8}>
          {admin && admin.addedMovies.length > 0 && (
            <Box
              width="100%"
              bgcolor="white"
              padding={3}
              borderRadius={4}
              boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
            >
              <Typography
                variant="h5"
                textAlign="center"
                marginBottom={2}
                fontWeight="bold"
              >
                Added Movies
              </Typography>
              <List>
                {admin.addedMovies.map((movie, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      margin: "10px 0",
                      borderRadius: "8px",
                      padding: "10px 15px",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#005bb5",
                      },
                    }}
                  >
                    <ListItemText
                      primary={movie.title}
                      primaryTypographyProps={{
                        fontSize: "1.1rem",
                        fontWeight: "500",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminProfile;
