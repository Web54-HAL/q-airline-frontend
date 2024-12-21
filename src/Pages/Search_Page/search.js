import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  styled,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Image from "./searchbg.jpg";
import FlightResults from "./flight";
export default function Search() {
  const [formData, setFormData] = useState({
    from_pos: "",
    to_pos: "",
    date_start: "",
    passenger_seat_count: "",
    client_time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const [locations, setLocations] = useState([]);
  const [flightList, setFlightList] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [fullInformation, setFullInformation] = useState("");
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:3000/position-map");
        setLocations(response.data);
      } catch (error) {
        setSnackbarMessage("Failed to load locations.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setFullInformation("Failed to load locations.");
      }
    };
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "passenger_seat_count" ? Number(value) : value,
    }));
  };

  const searchFlight = async () => {
    if (
      !formData.from_pos ||
      !formData.to_pos ||
      !formData.date_start ||
      !formData.passenger_seat_count
    ) {
      setSnackbarMessage("*All fields are required.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/flights/search",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      //console.log(response);
      if (response.data) {
        setFlightList(response.data);
        setIsShown(true);
      }
    } catch (error) {
      console.log(error);
      setFlightList([]);
        setIsShown(false);
      setSnackbarMessage("No Flight Found");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBookFlight = (row) => {
  
    const bookingDate = new Date().toISOString();
    navigate(
      `/user/booking/${row.flight_id}/${row.plane_id}/${row.from_pos}/${row.to_pos}/${row.time_start}/${row.duration_minute}/${bookingDate}`
    );
  };
  
  const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      borderBottom: "2px solid var(--primary-color)",
      borderRadius: 0,
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  }));

  const StyledFormControl = styled(FormControl)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      borderBottom: "2px solid var(--primary-color)",
      borderRadius: 0,
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  }));

  return (
    <Box
      sx={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: 2,
          borderRadius: 1,
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <SearchIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Search Your Flight
        </Typography>

        {/* Form Input */}
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={2.5}>
            <StyledFormControl fullWidth>
              <InputLabel>From</InputLabel>
              <Select
                name="from_pos"
                value={formData.from_pos}
                onChange={handleChange}
              >
                {locations.map((loc) => (
                  <MenuItem value={loc.position_code} key={loc.position_code}>
                    {loc.real_position}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </Grid>

          <Grid item xs={6} sm={6} md={2.5}>
            <StyledFormControl fullWidth>
              <InputLabel>To</InputLabel>
              <Select
                name="to_pos"
                value={formData.to_pos}
                onChange={handleChange}
              >
                {locations.map((loc) => (
                  <MenuItem value={loc.position_code} key={loc.position_code}>
                    {loc.real_position}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </Grid>

          <Grid item xs={6} sm={6} md={2.5}>
            <StyledTextField
              name="date_start"
              label="Departure Date"
              type="date"
              value={formData.date_start}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          <Grid item xs={6} sm={6} md={2.5}>
            <StyledTextField
              name="passenger_seat_count"
              label="Passengers"
              type="number"
              value={formData.passenger_seat_count}
              onChange={handleChange}
              inputProps={{ min: 1 }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={1}>
            <Button
              onClick={searchFlight}
              variant="contained"
              sx={{ backgroundColor: "#159F91ff", marginTop: 1 }}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        <Typography color="error" sx={{ mt: 2 }}>
          {fullInformation}
        </Typography>
      </Container>

      {/* Flight Results Table */}
      {isShown && (
        <FlightResults
          flightList={flightList}
          onBookFlight={handleBookFlight}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
