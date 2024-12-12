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
  Snackbar,
  Alert,
} from '@mui/material';
import FlightIcon from '@mui/icons-material/FlightOutlined';
import axios from 'axios';
import Image from '../../SignUp_Page/1.jpg';
import styled from 'styled-components';
import { tableCellClasses } from '@mui/material';

export default function AddPlane() {
  const [formData, setFormData] = useState({
    manufacturer: '',
    customer_seat_count: '',
  });

  const [fullInfromation, setFullInfromation] = useState('');
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu các trường bị bỏ trống
    if (!formData.manufacturer || !formData.customer_seat_count) {
      setFullInfromation('*All fields are required.');
      return;
    }

    // Reset lỗi
    setFullInfromation('');

    try {
      const response = await axios.post('http://localhost:5001/planes', formData);
      console.log('Data added successfully:', response.data);
      setSnackbarMessage('Plane added successfully!');
      setOpenSnackbar(true); // Show Snackbar when the plane is added

      // Thêm chuyến bay mới vào danh sách planes mà không cần gọi lại API
      setPlanes((prevPlanes) => [...prevPlanes, response.data]);

      // Reset form
      setFormData({
        manufacturer: '',
        customer_seat_count: '',
      });
    } catch (error) {
      console.error('Error adding plane:', error);
      setSnackbarMessage('Failed to add plane.');
      setOpenSnackbar(true); // Show Snackbar if an error occurs
    }
  };

  useEffect(() => {
    // Lấy dữ liệu từ API
    axios
      .get('http://localhost:5001/planes')
      .then((response) => {
        setPlanes(response.data); // Lưu dữ liệu vào state
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the planes data!', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị thông báo khi dữ liệu đang được tải
  }

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

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative', width: '100%', height: '400px' }}>
      {/* Ảnh nền */}
      <Container
        sx={{
          backgroundImage: `url(${Image})`, // Thay link ảnh thực tế
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
        maxWidth="md"
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
          width: '70%',
          display: 'flex', // Sử dụng flexbox để căn giữa
          flexDirection: 'column', // Sắp xếp các phần tử theo chiều dọc
          justifyContent: 'center', // Căn giữa theo chiều ngang
          border: '5px solid #159F91ff',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <FlightIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Add Plane
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <TextField
              name="manufacturer"
              label="Manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              fullWidth
              required
              sx={{ width: '150px' }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="customer_seat_count"
              label="Seat Amount"
              type="number"
              value={formData.customer_seat_count}
              onChange={handleChange}
              inputProps={{ min: 1 }}
              fullWidth
              required
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
        <div style={{ textAlign: 'center', marginBottom: 1 }}>
          <div style={{ color: 'red' }}>{fullInfromation}</div>
        </div>
      </Container>

      <Container sx={{ mt: 5 }}>
        <h1>Planes Information</h1>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 300, // Giới hạn chiều cao bảng, tối đa 5 hàng
            overflow: 'auto', // Kích hoạt thanh cuộn nếu có quá nhiều hàng
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Manufacturer</StyledTableCell>
                <StyledTableCell>Customer Seat Count</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planes.map((plane) => (
                <StyledTableRow key={plane.id}>
                  <StyledTableCell>{plane.id}</StyledTableCell>
                  <StyledTableCell>{plane.manufacturer}</StyledTableCell>
                  <StyledTableCell>{plane.customer_seat_count}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

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
