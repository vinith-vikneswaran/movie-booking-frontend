import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Card, CardMedia, Grid, IconButton, Link } from '@mui/material';
import MovieItem from './Movies/MovieItem';
import { Link as RouterLink } from 'react-router-dom';
import { getAllMovies } from '../api-helpers/api-helpers';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import img from '../assets/img.png';
import apple from '../assets/apple.png';
import PhoneIcon from '@mui/icons-material/Phone';
import HelpIcon from '@mui/icons-material/Help';
import './Footer.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies || []))  // Handle empty or missing data
      .catch((err) => {
        console.log(err);
        setError('Failed to load movies.');  // Set error state if there's an issue
      });
  }, []);

  useEffect(() => {
    // Fetch movies initially
    getAllMovies()
      .then((data) => setMovies(data.movies || []))
      .catch((err) => setError('Failed to load movies.'));
  
    // Listen for the custom event to re-fetch movies
    const handleMovieListUpdate = () => {
      getAllMovies()
        .then((data) => setMovies(data.movies || []))
        .catch((err) => setError('Failed to load movies.'));
    };
  
    window.addEventListener('movieListUpdated', handleMovieListUpdate);
  
    // Cleanup the event listener
    return () => {
      window.removeEventListener('movieListUpdated', handleMovieListUpdate);
    };
  }, []);

  return (
    <Box width="100%" height="100%" margin="auto" marginTop={2}>
      {/* Carousel Section */}
      <Box>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg"
                className="d-block w-100"
                alt="Carousel-Image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726144890944_u1coimbatorecreativesweb.jpg"
                className="d-block w-100"
                alt="Carousel-Image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726203562630_webrev.jpg"
                className="d-block w-100"
                alt="Carousel-Image"
              />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </Box>

      {/* Image Section */}
      <Box margin="auto" width="80%" height="40vh" padding={2}>
        <img
          src='https://static.toiimg.com/thumb/msid-106855098,width-1280,height-720,imgsize-1861743,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg'
          alt='GOAT Movie'
          width="100%"
          height="100%"
        />
      </Box>

      {/* Latest Releases Section */}
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign="center" color="red">
          Latest Releases
        </Typography>
      </Box>

      {/* Movie List Section */}
      {error ? (
        <Box textAlign="center" marginTop={5}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      ) : (
        <Box display="flex" width="100%" justifyContent="center" flexWrap="wrap" marginBottom={5}>
          {movies.slice(0, 10).map((movie) => (
            <MovieItem
              key={movie._id}  // Using unique movie ID as key
              id={movie._id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
            />
          ))}
        </Box>
      )}

      {/* View All Movies Button */}
      <Box display="flex" padding={6} margin="auto">
        <Button LinkComponent={RouterLink} to="/movies" variant="outlined" sx={{ margin: 'auto', color: "#2b2d42" }}>
          View All Movies
        </Button>
      </Box>

      {/* Bar Image */}
      <Box marginLeft={22}>
        <img src={img} alt="Bar-Image" />
      </Box>

      {/* Upcoming Events Section */}
      <Box>
        <Box display="flex" justifyContent="center" color="red" marginTop={8}>
          <h1>Upcoming Events</h1>
        </Box>

        {/* Event Cards Section */}
        <Box display="flex" justifyContent="center" sx={{ width: '100%', margin: 'auto', padding: '20px', marginBottom: '20px' }}>
          <Card sx={{ width: '100%', height:'600px'}}>
            <Box display="flex" gap={2}>
              <CardMedia
                component="img"
                image="https://assets-in.bmscdn.com/nmcms/events/banner/weblisting/bharatanatyam-and-odissi-et00407429-2024-8-24-t-5-30-49.jpg"
                alt="Card Image 1"
                sx={{ flex: 1, objectFit: 'cover' }}
              />
              <CardMedia
                component="img"
                image="https://assets-in.bmscdn.com/nmcms/events/banner/weblisting/from-a-to-b-by-srijan-kaushik-et00407431-2024-8-20-t-6-17-36.jpg"
                alt="Card Image 2"
                sx={{ flex: 1, objectFit: 'cover' }}
              />
              <CardMedia
                component="img"
                image="https://assets-in.bmscdn.com/nmcms/events/banner/weblisting/talks-on-western-classical-music-et00386804-2024-5-7-t-10-3-51.jpg"
                alt="Card Image 3"
                sx={{ flex: 1, objectFit: 'cover' }}
              />
              <CardMedia
                component="img"
                image="https://assets-in.bmscdn.com/nmcms/events/banner/weblisting/mumbai-piano-day-et00405885-2024-8-9-t-9-39-49.jpg"
                alt="Card Image 4"
                sx={{ flex: 1, objectFit: 'cover' }}
              />
            </Box>
          </Card>
        </Box>
      </Box>

      {/* Explore Movies Section */}
      <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
        <Typography variant="h5" textAlign="center" marginBottom={2}>
          Explore Latest Movies
        </Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <Grid container spacing={2}>
            {['Hindi Movies', 'English Movies', 'Telugu Movies', 'Tamil Movies', 'Kannada Movies', 'Bengali Movies','Malayalam Movies'].map((language) => (
              <Grid item key={language}>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: '50px', padding: '8px 16px', textTransform: 'none', fontSize: '14px' }}
                >
                  {language}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Typography variant="h5" textAlign="center" marginBottom={2}>
          By Genre
        </Typography>
        <Grid container spacing={2}>
          {['Comedy Movies', 'Action Movies', 'Drama Movies', 'Romance Movies', 'Horror Movies','Crime Movies', 'Mystery Movies'].map((genre) => (
            <Grid item key={genre}>
              <Button
                variant="outlined"
                sx={{ borderRadius: '50px', padding: '8px 16px', textTransform: 'none', fontSize: '14px' }}
              >
                {genre}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
      width="100%"
      bgcolor="#f8f9fa"
      padding={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderTop: "1px solid #e0e0e0"
      }}
    >
      {/* App Download Section */}
      <Box display="flex" gap={3} marginBottom={3} justifyContent="center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Google Play"
          style={{ height: '50px', cursor: 'pointer' }}
        />
        <img
          src={apple}
          alt="App Store"
          style={{ height: '50px', cursor: 'pointer' }}
        />
      </Box>

      {/* Bottom Links */}
      <Box display="flex" justifyContent="center" gap={5} flexWrap="wrap">
        <Link
          component={RouterLink}
          to="/contact"
          underline="none"
          sx={{ color: "#555", '&:hover': { color: "#ff5722" }, fontSize: '16px' }}
        >
          <IconButton>
            <PhoneIcon />
          </IconButton>
          Contact Us
        </Link>
        <Link
          component={RouterLink}
          to="/faq"
          underline="none"
          sx={{ color: "#555", '&:hover': { color: "#ff5722" }, fontSize: '16px' }}
        >
          <IconButton>
            <HelpIcon />
          </IconButton>
          FAQs
        </Link>
      </Box>
    </Box>
    <Box>
    <footer className="footer">
      <div className="footer-content">
        <div className="social-media">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-whatsapp"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.messenger.com/" target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-facebook-messenger"></i>
          </a>
        </div>
        <div className="footer-text">
          <p>
            Copyright © 2024 Orbgen Technologies Pvt. Ltd. All rights reserved •
            <a href="/terms" className="footer-link"> Terms of Use </a> •
            <a href="/privacy" className="footer-link"> Privacy Policy </a>
          </p>
        </div>
      </div>
    </footer>
    </Box>
  </Box>
  );
}

export default HomePage;
