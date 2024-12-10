import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";

import "../../../src/color.css";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenDialog = (bookingId) => {
    setSelectedBooking(bookingId); // Lưu ID booking để hủy
    setOpen(true); // Mở hộp thoại
  };

  const handleCloseDialog = () => {
    setOpen(false); // Đóng hộp thoại
    setSelectedBooking(null);
  };

  const handleConfirmCancel = async () => {
    try {
      // Gửi yêu cầu tới API để xóa booking
      await axios.delete(`http://localhost:5000/bookings/${selectedBooking}`);

      setSnackbarOpen(true); 
      setOpen(false); 
      fetchData(); 
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); 
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // Hàm xử lý hủy vé có phản hồi
  //   const handleCancelBooking = async (bookingId, isCancelable) => {
  //     try {
  //       // Gọi API patch để hủy vé
  //       const response = await axios.delete(
  //         // `http://localhost:5000/bookings/${bookingId}`,
  //         {}
  //       );

  //       if (response.status === 200) {
  //         alert("Booking cancelled successfully.");
  //         // Cập nhật danh sách booking sau khi hủy thành công
  //         setBookings((prev) =>
  //           prev.map((booking) =>
  //             booking.id === bookingId ? { ...booking } : booking
  //           )
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error cancelling booking:", error);
  //       alert("An error occurred while cancelling the booking.");
  //     }
  //   };

  // if (!userData) {
  //   return <Typography>Loading...</Typography>;
  // }

  return (
    <Box sx={{ padding: 4, bgcolor: "var(--primary-color)", height: "100vh" }}>
      <Grid container spacing={2}>
        {/* Thông tin người dùng */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ bgcolor: "var(--background-color)" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "var(--primary-color)",
                    }}
                  />
                </Grid>
                <Grid item>
                  {/* <Typography variant="h6">{userData.name}</Typography>
                  <Typography variant="body2">{userData.phone}</Typography>
                  <Typography variant="body2">{userData.email}</Typography> */}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Tổng quan booking */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card sx={{ bgcolor: "var(--background-color)" }}>
                <CardContent b>
                  <Typography variant="h6" align="center">
                    Total Bookings
                  </Typography>
                  <Typography variant="h4" align="center">
                    {bookings.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ bgcolor: "var(--background-color)" }}>
                <CardContent>
                  <Typography variant="h6" align="center">
                    Pending Bookings
                  </Typography>
                  <Typography variant="h4" align="center">
                    {
                      bookings.filter(
                        (booking) => new Date(booking.booking_date) > new Date()
                      ).length
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Bảng booking */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          My Bookings
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "var(--background-color)" }}>
              <TableRow>
                <TableCell>Sl. No.</TableCell>
                <TableCell>Booking ID</TableCell>
                <TableCell>Booking Type</TableCell>
                <TableCell>Booking Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking, index) => {
                const isCancelable =
                  booking.booking_date > new Date().toISOString(); // Check thời hạn hủy vé
                return (
                  <TableRow key={booking.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.type}</TableCell>
                    <TableCell>{booking.booking_date}</TableCell>
                    <TableCell>
                      {isCancelable ? (
                        <Typography color="green">Pending</Typography>
                      ) : (
                        <Typography color="red">Completed</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={!isCancelable}
                        onClick={() =>
                          handleOpenDialog(booking.id, isCancelable)
                        }
                        sx={{
                          display: !isCancelable ? "none" : "block",
                        }}
                      >
                        Cancel
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleCloseDialog}
                        BackdropProps={{
                          style: { display: "none" }, // Ẩn backdrop
                        }}
                      >
                        <DialogTitle>Confirm Cancellation</DialogTitle>
                        <DialogContent>
                          Do you want to cancel this ticket?
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseDialog} color="primary">
                            No
                          </Button>
                          <Button
                            onClick={handleConfirmCancel}
                            color="secondary"
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000} // Tự động đóng sau 3 giây
                        onClose={handleCloseSnackbar}
                        message="Booking cancelled successfully!"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default BookingList;
