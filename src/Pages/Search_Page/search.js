import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import FlightTable from './flight'; // Import bảng hiển thị kết quả
import Image from './airline1.jpg';

const theme = createTheme();

export default function Search() {
  const [formData, setFormData] = useState({
    from_pos: '',
    to_pos: '',
    time_start: '',
    passenger_seat_count: '',
  });

  const [flightList, setFlightList] = useState([]);
  const [fullInformation, setFullInformation] = useState('');

  // Lấy JWT từ localStorage
  const token = localStorage.getItem('jwtToken'); 

  // Xử lý thay đổi form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gửi tìm kiếm chuyến bay
  const searchFlight = async () => {
    if (!formData.from_pos || !formData.to_pos || !formData.time_start || !formData.passenger_seat_count) {
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
      console.log(formData);
      setFlightList(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error('Error searching flights:', error);
      setFullInformation('Failed to search flights.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: 3,
            borderRadius: 1,
            boxShadow: 3,
            marginTop: 10,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <SearchIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
            Search Your Flight
          </Typography>

          {/* Form Tìm kiếm */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="From"
                name="from_pos"
                value={formData.from_pos}
                onChange={handleChange}
                placeholder="Enter a location"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="To"
                name="to_pos"
                value={formData.to_pos}
                onChange={handleChange}
                placeholder="Enter a location"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Departure Date"
                name="time_start"
                type="date"
                value={formData.time_start}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Passengers"
                name="passenger_seat_count"
                type="number"
                value={formData.passenger_seat_count}
                onChange={handleChange}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button
                onClick={searchFlight}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Search
              </Button>
            </Grid>
          </Grid>

          {/* Thông báo lỗi */}
          {fullInformation && (
            <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
              {fullInformation}
            </Typography>
          )}

          {/* Bảng kết quả chuyến bay */}
          <Box sx={{ mt: 4 }}>
            <FlightTable flightList={flightList} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
