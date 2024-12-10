import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Image from "./1.jpg";
import "../../../src/color.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const theme = createTheme();
export default function Booking() {
  const [formData, setFormData] = useState({
    flight_id: "",
    booking_date: "",
    adult_count: 1,
    children_count: 0,
    infant_count: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const {
    type,
    from,
    to,
    departure,
    seat_count,
    flight_id,
    customer_id,
    booking_date,
  } = useParams();
  const flightdetails = [
    { name: "Type", detail: type },
    { name: "From", detail: from },
    { name: "To", detail: to },
    { name: "Departure Time", detail: departure },
    { name: "Seat Count ", detail: seat_count },
  ];

  const handleSubmit = () => {};

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{bgcolor:"var(--primary-color)", m:"0", p:"0"}}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            m: "0px 30px",
            position: "relative",
            top:"15px",
            bgcolor: "var(--primary-color)",
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 110, color: "white" }} />
        </Avatar>
        <Grid container spacing={3} sx={{ width: "96%", margin: "15px 10px" }}>
          <Grid item xs={5}>
            <Paper
              variant="outlined"
              sx={{
                height: "70%",
                width: "100%",
                p: 3,
                boxShadow: 2,
                borderRadius: "8px",
                background: "var(--background-color)", // Gradient cam
                color: "#48B89F",
              }}
            >
              <Typography
                component="h5"
                variant="h5"
                align="center"
                bgcolor="var(--primary-color)" // Cam nhạt cho tiêu đề
                color="white"
                sx={{ borderRadius: "4px", p: 1 }}
              >
                Flight Details
              </Typography>
              <Grid
                container
                justifyContent={"center"}
                marginTop={2}
                spacing={2}
              >
                {flightdetails.map((flight) => (
                  <React.Fragment key={flight.name}>
                    <Grid item xs={4}>
                      <Typography
                        align="right"
                        gutterBottom
                        sx={{
                          color: "#248277", // Chữ cam đậm
                          fontWeight: "bold",
                        }}
                      >
                        {flight.name}:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography
                        align="left"
                        gutterBottom
                        sx={{
                          color: "#48B89F", // Chữ cam nhạt vừa phải
                        }}
                      >
                        {flight.detail}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper
              variant="outlined"
              sx={{
                height: "100%",
                p: 10,
                boxShadow: 2,
                borderRadius: "8px",
                background: "var(--background-color)", // Gradient cam nhạt
              }}
            >
              <Typography
                variant="h5"
                align="center"
                bgcolor="var(--primary-color)" // Cam nhạt
                color="white"
                sx={{ borderRadius: "4px", p: 1, mb: 2 }}
              >
                Booking Information
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  fullWidth
                  label="Customer ID"
                  name="customer_id"
                  value={formData.flight_id}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "var(--primary-color)" }, // Viền cam nhạt
                      "&:hover fieldset": {
                        borderColor: "var(--primary-color)5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--primary-color)",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Flight ID"
                  name="flight_id"
                  value={flight_id}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "var(--primary-color)" },
                      "&:hover fieldset": {
                        borderColor: "var(--primary-color)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--primary-color)",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Booking Date"
                  name="booking_date"
                  type="datetime-local"
                  value={booking_date}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "var(--primary-color)" },
                      "&:hover fieldset": {
                        borderColor: "var(--primary-color)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--primary-color)",
                      },
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Adults"
                    name="adult_count"
                    type="number"
                    value={formData.adult_count}
                    onChange={handleChange}
                    inputProps={{ min: 1 }}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "var(--primary-color)" },
                        "&:hover fieldset": {
                          borderColor: "var(--primary-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--primary-color)",
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Children"
                    name="children_count"
                    type="number"
                    value={formData.children_count}
                    onChange={handleChange}
                    inputProps={{ min: 0 }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "var(--primary-color)" },
                        "&:hover fieldset": {
                          borderColor: "var(--primary-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--primary-color)",
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Infants"
                    name="infant_count"
                    type="number"
                    value={formData.infant_count}
                    onChange={handleChange}
                    inputProps={{ min: 0 }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "var(--primary-color)" },
                        "&:hover fieldset": {
                          borderColor: "var(--primary-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--primary-color)0",
                        },
                      },
                    }}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "var(--primary-color)", // Nút cam nhạt
                    "&:hover": {
                      backgroundColor: "var(--primary-color)", // Cam đậm hơn khi hover
                    },
                  }}
                >
                  Book Now
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Container
          component="main"
          sx={{
            mb: 4,
            alignItems: "center",
            display: "flex",
          }}
        ></Container>
      </Box>
    </ThemeProvider>
  );
}
