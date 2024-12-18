import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/FlightOutlined";
import axios from "axios";
import Image from "../../SignUp_Page/1.jpg";
import styled from "styled-components";
import { tableCellClasses } from "@mui/material";

export default function AddFlight() {
  const [formData, setFormData] = useState({
    plane_id: "",
    from_pos: "",
    to_pos: "",
    time_start: "",
    duration_minute: "",
  });
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [fullInformation, setFullInformation] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFlight, setEditingFlight] = useState(null);
  const [newTimeStart, setNewTimeStart] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#159F91ff",
      color: "#ffffff",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "16px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: "center",
      padding: "10px",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#f9f9f9",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#ffffff",
    },
    "&:hover": {
      backgroundColor: "#e3f2fd",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // Lấy danh sách chuyến bay khi load trang
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    
    if (token) {
      axios
        .get("http://localhost:3000/flights", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFlights(response.data);
          setLoading(false);
          //console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("access_token");
    if (!token) {
      setSnackbarMessage("Authentication token is missing. Please log in.");
      setOpenSnackbar(true);
      return;
    }
  
    const now = new Date();
    const inputTime = new Date(formData.time_start);
  
    if (inputTime <= now) {
      setSnackbarMessage("Departure time must be in the future.");
      setOpenSnackbar(true);
      return;
    }
  
    const duration = parseInt(formData.duration_minute, 10);
    if (!Number.isInteger(duration) || duration <= 0) {
      setSnackbarMessage("Duration must be a positive integer.");
      setOpenSnackbar(true);
      return;
    }
  
    const totalPassengers = parseInt(formData.total_passengers, 10);
    if (!Number.isInteger(totalPassengers) || totalPassengers <= 0) {
      setSnackbarMessage("Total passengers must be a positive integer.");
      setOpenSnackbar(true);
      return;
    }
  
    if (
      !formData.flight_id.trim() ||
      !formData.plane_id.trim() ||
      !formData.from_pos.trim() ||
      !formData.to_pos.trim() ||
      !formData.time_start.trim() ||
      !formData.duration_minute.trim()
    ) {
      setSnackbarMessage("All fields are required.");
      setOpenSnackbar(true);
      return;
    }
  
    if (flights.some((flight) => flight.flight_id === formData.flight_id)) {
      setSnackbarMessage("Flight ID already exists. Please use a unique ID.");
      setOpenSnackbar(true);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3000/flights", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setFlights((prevFlights) => [...prevFlights, response.data]);
      setFormData({
        flight_id: "",
        plane_id: "",
        from_pos: "",
        to_pos: "",
        time_start: "",
        duration_minute: "",
        total_passengers: "",
      });
  
      setSnackbarMessage("Flight added successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error adding flight:", error.response?.data || error.message);
      setSnackbarMessage(
        error.response?.data?.message || "Failed to add flight. Please try again."
      );
      setOpenSnackbar(true);
      setSnackbarSeverity("error"); // Đặt màu đỏ cho Snackbar khi lỗi
    }
  };
  
  

  const handleEditClick = (flight) => {
    setEditingFlight(flight);
    setNewTimeStart(flight.time_start);
    setError("");
  };

  const handleSave = async () => {
    if (new Date(newTimeStart) < new Date()) {
      setError("New start time cannot be earlier than the current time.");
      return;
    }
  
    const token = localStorage.getItem("access_token");
  
    try {
      
      const updatedField = { time_start: newTimeStart };
  
      await axios.patch(
        `http://localhost:3000/flights/${editingFlight.flight_id}`,
        updatedField, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      
      setFlights((prevFlights) =>
        prevFlights.map((flight) =>
          flight.flight_id === editingFlight.flight_id
            ? { ...flight, time_start: newTimeStart }
            : flight
        )
      );
  
      setSnackbarMessage("Flight updated successfully!");
      setOpenSnackbar(true);
      setEditingFlight(null); 
    } catch (error) {
      console.error("Error updating the flight:", error);
      setError("Failed to update the flight. Please try again.");
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ position: "relative", width: "100%", height: "400px" }}
    >
      <Container
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "120%",
          marginTop: 3,
          borderRadius: 2,
          marginBottom: "150px",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "absolute",
          bottom: "-170px",
          left: "50%",
          width: "80%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          padding: 2,
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          gap: 1,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          border: "5px solid #159F91ff",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <FlightIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Add Flight
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={6} sm={6} lg={1.5}>
            <TextField
              name="flight_id"
              label="Flight ID"
              value={formData.flight_id}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={1.5}>
            <TextField
              name="plane_id"
              label="Airplane ID"
              value={formData.plane_id}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={1.5}>
            <TextField
              name="from_pos"
              label="From"
              value={formData.from_pos}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={1.5}>
            <TextField
              name="to_pos"
              label="To"
              value={formData.to_pos}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={2.25}>
            <TextField
              name="time_start"
              label="Departure Time"
              type="datetime-local"
              value={formData.time_start}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={1.5}>
            <TextField
              name="total_passengers"
              label="Passengers"
              type="number"
              value={formData.total_passengers}
              onChange={handleChange}
              fullWidth
              required
              placeholder="Number"
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={1.5}>
            <TextField
              name="duration_minute"
              label="Duration"
              type="number"
              value={formData.duration_minute}
              onChange={handleChange}
              fullWidth
              required
              placeholder="Minutes"
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={0.75}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 1,
                backgroundColor: "#159F91ff",
                color: "white",
                "&:hover": { backgroundColor: "#5A9F68" },
              }}
            >
              ➜
            </Button>
          </Grid>
        </Grid>
        {fullInformation && (
          <Typography color="error">{fullInformation}</Typography>
        )}
      </Container>

      <Container>
        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
          Flight Information
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ color: "#159F91ff" }}>
                <StyledTableCell>Flight ID</StyledTableCell>
                <StyledTableCell>Plane ID</StyledTableCell>
                <StyledTableCell>From</StyledTableCell>
                <StyledTableCell>To</StyledTableCell>
                <StyledTableCell>Start Time</StyledTableCell>
                <StyledTableCell>Total Passengers (min)</StyledTableCell>
                <StyledTableCell>Duration (min)</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.map((flight) => (
                <StyledTableRow key={flight.flight_id}>
                  <StyledTableCell>{flight.flight_id}</StyledTableCell>
                  <StyledTableCell>{flight.plane_id}</StyledTableCell>
                  <StyledTableCell>{flight.from_pos}</StyledTableCell>
                  <StyledTableCell>{flight.to_pos}</StyledTableCell>
                  <StyledTableCell>{flight.time_start}</StyledTableCell>
                  <StyledTableCell>{flight.total_passengers}</StyledTableCell>
                  <StyledTableCell>{flight.duration_minute}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(flight)}
                      sx={{
                        backgroundColor: "#159F91ff",
                        color: "white",
                        "&:hover": { backgroundColor: "#5A9F68" },
                      }}
                    >
                      Edit
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Dialog
        open={editingFlight !== null}
        onClose={() => setEditingFlight(null)}
      >
        <h1>Edit Flight</h1>
        <DialogContent>
          <TextField
            label="Current Start Time"
            value={editingFlight?.time_start || ""}
            fullWidth
            disabled
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="New Start Time"
            type="datetime-local"
            value={newTimeStart}
            onChange={(e) => setNewTimeStart(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingFlight(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenSnackbar(false)}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "left",
  }}
>
  <Alert
    onClose={() => setOpenSnackbar(false)}
    severity={snackbarSeverity}
    sx={{ width: "100%" }}
  >
    {snackbarMessage}
  </Alert>
</Snackbar>

    </Box>
  );
}
