import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Avatar,
  Typography,
} from '@mui/material';
import FlightIcon from '@mui/icons-material/FlightOutlined';
import axios from 'axios';
import Image from './backgroundadmin.jpg';

export default function AddFlight() {
  const [formData, setFormData] = useState({
    plane_id: '',
    from_pos: '',
    to_pos: '',
    time_start: '',
    duration_minute: '',
  });

  const [fullInfromation, setFullInfromation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra time_start không được nhỏ hơn ngày hiện tại
    const now = new Date().toISOString();
    if (formData.time_start < now) {
      alert('Time start must not be earlier than now.');
      return;
    }

    // Kiểm tra duration_minute phải là số nguyên dương
    if (!Number.isInteger(Number(formData.duration_minute)) || Number(formData.duration_minute) <= 0) {
      alert('Duration must be a positive integer.');
      return;
    }

    if (!formData.plane_id || !formData.from_pos || !formData.to_pos || !formData.time_start || !formData.duration_minute) {
      setFullInfromation("*All fields are required.");
      return;
    } 

    try {
      const response = await axios.post('http://localhost:5001/flights', formData);
      console.log('Data added successfully:', response.data);
      alert('Flight added successfully!');
      setFormData({
        plane_id: '',
        from_pos: '',
        to_pos: '',
        time_start: '',
        duration_minute: '',
      });
    } catch (error) {
      console.error('Error adding flight:', error);
      alert('Failed to add flight.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ position: 'relative', width: '100%', height: '400px' }}
    >
      {/* Ảnh nền */}
      <Container
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '120%',
          marginTop: 12,
          borderRadius: 2,
        }}
      />
      <Container
        maxWidth="lg"
        sx={{
          position: 'absolute',
          bottom: '-170px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          border: '5px solid #159F91ff',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <FlightIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Add Flight
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <TextField
              name="plane_id"
              label="Airplane ID"
              value={formData.plane_id}
              onChange={handleChange}
              fullWidth
              required
              sx={{ width: '150px' }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="from_pos"
              label="From"
              value={formData.from_pos}
              onChange={handleChange}
              fullWidth
              required
              sx={{ width: '150px' }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="to_pos"
              label="To"
              value={formData.to_pos}
              onChange={handleChange}
              fullWidth
              required
              sx={{ width: '150px' }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="time_start"
              label="Departure Time"
              type="datetime-local"
              value={formData.time_start}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
              sx={{ width: '220px' }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="duration_minute"
              label="Duration"
              type="number"
              value={formData.duration_minute}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='minutes'
              inputProps={{ min: 1 }}
              sx={{ width: '150px' }}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 1,
                maxWidth: 100,
                backgroundColor: '#159F91ff',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#5A9F68',
                },
              }}
            >
              ➜
            </Button>
          </Grid>
        </Grid>
        <div style={{ textAlign: "center", marginBottom: 1 }}>
            <div style={{ color: "red" }}>{fullInfromation}</div>
        </div>
      </Container>
    </Box>
  );
}
