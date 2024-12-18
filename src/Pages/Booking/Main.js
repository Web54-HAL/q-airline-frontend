import React, { useState, } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Container,
  Avatar,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import axios from "axios";
import "../../color.css";
import { jwtDecode } from "jwt-decode";

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
const token = localStorage.getItem("access_token" );
      let decodedToken = null;

      if (token) {
        try {
          decodedToken = jwtDecode(token);
        } catch (error) {
          console.error("Token decoding failed:", error.message);
        }
      } 
const Booking = () => {
  // Extract URL parameters
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const flight_id = pathParts[3] || ""; // "50"
const plane_id = pathParts[4] || ""; // "10"
const from_pos = pathParts[5] || ""; // "HAN"
const to_pos = pathParts[6] || ""; // "SGN"
const time_start = pathParts[7] || ""; // "2024-12-22T11:30:00+00:00"
const duration_minute = pathParts[8] || ""; // "120"
const bookingDate = pathParts[9] || ""; // "2024-12-18T10:03:20.497Z"



  let customerId = decodedToken.userId;;
 

 
  const [formData, setFormData] = useState({
    adultCount: 1,
    childCount: 0,
    infantCount: 0,
  });

  // Snackbar for notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleConfirmBooking = async () => {
    setDialogOpen(false);
  
    const bookingData = {
      flight_id,
      from_pos,
      to_pos,
      time_start,
      bookingDate,
      duration_minute,
      plane_id,
      customerId,
      adultCount: formData.adultCount,
      childCount: formData.childCount,
      infantCount: formData.infantCount,
    };
  
    try {
    
      const response = await axios.post(
        "http://localhost:3000/tickets",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      if (response.status === 200) {
        setSnackbarMessage("Booking successful!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      if (error.response) {
        setSnackbarMessage(`Booking failed: ${error.response.data.message}`);
        console.log(error.response.data);
      } 
      console.error("Booking failed:", error);
      //setSnackbarMessage("Booking failed, please try again later.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          mb : 5,
          borderRadius: "12px",
          overflow: "hidden",
          p: 3,
          bgcolor: "#f7f9fc",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: 3,
            bgcolor: "var(--primary-color)",
            color: "white",
            borderRadius: "8px",
            p: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "white",
              color: "var(--primary-color)",
              mx: "auto",
              mb: 1,
              width: 60,
              height: 60,
            }}
          >
            <FlightTakeoffIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Booking Details
          </Typography>
        </Box>

        {/* Flight Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2,  color : "var(--primary-color)"}}>
            Flight Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Flight ID:</strong> {flight_id}
              </Typography>
              <Typography>
                <strong>From:</strong> {from_pos}
              </Typography>
              <Typography>
                <strong>To:</strong> {to_pos}
              </Typography>
              <Typography>
                <strong>Plane ID:</strong> {plane_id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Departure Time:</strong> {time_start}
              </Typography>
              <Typography>
                <strong>Duration minutes:</strong> {duration_minute}
              </Typography>
              <Typography>
                <strong>Booking Date:</strong> {bookingDate}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Customer Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color : "var(--primary-color)"}}>
            Customer Information
          </Typography>
          <Typography>
            <strong>Customer ID:</strong> {customerId}
          </Typography>
        </Box>

        {/* Passenger Count */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color : "var(--primary-color)"}}>
            Passenger Count
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <StyledTextField
                fullWidth
                label="Adults"
                name="adultCount"
                type="number"
                value={formData.adultCount}
                onChange={handleInputChange}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledTextField
                fullWidth
                label="Children"
                name="childCount"
                type="number"
                value={formData.childCount}
                onChange={handleInputChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledTextField
                fullWidth
                label="Infants"
                name="infantCount"
                type="number"
                value={formData.infantCount}
                onChange={handleInputChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Submit Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--primary-color)",
              "&:hover": { bgcolor: "var(--primary-color-dark)" },
              px: 4,
            }}
            onClick={handleDialogOpen}
          >
            Confirm Booking
          </Button>
        </Box>
      </Paper>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to confirm this booking?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>No</Button>
          <Button onClick={handleConfirmBooking} variant="contained" color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Booking;
