import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  const formattedDate = new Date(releaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card
      sx={{
        margin: 2,
        width: { xs: 200, sm: 250 }, // Responsive width
        height: 320,
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <img
        height={"50%"}
        width="100%"
        src={posterUrl}
        alt={`${title} poster`} // Accessibility improvement
        onError={(e) => e.target.src = "/fallback.jpg"} // Fallback image if poster URL is broken
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {title} {/* Truncate long titles */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formattedDate} {/* Formatted release date */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          LinkComponent={Link}
          to={`/booking/${id}`}
          sx={{
            margin: "auto",
            bgcolor: "#2b2d42",
            ":hover": {
              bgcolor: "#121217",
            },
          }}
          size="small"
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
