import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import styled from "styled-components";

// Styled components
const FlightCard = styled(Card)(({ theme }) => ({
  border: "1px solid #e0e0e0",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
  padding: "10px",
}));

const FlightResults = ({ flightList, onBookFlight }) => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={3}>
        {flightList.map((row) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            key={row.flight_id}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              alignItems: { xs: "center", sm: "center", md: "center" },
            }}
          >
            {/* Card hiển thị thông tin */}
            <FlightCard
              sx={{
                flex: 1,
                width: "100%",
                marginBottom: { xs: "10px", md: "0" },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Flight No: {row.flight_id}
                </Typography>
                <Typography variant="body1">
                  <strong>Plane ID:</strong> {row.plane_id}
                </Typography>
                <Typography variant="body1">
                  <strong>From:</strong> {row.from_pos} →{" "}
                  <strong>To:</strong> {row.to_pos}
                </Typography>
                <Typography variant="body1">
                  <strong>Take-Off:</strong> {row.time_start}
                </Typography>
                <Typography variant="body1">
                  <strong>Duration:</strong> {row.duration_minute} mins
                </Typography>
                <Typography variant="body1">
                  <strong>Available Seats:</strong> {row.available_seats}
                </Typography>
              </CardContent>
            </FlightCard>

            {/* Nút Book */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                alignItems: "center",
                marginLeft: { md: "20px" },
                marginTop: { xs: "10px", md: "0" },
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => onBookFlight(row)}
                sx={{
                  backgroundColor: "#159F91ff",
                  "&:hover": { backgroundColor: "#107866" },
                  width: { xs: "100%", sm: "50%", md: "auto" },
                }}
              >
                Book
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FlightResults;
