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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import styled from "styled-components";
import { tableCellClasses } from "@mui/material";
import Image from "./airline1.jpg";
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Search() {
  const [formData, setFormData] = useState({
    from_pos: "",
    to_pos: "",
    time_start: "",
    passenger_seat_count: "",
    client_time_zone: ""
  });
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [flightList, setFlightList] = useState([]);
  const [isShown, setIsShown] = useState(false);
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

  // Lấy JWT từ localStorage
  const token = localStorage.getItem('jwtToken'); 

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

  const StyledTextField = styled(TextField)(() => ({
    '& .MuiInput-underline:before': {
      borderBottom: '2px solid var(--primary-color)',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid var(--primary-color)',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid var(--primary-color)',
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const searchflight = async () => {
  //   if (
  //     !formData.from_pos ||
  //     !formData.to_pos ||
  //     !formData.time_start ||
  //     !formData.passenger_seat_count ||
  //     !formData.client_time_zone
  //   ) {
  //     setFullInformation("*All fields are required.");
  //     return;
  //   }

  //   setFullInformation(""); // Clear error message
  //   try {
  //     await axios.post("http://localhost:5001/searchflights", formData); // Chỉ đẩy dữ liệu lên server
  //     setIsShown(true); // Hiển thị bảng
  //   } catch (error) {
  //     console.error("Error searching flights:", error);
  //     setFullInformation("Failed to search flights.");
  //   }
  //       try {
  //         const response = await axios.post("http://localhost:5001/searchflights", formData);
  //         if (response.data.length > 0) {
  //           setFlightList(response.data);
  //           setIsShown(true); // Show table
  //         } else {
  //           setFlightList([]);
  //           setFullInformation("No flights found.");
  //           setIsShown(true); // Hide table if no results
  //         }
  //       } catch (error) {
  //         console.error("Error searching flights:", error);
  //         setFullInformation("Failed to search flights.");
  //       }
  // };

  // Gửi tìm kiếm chuyến bay
  const searchFlight = async () => {
    if (!formData.from_pos || !formData.to_pos || !formData.time_start || !formData.passenger_seat_count || !formData.client_time_zone) {
      setFullInformation('*All fields are required.');
      return;
    }

    setFullInformation(''); // Clear error message
    try {
      const response = await axios.post(
        'http://localhost:3000/flights',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Sending formData:", formData);

      if (response.data.length > 0) {
        setFlightList(response.data);
        setIsShown(true); // Show table
      } else {
        setFlightList([]);
        setFullInformation("No flights found.");
        setIsShown(true); // Hide table if no results
      }
    } catch (error) {
      console.error("Error searching flights:", error);
      // setFullInformation("Failed to search flights.");
      if (error.response) {
        // Lỗi từ phía server (status code 4xx hoặc 5xx)
        console.error("Server Response:", error.response.data);
        setFullInformation(error.response.data.message || "Server error occurred.");
      } else if (error.request) {
        // Không nhận được phản hồi từ server
        console.error("Request Error:", error.request);
        setFullInformation("No response from server. Check server status.");
      } else {
        // Lỗi trong lúc tạo request
        console.error("Error Message:", error.message);
        setFullInformation("Request failed. Please try again.");
      }
    }
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
          maxWidth="lg"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 2,
            borderRadius: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <SearchIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            Search Your Flight
          </Typography>

          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>From</InputLabel>
                <Select
                  name="from_pos"
                  value={formData.from_pos}
                  onChange={handleChange}
                  required
                >
                  {locations.map((loc) => (
                    <MenuItem value={loc.name} key={loc.id}>
                      {loc.name}
                    </MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={2}>
              <FormControl fullWidth >
                <InputLabel>To</InputLabel>
                <Select
                  name="to_pos"
                  value={formData.to_pos}
                  onChange={handleChange}
                  required
                >
                  {locations.map((loc) => (
                    <MenuItem value={loc.name} key={loc.id}>
                      {loc.name}
                    </MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <StyledTextField
              fullWidth
                name="time_start"
                label="Departure Date"
                type="date"
                value={formData.time_start}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                // sx={{ minWidth: 180 }}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={2}>
              <StyledTextField fullWidth
                name="passenger_seat_count"
                label="Passengers"
                type="number"
                value={formData.passenger_seat_count}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                required
                // sx={{ minWidth: 150 }}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={2}>
              <TextField fullWidth
                label="Time Zone"
                name="client_time_zone"
                type="number"
                value={formData.client_time_zone}
                onChange={handleChange}
                required
                inputProps={{ min: 1, max: 24 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={1}>
              <Button
                onClick={searchFlight}
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  backgroundColor: "#159F91ff",
                  color: "white",
                  "&:hover": { backgroundColor: "#5A9F68" },
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          <div style={{ textAlign: "center", color: "red", marginTop: 2 }}>
            {fullInformation}
          </div>
        </Container>

        {isShown && (
          <Container maxWidth="lg" sx={{ marginTop: 5 }}>
            <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto" }}>
              <Table sx={{ minWidth: 1000 }} aria-label="customized table" stickyHeader>
                <TableHead >
                  <TableRow>
                    <StyledTableCell>Flight No.</StyledTableCell>
                    <StyledTableCell align="right">From</StyledTableCell>
                    <StyledTableCell align="right">To</StyledTableCell>
                    <StyledTableCell align="right">
                      Take-Off time&nbsp;(UTC)
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Duration - Minute
                    </StyledTableCell>
                    <StyledTableCell align="right">Book</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flightList.map((row) => (
                    <StyledTableRow key={row.flight_id}>
                      <StyledTableCell component="th" scope="row">
                        {row.flight_id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.from_pos}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.to_pos}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.time_start}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.duration_minute}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            const bookingDate = new Date().toISOString();
                            navigate(`/user/booking/${row.flight_id}/${row.from_pos}/${row.to_pos}/${row.time_start}/${bookingDate}`);
                          }}
                        >
                          Book
                        </Button>
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

