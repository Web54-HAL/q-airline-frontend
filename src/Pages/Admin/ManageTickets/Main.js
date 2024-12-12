import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";

const ManageTickets = () => {
  const [query, setQuery] = useState({
    ticket_id: "",
    customer_id: "",
    flight_id: "",
    booking_date: "",
  });

  const [results, setResults] = useState([]);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const searchTickets = async () => {
    const params = Object.entries(query)
      .filter(([key, value]) => value) 
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    try {
      const response = await axios.get("http://localhost:5000/tickets", {
        params,
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Search Tickets
      </Typography>

      {/* Form Tìm kiếm */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          marginBottom: 4,
        }}
      >
        <TextField
          label="Ticket ID"
          name="ticket_id"
          value={query.ticket_id}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Customer ID"
          name="customer_id"
          value={query.customer_id}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Flight ID"
          name="flight_id"
          value={query.flight_id}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Booking Date"
          name="booking_date"
          type="date"
          value={query.booking_date}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          onClick={searchTickets}
          sx={{ backgroundColor: "#159F91", color: "#ffffff" }}
        >
          Search
        </Button>
      </Box>

      {/* Bảng kết quả */}
      {results.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ticket ID</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Flight ID</TableCell>
                <TableCell>Booking Date</TableCell>
                <TableCell>Adult Count</TableCell>
                <TableCell>Children Count</TableCell>
                <TableCell>Infant Count</TableCell>
                <TableCell>Total Passengers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((ticket) => (
                <TableRow key={ticket.ticket_id}>
                  <TableCell>{ticket.ticket_id}</TableCell>
                  <TableCell>{ticket.customer_id}</TableCell>
                  <TableCell>{ticket.flight_id}</TableCell>
                  <TableCell>
                    {new Date(ticket.booking_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{ticket.adult_count}</TableCell>
                  <TableCell>{ticket.children_count}</TableCell>
                  <TableCell>{ticket.infant_count}</TableCell>
                  <TableCell>{ticket.total_passengers}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Hiển thị khi không có kết quả */}
      {results.length === 0 && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          No tickets found.
        </Typography>
      )}
    </Box>
  );
};

export default ManageTickets;
