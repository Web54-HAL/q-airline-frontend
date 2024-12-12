import * as React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import axios from "axios";
import "../../../src/color.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const theme = createTheme();
export default function Booking() {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //////////////////
  function convertToDateTimeLocal(isoString) {
    try {
      // Chuyển đổi chuỗi thành đối tượng Date
      const dateObject = new Date(isoString);

      if (isNaN(dateObject.getTime())) {
        throw new Error("Invalid ISO string");
      }
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getDate()).padStart(2, "0");
      const hours = String(dateObject.getHours()).padStart(2, "0");
      const minutes = String(dateObject.getMinutes()).padStart(2, "0");

      // Trả về định dạng 'YYYY-MM-DDTHH:mm'
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (error) {
      console.error("Error converting ISO string:", error.message);
      return null;
    }
  }

  /////////////////
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Hàm đặt vé
  const handleSubmit = async () => {
    const bookingData = {
      ...formData,
    };

    try {
      const response = await axios.post(
        "/",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Thêm JWT vào header
          },
        }
      );

      if (response.status === 200) {
        setSnackbarMessage("Booking successful!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Booking failed, please try again later.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Đóng snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  ///////////////////////////////////
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [formData, setFormData] = useState({
    flight_id: "",
    booking_date: "",
    adult_count: 1,
    children_count: 0,
    infant_count: 0,
  });

  const flightId = queryParams.get("flightId");
  const from = queryParams.get("from");
  const to = queryParams.get("to");
  const departureTime = convertToDateTimeLocal(
    queryParams.get("departureTime")
  );
  const bookingDate = convertToDateTimeLocal(queryParams.get("bookingDate"));
  const flightdetails = [
    { name: "From", detail: from },
    { name: "To", detail: to },
    { name: "Departure Time", detail: departureTime },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "var(--primary-color)" }}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            m: "0px 30px",
            position: "relative",
            top: "15px",
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
                height: "60%",
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
                width: "95%",
                p: 5,
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
                  value={formData.flightId}
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
                  value={flightId}
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
                  value={bookingDate}
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
            {/* Hiển thị Snackbar */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={4000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity={snackbarSeverity}
                sx={{ width: "100%" }}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
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