import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Card,
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
  
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access_token'); 
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
      const token = localStorage.getItem('access_token'); 
      await axios.delete(`http://localhost:3000/tickets/cancel/${selectedBooking.ticket_id}`, {
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
  

  const handleOpenDialog = (booking) => {
    setSelectedBooking(booking);
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
                bgcolor: "var(--primary-color)", 
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
            <Card
  sx={{
    display: "flex",
    alignItems: "center",
    padding: 0,
    bgcolor: "var(--background-color)", 
  }}
>
 
  <Box
    sx={{
      flex: 1,
      textAlign: "left",
      padding: 2,
      bgcolor: "var(--left-background-color)", 
      color: "var(--primary-color)", 
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
      }}
    >
      Total
    </Typography>
  </Box>

 
  <Box
    sx={{
      flex: 1,
      textAlign: "center",
      padding: 2,
      bgcolor: "var(--right-background-color)", 
      color: "var(--secondary-color)",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
      }}
    >
      {bookings.length}
    </Typography>
  </Box>
</Card>

            </Grid>
            <Grid item xs={6}>
            <Card
  sx={{
    display: "flex",
    alignItems: "center",
    padding: 0,
    bgcolor: "var(--background-color)",
  }}
>

  <Box
    sx={{
      flex: 1,
      textAlign: "left",
      padding: 2,
      bgcolor: "var(--left-background-color)", 
      color: "var(--primary-color)",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
      }}
    >
      Pending
    </Typography>
  </Box>

 
  <Box
    sx={{
      flex: 1,
      textAlign: "center",
      padding: 2,
      bgcolor: "var(--right-background-color)", 
      color: "var(--secondary-color)", 
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
      }}
    >
      {
        bookings.filter(
          (booking) => new Date(booking.booking_date) > new Date()
        ).length
      }
    </Typography>
  </Box>
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

      
      <Grid container spacing={4}>
        {bookings.map((booking, index) => {
          const isCancelable =
            booking.time_start > new Date().toISOString(); // Check thời hạn hủy vé
          return (
            <Grid item xs={12} sm={6} key={booking.id}>
             
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
                adultCount={booking.adult_count}
                childCount={booking.children_count}
                infantCount={booking.infant_count}
              />
              {/* Cancel Button */}
              {isCancelable && (
                <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end", 
    marginTop: 2,
  }}
>
  <Button
    variant="contained"
    color="secondary"
    onClick={() => handleOpenDialog(booking)}
  >
    Cancel
  </Button>
</Box>

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
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        message="Booking cancelled successfully!"
      />
    </Box>
  );
};

export default BookingList;
