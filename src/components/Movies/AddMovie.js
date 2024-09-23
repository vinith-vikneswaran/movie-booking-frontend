import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";

const labelProps = {
  mt: 1,
  mb: 1,
  fontWeight: "bold",
  fontSize: "1rem",
  color: "#333",
};

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddActor = () => {
    if (actor.trim()) {
      setActors([...actors, actor]);
      setActor("");
      setError(""); // Clear error when actor is added
    } else {
      setError("Actor name cannot be empty.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.title || !inputs.description || !inputs.releaseDate) {
      setError("Please fill in all required fields.");
      return;
    }

    addMovie({ ...inputs, actors })
      .then((res) => {
        console.log(res);
        setError("");
        // Optionally clear the form after successful submission
        setInputs({
          title: "",
          description: "",
          posterUrl: "",
          releaseDate: "",
          featured: false,
        });
        setActors([]);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to add the movie. Please try again.");
      });
  };

  return (
    <Box
      width={"80%"}
      padding={4}
      margin="auto"
      mt={5}
      display={"flex"}
      flexDirection="column"
      bgcolor="white"
      borderRadius={5}
      boxShadow={"0px 10px 30px rgba(0, 0, 0, 0.1)"}
    >
      {/* Error Message */}
      {error && (
        <Typography color="error" textAlign="center" marginBottom={2}>
          {error}
        </Typography>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"} mb={3}>
          Add New Movie
        </Typography>

        {/* Title */}
        <FormLabel sx={labelProps}>Title</FormLabel>
        <TextField
          value={inputs.title}
          onChange={handleChange}
          name="title"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />

        {/* Description */}
        <FormLabel sx={labelProps}>Description</FormLabel>
        <TextField
          value={inputs.description}
          onChange={handleChange}
          name="description"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          fullWidth
          required
        />

        {/* Poster URL */}
        <FormLabel sx={labelProps}>Poster URL</FormLabel>
        <TextField
          value={inputs.posterUrl}
          onChange={handleChange}
          name="posterUrl"
          variant="outlined"
          margin="normal"
          fullWidth
        />

        {/* Release Date */}
        <FormLabel sx={labelProps}>Release Date</FormLabel>
        <TextField
          type="date"
          value={inputs.releaseDate}
          onChange={handleChange}
          name="releaseDate"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />

        {/* Actor Input */}
        <FormLabel sx={labelProps}>Add Actor</FormLabel>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            name="actor"
            variant="outlined"
            fullWidth
            placeholder="Enter actor name"
          />
          <Button
            onClick={handleAddActor}
            sx={{ ml: 2 }}
            variant="contained"
            color="primary"
          >
            Add Actor
          </Button>
        </Box>

        {/* Actors List */}
        {actors.length > 0 && (
          <Box mb={2}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Actors
            </Typography>
            <List>
              {actors.map((actor, index) => (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    margin: "5px 0",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#005bb5",
                    },
                  }}
                >
                  <ListItemText
                    primary={actor}
                    primaryTypographyProps={{
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Featured Checkbox */}
        <FormLabel sx={labelProps}>Featured</FormLabel>
        <Checkbox
          name="featured"
          checked={inputs.featured}
          onChange={(e) =>
            setInputs((prevState) => ({
              ...prevState,
              featured: e.target.checked,
            }))
          }
          sx={{ mr: 2, mb: 2 }} // Fixed margin-bottom property
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#1976d2",
            ":hover": {
              backgroundColor: "#1565c0",
            },
            padding: 1.5,
            fontWeight: "bold",
          }}
        >
          Add New Movie
        </Button>
      </form>
    </Box>
  );
};

export default AddMovie;
