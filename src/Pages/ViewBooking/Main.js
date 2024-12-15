import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"; // Import icon user
import Ticket from "./ticket";
import "../../../src/color.css";
import { jwtDecode } from "jwt-decode";
const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const token = localStorage.getItem('access_token'); 
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;
  console.log(decodedToken);
  // Dummy customer information
  
  const   UserID = userId;
  

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access_token'); // Replace with your token source
      console.log(token);
      const response = await axios.get("http://localhost:3000/tickets/booked", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleConfirmCancel = async () => {
    try {
      const token = localStorage.getItem('token'); // Replace with your token source
      await axios.delete(`http://localhost:3000/tickets/${selectedBooking.ticket_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSnackbarOpen(true);
      setOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };
  

  const handleOpenDialog = (bookingId) => {
    setSelectedBooking(bookingId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedBooking(null);
  };

  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      {/* Customer Information */}
      <Grid container spacing={4} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center", padding: 3,  }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto",
                marginBottom: 2,
                bgcolor: "var(--primary-color)", // Set background color for icon
              }}
            >
              <PersonIcon sx={{ fontSize: 40, color: "white" }} /> 
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              User ID : {userId}
            </Typography>
          </Card>
        </Grid>
        {/* Booking Overview */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card sx={{ textAlign: "center", padding: 3, bgcolor: "var(--background-color)" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "var(--primary-color)" }}>
                  My Total Bookings
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {bookings.length}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ textAlign: "center", padding: 3, bgcolor: "var(--background-color)" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "var(--primary-color)" }}>
                  My Pending Bookings
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {
                    bookings.filter(
                      (booking) => new Date(booking.booking_date) > new Date()
                    ).length
                  }
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* My Bookings Section */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "var(--primary-color)",
          // textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
      Bookings List
      </Typography>

      {/* Render Tickets in a Grid */}
      <Grid container spacing={4}>
        {bookings.map((booking, index) => {
          const isCancelable =
            booking.booking_date > new Date().toISOString(); // Check thời hạn hủy vé
          return (
            <Grid item xs={12} sm={6} key={booking.id}>
              {/* Render Ticket component */}
              <Ticket
              ticket_id={booking.ticket_id}
                flight_id={booking.flight_id}
                from_pos={booking.from_pos}
                to_pos={booking.to_pos}
                time_start={booking.time_start}
                bookingDate={booking.booking_date}
                plane_id={booking.plane_id}
                duration_minute={booking.duration_minute}
                customerId={booking.customer_id}
                email={booking.email}
                adultCount={booking.adult_count}
                childCount={booking.children_count}
                infantCount={booking.infant_count}
              />
              {/* Cancel Button */}
              {isCancelable && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleOpenDialog(booking.id)}
                  sx={{ marginTop: 2 }}
                >
                  Cancel
                </Button>
              )}
            </Grid>
          );
        })}
      </Grid>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          Do you want to cancel this ticket?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Tự động đóng sau 3 giây
        onClose={handleCloseSnackbar}
        message="Booking cancelled successfully!"
      />
    </Box>
  );
};

export default BookingList;
