import React from "react";
import { Container, Paper, Box, Typography, Grid, Avatar } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
//import Image from "./5.jpg";

const Ticket = ({
  ticket_id,
  flight_id,
  from_pos,
  to_pos,
  time_start,
  bookingDate,
  plane_id,
  duration_minute,
  customerId,
  email,
  adultCount,
  childCount,
  infantCount,
}) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Paper
        elevation={3}
        sx={{
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          p: 2,
          zIndex: 1,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${Image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: 2,
            bgcolor: "var(--primary-color)",
            color: "white",
            borderRadius: "6px",
            p: 1,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "white",
              color: "var(--primary-color)",
              mx: "auto",
              mb: 1,
              width: 40,
              height: 40,
            }}
          >
            <FlightTakeoffIcon sx={{ fontSize: 24 }} />
          </Avatar>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "16px" }}
          >
            Ticket Details
          </Typography>
        </Box>

        {/* Flight Information */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontSize: "14px",
              color: "var(--primary-color)",
            }}
          >
            Flight Information
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: "12px" }}>
                <strong>Ticket ID:</strong> {ticket_id}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                <strong>Flight ID:</strong> {flight_id}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                <strong>From:</strong> {from_pos}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                <strong>To:</strong> {to_pos}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                <strong>Plane ID:</strong> {plane_id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: "12px" }}>
                <strong>Departure Time:</strong> {time_start}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                <strong>Duration Minutes:</strong> {duration_minute}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                <strong>Booking Date:</strong> {bookingDate}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Customer Information */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontSize: "14px",
              color: "var(--primary-color)",
            }}
          >
            Customer Information
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            <strong>Customer ID:</strong> {customerId}
          </Typography>
          
        </Box>

        {/* Passenger Count */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontSize: "14px",
              color: "var(--primary-color)",
            }}
          >
            Passenger Count
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <Typography sx={{ fontSize: "12px" }}>
                <strong>Adults:</strong> {adultCount}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography sx={{ fontSize: "12px" }}>
                <strong>Children:</strong> {childCount}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography sx={{ fontSize: "12px" }}>
                <strong>Infants:</strong> {infantCount}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Ticket;
