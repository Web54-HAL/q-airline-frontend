import React, { useState, useEffect } from 'react';
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import styled from 'styled-components';
import { tableCellClasses } from '@mui/material';
import Image from "./airline1.jpg";

const theme = createTheme();

export default function Search() {
  const [formData, setFormData] = useState({
    from_pos: "",
    to_pos: "",
    time_start: "",
    passenger_seat_count: "",
  });

  const [locations, setLocations] = useState([]);
  const [flightList, setFlightList] = useState([]);
  const [isShown, setIsShown] = useState(true);
  const [fullInformation, setFullInformation] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5001/locations");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setFullInformation("Failed to load locations.");
      }
    };
    fetchLocations();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/search");
      setFlightList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching flight data:", error);
      setError("Failed to fetch flight data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#159F91ff", // Blue color for the header
      color: "#ffffff", // White text for better contrast
      fontWeight: "bold", // Make text bold
      textAlign: "center", // Center-align text in header
      fontSize: "16px", // Slightly larger font size
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: "center", // Center-align text in body
      padding: "10px", // Add consistent padding
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#f9f9f9", // Light gray for odd rows
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#ffffff", // White for even rows
    },
    "&:hover": {
      backgroundColor: "#e3f2fd", // Light blue on hover
    },
    "&:last-child td, &:last-child th": {
      border: 0, // Remove border for the last row
    },
  }));


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const searchflight = async () => {
    if (!formData.from_pos || !formData.to_pos || !formData.time_start || !formData.passenger_seat_count) {
      setFullInformation("*All fields are required.");
      return;
    }

    setFullInformation(""); // Clear error message
    try {
      await axios.post("http://localhost:5001/searchflights", formData); // Chỉ đẩy dữ liệu lên server
      setIsShown(true); // Hiển thị bảng
    } catch (error) {
      console.error("Error searching flights:", error);
      setFullInformation("Failed to search flights.");
    }
    //     try {
    //       const response = await axios.post("http://localhost:5001/searchflights", formData);
    //       if (response.data.length > 0) {
    //         setFlightList(response.data);
    //         setIsShown(true); // Show table
    //       } else {
    //         setFlightList([]);
    //         setFullInformation("No flights found.");
    //         setIsShown(true); // Hide table if no results
    //       }
    //     } catch (error) {
    //       console.error("Error searching flights:", error);
    //       setFullInformation("Failed to search flights.");
    //     }
  };

  return (
    <ThemeProvider theme={theme}>
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <SearchIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            Search Your Flight
          </Typography>

          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <FormControl fullWidth sx={{ minWidth: 150 }}>
                <InputLabel>From</InputLabel>
                <Select
                  name="from_pos"
                  value={formData.from_pos}
                  onChange={handleChange}
                  required
                >
                  {locations.map((loc, index) => (
                    <MenuItem value={loc} key={index}>
                      {loc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ minWidth: 150 }}>
                <InputLabel>To</InputLabel>
                <Select
                  name="to_pos"
                  value={formData.to_pos}
                  onChange={handleChange}
                  required
                >
                  {locations.map((loc, index) => (
                    <MenuItem value={loc} key={index}>
                      {loc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                name="time_start"
                label="Departure Date"
                type="date"
                value={formData.time_start}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                sx={{ maxWidth: 150 }}
              />
            </Grid>
            <Grid item>
              <TextField
                name="passenger_seat_count"
                label="Passengers"
                type="number"
                value={formData.passenger_seat_count}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                required
                sx={{ maxWidth: 150 }}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={searchflight}
                variant="contained"
                sx={{
                  mt: 1, mb: 2, backgroundColor: '#159F91ff',
                  color: 'white',
                  '&:hover': { backgroundColor: '#5A9F68' }
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          <div style={{ textAlign: "center", color: "red", marginTop: 2 }}>{fullInformation}</div>
        </Container>

        {isShown && (
          <Container maxWidth="lg" sx={{ marginTop: 5 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Flight No.</StyledTableCell>
                    <StyledTableCell align="right">From</StyledTableCell>
                    <StyledTableCell align="right">To</StyledTableCell>
                    <StyledTableCell align="right">
                      Take-Off time&nbsp;(UTC)
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Landing time&nbsp;(UTC)
                    </StyledTableCell>
                    <StyledTableCell align="right">Book</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flightList.map((row) => (
                    <StyledTableRow key={row.flight_ID}>
                      <StyledTableCell component="th" scope="row">
                        {row.flight_ID}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.from_airport}</StyledTableCell>
                      <StyledTableCell align="right">{row.to_airport}</StyledTableCell>
                      <StyledTableCell align="right">{row.starting_time}</StyledTableCell>
                      <StyledTableCell align="right">{row.stopping_time}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Button variant="outlined">Book</Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
}