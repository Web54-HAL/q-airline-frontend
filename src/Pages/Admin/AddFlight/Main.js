import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import FlightIcon from '@mui/icons-material/FlightOutlined';
import axios from 'axios';
import Image from '../../SignUp_Page/1.jpg';
import styled from 'styled-components';
import { tableCellClasses } from '@mui/material';

export default function AddFlight() {
  const [formData, setFormData] = useState({
    plane_id: '',
    from_pos: '',
    to_pos: '',
    time_start: '',
    duration_minute: '',
  });

  const [fullInformation, setFullInformation] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFlight, setEditingFlight] = useState(null);
  const [newTimeStart, setNewTimeStart] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#159F91ff', // Blue color for the header
      color: '#ffffff', // White text for better contrast
      fontWeight: 'bold', // Make text bold
      textAlign: 'center', // Center-align text in header
      fontSize: '16px', // Slightly larger font size
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: 'center', // Center-align text in body
      padding: '10px', // Add consistent padding
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#f9f9f9', // Light gray for odd rows
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#ffffff', // White for even rows
    },
    '&:hover': {
      backgroundColor: '#e3f2fd', // Light blue on hover
    },
    '&:last-child td, &:last-child th': {
      border: 0, // Remove border for the last row
    },
  }));

  // Lấy danh sách chuyến bay khi load trang
  useEffect(() => {
    axios
      .get('http://localhost:5001/flights')
      .then((response) => {
        setFlights(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setLoading(false);
      });
  }, []);

  // Hàm xử lý thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm thêm chuyến bay mới
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu hợp lệ
    const now = new Date().toISOString();
    if (formData.time_start < now) {
      alert('Time start must not be earlier than now.');
      return;
    }

    if (!Number.isInteger(Number(formData.duration_minute)) || Number(formData.duration_minute) <= 0) {
      alert('Duration must be a positive integer.');
      return;
    }

    if (!formData.plane_id || !formData.from_pos || !formData.to_pos || !formData.time_start || !formData.duration_minute) {
      setFullInformation('*All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/flights', formData);
      setSnackbarMessage('Flight added successfully!');
      setOpenSnackbar(true); // Show Snackbar when the flight is added

      // Thêm chuyến bay mới vào danh sách
      setFlights((prevFlights) => [...prevFlights, response.data]);

      // Reset form
      setFormData({
        plane_id: '',
        from_pos: '',
        to_pos: '',
        time_start: '',
        duration_minute: '',
      });
      setFullInformation('');
    } catch (error) {
      console.error('Error adding flight:', error);
      setSnackbarMessage('Failed to add flight.');
      setOpenSnackbar(true); // Show Snackbar if an error occurs
    }
  };

  // Hàm xử lý khi nhấn nút chỉnh sửa
  const handleEditClick = (flight) => {
    setEditingFlight(flight);
    setNewTimeStart(flight.time_start);
    setError('');
  };

  // Hàm xử lý lưu thay đổi khi chỉnh sửa
  const handleSave = async () => {
    if (new Date(newTimeStart) < new Date(editingFlight.time_start)) {
      setError('New time start cannot be earlier than the current time.');
      return;
    }

    try {
      const updatedFlight = { ...editingFlight, time_start: newTimeStart };
      await axios.put(`http://localhost:5001/flights/${editingFlight.id}`, updatedFlight);

      // Cập nhật danh sách chuyến bay
      setFlights((prevFlights) =>
        prevFlights.map((flight) =>
          flight.id === editingFlight.id ? updatedFlight : flight
        )
      );
      setSnackbarMessage('Flight updated successfully!'); // Show success message when updating
      setOpenSnackbar(true); // Show Snackbar on successful update
      setEditingFlight(null); // Đóng dialog
    } catch (error) {
      console.error('Error updating the flight:', error);
      setError('Failed to update the flight. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative', width: '100%', height: '400px' }}>
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
          marginBottom: '150px',
        }}
      />
      {/* Form thêm chuyến bay */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'absolute',
          bottom: '-170px',
          left: '50%',
          width: '80%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <TextField name="plane_id" label="Airplane ID" value={formData.plane_id} onChange={handleChange} fullWidth required sx={{ width: '150px' }} />
          </Grid>
          <Grid item>
            <TextField name="from_pos" label="From" value={formData.from_pos} onChange={handleChange} fullWidth required sx={{ width: '150px' }} />
          </Grid>
          <Grid item>
            <TextField name="to_pos" label="To" value={formData.to_pos} onChange={handleChange} fullWidth required sx={{ width: '150px' }} />
          </Grid>
          <Grid item>
            <TextField
              name="time_start"
              label="Departure Time"
              type="datetime-local"
              value={formData.time_start}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
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
              placeholder="minutes"
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
                '&:hover': { backgroundColor: '#5A9F68' },
              }}
            >
              ➜
            </Button>
          </Grid>
        </Grid>
        {fullInformation && <Typography color="error">{fullInformation}</Typography>}
      </Container>

      {/* Bảng thông tin chuyến bay */}
      <Container>
        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
          Flight Information
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 300, // Chiều cao tối đa
            overflow: 'auto', // Thanh cuộn dọc nếu quá giới hạn
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ color: '#159F91ff' }}>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Plane ID</StyledTableCell>
                <StyledTableCell>From</StyledTableCell>
                <StyledTableCell>To</StyledTableCell>
                <StyledTableCell>Start Time</StyledTableCell>
                <StyledTableCell>Duration (min)</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.map((flight) => (
                <StyledTableRow key={flight.id}>
                  <StyledTableCell>{flight.id}</StyledTableCell>
                  <StyledTableCell>{flight.plane_id}</StyledTableCell>
                  <StyledTableCell>{flight.from_pos}</StyledTableCell>
                  <StyledTableCell>{flight.to_pos}</StyledTableCell>
                  <StyledTableCell>{flight.time_start}</StyledTableCell>
                  <StyledTableCell>{flight.duration_minute}</StyledTableCell>
                  <StyledTableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEditClick(flight)} sx={{
                      backgroundColor: '#159F91ff',
                      color: 'white',
                      '&:hover': { backgroundColor: '#5A9F68' }
                    }}>
                      Edit
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Dialog chỉnh sửa */}
      <Dialog open={editingFlight !== null} onClose={() => setEditingFlight(null)}>
        <h1>Edit Flight</h1>
        <DialogContent>
          <TextField
            label="Current Start Time"
            value={editingFlight?.time_start || ''}
            fullWidth
            disabled
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="New Start Time"
            type="datetime-local"
            value={newTimeStart}
            onChange={(e) => setNewTimeStart(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingFlight(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar để hiển thị thông báo */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Thời gian hiển thị Snackbar
        onClose={() => setOpenSnackbar(false)} // Đóng Snackbar sau khi thời gian trôi qua
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
