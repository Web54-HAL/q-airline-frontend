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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Image from "./airline1.jpg";
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
  const [fullInformation, setFullInformation] = useState("");

  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const savedFlightList = sessionStorage.getItem("flightList");
  const savedFormData = sessionStorage.getItem("formData");

  if (savedFlightList) {
    setFlightList(JSON.parse(savedFlightList));
    setIsShown(true); 
  }
  if (savedFormData) {
    setFormData(JSON.parse(savedFormData));
  }
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/locations");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
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
    if (!formData.from_pos || !formData.to_pos || !formData.date_start || !formData.passenger_seat_count) {
      setFullInformation("*All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/flights/search",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.length > 0) {
        setFlightList(response.data);
        setIsShown(true);
      } else {
        setFlightList([]);
        setFullInformation("No flights found.");
      }
    } catch (error) {
      console.error("Error searching flights:", error);
      setFullInformation("Failed to search flights.");
    }
  };

  const handleBookFlight = (row) => {
    const bookingDate = new Date().toISOString();
    sessionStorage.setItem("flightList", JSON.stringify(flightList));
    sessionStorage.setItem("formData", JSON.stringify(formData));
   const token = localStorage.getItem('access_token');
   if(token) {
    navigate(`/user/booking/${row.flight_id}/${row.plane_id}/${row.from_pos}/${row.to_pos}/${row.time_start}/${row.duration_minute}/${bookingDate}`);
   }
    else {
      navigate("/");
    }
  };

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
        maxWidth="lg"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: 2,
          borderRadius: 1,
          marginTop: 2,
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
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>From</InputLabel>
              <Select name="from_pos" value={formData.from_pos} onChange={handleChange}>
                {locations.map((loc) => (
                  <MenuItem value={loc.name} key={loc.id}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>To</InputLabel>
              <Select name="to_pos" value={formData.to_pos} onChange={handleChange}>
                {locations.map((loc) => (
                  <MenuItem value={loc.name} key={loc.id}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <TextField
              name="date_start"
              label="Departure Date"
              type="date"
              value={formData.date_start}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="passenger_seat_count"
              label="Passengers"
              type="number"
              value={formData.passenger_seat_count}
              onChange={handleChange}
              inputProps={{ min: 1 }}
              fullWidth
            />
          </Grid>

          <Grid item xs={1}>
            <Button onClick={searchFlight} variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>

        <Typography color="error" sx={{ mt: 2 }}>
          {fullInformation}
        </Typography>
      </Container>

      {/* Flight Results Table */}
      {isShown && <FlightResults flightList={flightList} onBookFlight={handleBookFlight} />}
    </Box>
  );
}
