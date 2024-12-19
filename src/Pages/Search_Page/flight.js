import React from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import styled from "@emotion/styled";

// Styled components
const TicketContainer = styled(Card)({
  display: "flex",
  flexDirection: "row",
  marginBottom: "24px", // Tăng khoảng cách giữa các vé
  maxWidth: "800px", // Giới hạn chiều rộng tối đa
  width: "100%", // Đảm bảo vé chiếm đủ không gian trên màn hình nhỏ
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const LeftSection = styled(Box)({
  flex: 1,
  padding: "24px", // Tăng khoảng đệm
  backgroundColor: "#E1F5FE",
});

const RightSection = styled(Box)({
  width: "35%", // Tăng chiều rộng phần phải
  padding: "24px", // Tăng khoảng đệm
  backgroundColor: "#81D4FA",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const formatDateWith12Hour = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};

const FlightResults = ({ flightList, onBookFlight }) => {
  return (
    <Box sx={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <Grid container spacing={3} justifyContent="center">
        {flightList.map((flight) => (
          <Grid
            item
            xs={12}
            sm={6}
            key={flight.flight_id}
            display="flex"
            justifyContent="center"
          >
            <TicketContainer>
              {/* Left Section */}
              <LeftSection>
                <Typography variant="h5" fontWeight="bold">
                  Flight ID: {flight.flight_id}
                </Typography>
                <Typography variant="subtitle1">
                  Plane ID: {flight.plane_id}
                </Typography>
                <Typography variant="subtitle1">
                  Departure: {formatDateWith12Hour(flight.time_start)}
                </Typography>
                <Typography variant="subtitle1">
                  Available Seats: {flight.available_seats}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h4" fontWeight="bold">
                  {flight.from_pos} → {flight.to_pos}
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <FlightTakeoffIcon fontSize="large" />
                  <Typography variant="h6" fontWeight="bold" ml={1}>
                    Q Airline
                  </Typography>
                </Box>
              </LeftSection>

              {/* Right Section */}
              <RightSection>
                <Box>
                  <Typography variant="subtitle1" color="text.secondary">
                    From
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {flight.from_pos}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" mt={2}>
                    To
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {flight.to_pos}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" mt={2}>
                    Duration
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {flight.duration_minute} mins
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large" // Tăng kích thước nút
                  onClick={() => onBookFlight(flight)}
                >
                  Book
                </Button>
              </RightSection>
            </TicketContainer>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FlightResults;
