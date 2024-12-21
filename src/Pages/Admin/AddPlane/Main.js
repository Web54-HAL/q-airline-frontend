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
import Image from './backgroundadmin.jpg';
import styled from 'styled-components';
import { tableCellClasses } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import "../../../color.css";
export default function AddPlane() {
  const [formData, setFormData] = useState({
    manufacturer: '',
    customer_seat_count: '',
  });
  const handleEditOpen = (plane) => {
    setDialogData({
      manufacturer: plane.manufacturer,
      customer_seat_count: plane.customer_seat_count,
    });
    setEditData(plane); // Lưu plane cần chỉnh sửa
    setOpenDialog(true); // Mở dialog
  };
  
  const handleEditClose = () => {
    setOpenDialog(false);
    setEditData(null);
  };
  

  const [editData, setEditData] = useState(null); // Lưu thông tin dòng đang chỉnh sửa
const [openDialog, setOpenDialog] = useState(false); // Trạng thái mở dialog
const [dialogData, setDialogData] = useState({
  manufacturer: "",
  customer_seat_count: "",
}); // Dữ liệu trong dialog

  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [fullInformation, setFullInformation] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // chưa xử lí edit
  const handleUpdate = async () => {
    const token = localStorage.getItem("access_token");
  
    try {
      const response = await axios.patch(
        `http://localhost:3000/planes/${editData.plane_id}`,
        {
          manufacturer: dialogData.manufacturer ,
          customer_seat_count: Number(dialogData.customer_seat_count),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setPlanes((prevPlanes) =>
        prevPlanes.map((plane) =>
          plane.plane_id === editData.plane_id
            ? { ...plane, ...response.data } 
            : plane
        )
      );
      setSnackbarMessage("Plane updated successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setOpenDialog(false); 
      setEditData(null);
    } catch (error) {
      setSnackbarMessage("Failed to update plane.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("access_token");
  
   
    
  
    if (!formData.manufacturer || !formData.customer_seat_count) {
      setFullInformation('*All fields are required.');
      setSnackbarMessage('*All fields are required.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
  
    if (Number(formData.customer_seat_count) <= 0) {
      setFullInformation('Seat count must be greater than 0.');
      setSnackbarMessage('Seat count must be greater than 0.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
  
    // Reset thông báo lỗi
    setFullInformation('');
    console.log("Form data being submitted:", formData);
  
    try {
      // Gửi request POST để thêm máy bay
      const response = await axios.post(
        'http://localhost:3000/planes',
        {
          manufacturer: formData.manufacturer,
          customer_seat_count: Number(formData.customer_seat_count), 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
        }
      );
  
      console.log('Plane added successfully:', response.data);
  
     
      setSnackbarMessage('Plane added successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
  
     
      setPlanes((prevPlanes) => [...prevPlanes, response.data]);
  
      // Reset form
      setFormData({
        manufacturer: '',
        customer_seat_count: '',
      });
    } catch (error) {
      // Xử lý lỗi khi thêm máy bay
      const errorMessage = error.response?.data?.message || 'Failed to add plane. Please try again.';
      console.error('Error adding plane:', errorMessage);
  
      // Hiển thị thông báo lỗi
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  const handleCancel = async (plane_id) => {
    const token = localStorage.getItem("access_token");
  
    try {
      await axios.delete(`http://localhost:3000/planes/${plane_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setPlanes((prevPlanes) => prevPlanes.filter((plane) => plane.plane_id !== plane_id));
      setSnackbarMessage("Plane canceled successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Failed to cancel plane.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };
  
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get('http://localhost:3000/planes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPlanes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching planes:', error);
        setSnackbarMessage('Failed to load planes data.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <div>Loading...</div>; 
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#159F91ff', 
      color: '#ffffff', 
      fontWeight: 'bold', 
      textAlign: 'center', 
      fontSize: '16px', 
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: 'center', 
      padding: '10px', 
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#f9f9f9', 
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#ffffff', 
    },
    '&:hover': {
      backgroundColor: '#e3f2fd', 
    },
    '&:last-child td, &:last-child th': {
      border: 0, 
    },
  }));

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative', width: '100%', height: '400px' }}>
   
      <Container
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '120%',
          marginTop: 4,
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
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          border: '5px solid #159F91ff',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "var(--primary-color)" }}>
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
          <div style={{ color: 'red' }}>{fullInformation}</div>
        </div>
      </Container>

      <Container sx={{ mt: 5, paddingBottom: 5 }}>
        <h1>Planes Information</h1>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 300, 
            overflow: 'auto', 
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Manufacturer</StyledTableCell>
                <StyledTableCell>Customer Seat Count</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {planes.map((plane) => (
    <TableRow key={plane.plane_id}>
      <TableCell sx={{ textAlign: 'center' }}>{plane.plane_id}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{plane.manufacturer}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{plane.customer_seat_count}</TableCell>
      <TableCell sx={{ width: '20%', textAlign: 'center' }}>
        <Button
          
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEditOpen(plane)}
          sx={{ marginRight: 1, bgcolor: "var(--primary-color)" }}
        >
          Edit 
        </Button>
        <Button
        
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleCancel(plane.plane_id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      </Container>
{/* Dialog để chỉnh sửa Manufacturer và Seat Count */}
<Dialog open={openDialog} onClose={handleEditClose}>
  <DialogTitle>Edit Plane</DialogTitle>
  <DialogContent>
    <TextField
      label="Manufacturer"
      value={dialogData.manufacturer}
      onChange={(e) => setDialogData({ ...dialogData, manufacturer: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Customer Seat Count"
      type="number"
      value={dialogData.customer_seat_count}
      onChange={(e) =>
        setDialogData({ ...dialogData, customer_seat_count: e.target.value })
      }
      fullWidth
      margin="normal"
    />
  </DialogContent>
  <DialogActions  >
    <Button onClick={handleEditClose} color="error">
      Cancel
    </Button>
    <Button onClick={handleUpdate} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>

      {/* Snackbar để hiển thị thông báo */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} 
        onClose={() => setOpenSnackbar(false)} 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}  sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
