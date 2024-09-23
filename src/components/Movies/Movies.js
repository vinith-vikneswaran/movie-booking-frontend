import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data.movies || []); // Handle cases where data.movies might be undefined
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch movies.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error" textAlign="center">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box padding={4}>
      <Typography
        variant="h4"
        padding={2}
        textAlign="center"
        bgcolor="#900C3F"
        color="white"
        borderRadius={2}
        marginBottom={4}
      >
        All Movies
      </Typography>
      <Grid container spacing={4}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
              <MovieItem
                id={movie._id}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                title={movie.title}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              No movies available.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Movies;
