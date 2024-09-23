import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
import { getAllMovies } from "../api-helpers/api-helpers";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch login status from Redux
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies || []))
      .catch((err) => console.log(err));
  }, []);

  // Logout Function
  const logout = (isAdmin) => {
    if (isAdmin) {
      dispatch(adminActions.logout());
    } else {
      dispatch(userActions.logout());
    }
    navigate("/"); // Redirect to home after logout
  };

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    if (movie) {
      if (isUserLoggedIn) {
        navigate(`/booking/${movie._id}`);
      } else {
        alert("Please log in to book a movie.");
      }
    } else {
      alert("Movie not found.");
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo Section */}
        <Box display="flex" alignItems="center">
          <IconButton component={Link} to="/" sx={{ color: "white" }}>
            <MovieIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>

        {/* Search Section */}
        <Box flex={1} mx={2}>
          <Autocomplete
            onChange={(e, val) => handleChange(e, val)}
            freeSolo
            options={movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  input: { color: "white" },
                  label: { color: "rgba(255, 255, 255, 0.6)" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.6)",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
                variant="outlined"
                {...params}
                placeholder="Search for movies"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Box>

        {/* Navigation Tabs Section */}
        <Box display="flex" alignItems="center">
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
            aria-label="header navigation tabs"
            sx={{ marginRight: 2 }}
          >
            <Tab component={Link} to="/movies" label="Movies" aria-label="movies" />

            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab component={Link} to="/admin" label="Admin" aria-label="admin" />
                <Tab component={Link} to="/auth" label="User" aria-label="auth" />
              </>
            )}

            {isUserLoggedIn && (
              <>
                <Tab component={Link} to="/user" label="Profile" aria-label="user profile" />
                <Tab label={<Typography>Hi, User</Typography>} disabled />
                <IconButton
                  onClick={() => logout(false)} // Regular user logout
                  aria-label="logout"
                  sx={{ color: "white" }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            )}

            {isAdminLoggedIn && (
              <>
                <Tab component={Link} to="/add" label="Add Movie" aria-label="add movie" />
                <Tab component={Link} to="/user-admin" label="Profile" aria-label="admin profile" />
                <IconButton
                  onClick={() => logout(true)} // Admin logout
                  aria-label="admin logout"
                  sx={{ color: "white" }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
