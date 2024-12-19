import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Divider
} from "@mui/material";
// import styled from "styled-components";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import styled from "@emotion/styled";

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

const TicketContainer = styled(Box)({
  backgroundColor: "#E1F5FE",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "row",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  fontFamily: "Arial, sans-serif",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const LeftSection = styled(Box)({
  backgroundColor: "#B3E5FC",
  flex: 1,
  padding: "16px",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
});

const RightSection = styled(Box)({
  backgroundColor: "#81D4FA",
  width: "30%",
  padding: "16px",
  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",
});

const TicketRow = styled(Grid)({
  marginBottom: "8px",
});

function formatDateWith12Hour(dateString) {
  const date = new Date(dateString);

  // Lấy ngày theo định dạng YYYY-MM-DD
  const formattedDate = date.toISOString().split('T')[0];

  // Định dạng giờ 12 giờ với AM/PM
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const formattedTime = date.toLocaleString('en-US', options);

  // Kết hợp ngày và giờ
  return `${formattedDate} ${formattedTime}`;
}

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
            lg={6}
            key={row.flight_id}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              alignItems: { xs: "center", sm: "center", md: "center" },
            }}
          >
            <TicketContainer sx={{ width: "90%" }}>
              {/* Left Section */}
              <LeftSection>
                <Grid container spacing={10} sx={{ marginTop: 1, marginLeft: 1 }}>
                  {/* Flight Information */}
                  <TicketRow container>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        FLIGHT ID
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {row.flight_id}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        PLANE ID
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {row.plane_id}
                      </Typography>
                    </Grid>
                  </TicketRow>

                  {/* Departure and Seat */}
                  <TicketRow container>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        DEPARTURE
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                      {formatDateWith12Hour(row.time_start)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        AVAILABLE SEAT
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {row.available_seats}
                      </Typography>
                    </Grid>
                  </TicketRow>

                  {/* Flight Route */}
                  <Divider sx={{ my: 2 }} />
                  <TicketRow container>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="h2" fontWeight="bold">
                        {row.from_pos}
                      </Typography>
                      <Typography variant="subtitle2">FROM</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="h2" fontWeight="bold">
                        {row.to_pos}
                      </Typography>
                      <Typography variant="subtitle2">TO</Typography>
                    </Grid>
                  </TicketRow>
                </Grid>

                {/* Footer */}
                <Box display="flex" alignItems="center" mt={2}>
                  <FlightTakeoffIcon />
                  <Typography variant="subtitle1" fontWeight="bold" ml={1}>
                    Q Airline
                  </Typography>
                </Box>
              </LeftSection>

              {/* Right Section */}
              <RightSection>
                <Typography variant="subtitle2" color="text.secondary" mt={1}>
                  FROM
                </Typography>
                <Typography fontWeight="bold">{row.from_pos}</Typography>

                <Typography variant="subtitle2" color="text.secondary" mt={2}>
                  TO
                </Typography>
                <Typography fontWeight="bold">{row.to_pos}</Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  DEPARTURE
                </Typography>
                <Typography fontWeight="bold">{formatDateWith12Hour(row.time_start)}</Typography>

                <Typography variant="subtitle2" color="text.secondary" mt={2}>
                  DURATION
                </Typography>
                <Typography fontWeight="bold">{row.duration_minute} mins</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "center" },
                    // marginBottom:4,
                    marginTop: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onBookFlight(row)}
                    // sx={{
                    //   backgroundColor: "#159F91ff",
                    //   "&:hover": { backgroundColor: "#107866" },
                    // }}
                  >
                    Book
                  </Button>
                </Box>
              </RightSection>
            </TicketContainer>

          </Grid>
        ))}
      </Grid>
    </Box >
  );
};

export default FlightResults;
