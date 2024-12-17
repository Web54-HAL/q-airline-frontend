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
  Alert,
} from "@mui/material";
import axios from "axios";

const TicketSearch = () => {
  const [query, setQuery] = useState({
    ticket_id: "",
    customer_id: "",
    flight_id: "",
    booking_date: "",
    adult_count: "",
    children_count: "",
    infant_count: "",
    total_passengers: "",
  });

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateQueryInURL = (query) => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    const queryString = params.toString();
    window.history.pushState(null, "", `?${queryString}`);
  };

  const searchTickets = async () => {
    try {
      setError(null);

      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `http://localhost:3000/tickets?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length > 0) {
        console.log(response.data);
        setResults(response.data);
        updateQueryInURL(query);
      } else {
        setResults([]);
        setError("No matching tickets found.");
      }
    } catch (err) {
      setResults([]);
      setError("Failed to fetch tickets. Please try again later.");
    }
  };

  const isHighlighted = (fieldValue, queryValue) => {
    if (!queryValue) return false;
    return fieldValue
      ?.toString()
      .toLowerCase()
      .includes(queryValue.toLowerCase());
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 2,
          color: "var(--primary-color)",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Search Tickets
      </Typography>

    
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          marginBottom: 4,
          padding: 2,
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
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
        </Box>
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <TextField
            label="Adult Count"
            name="adult_count"
            value={query.adult_count}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Children Count"
            name="children_count"
            value={query.children_count}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Infant Count"
            name="infant_count"
            value={query.infant_count}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Total Passengers"
            name="total_passengers"
            value={query.total_passengers}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button
            variant="contained"
            onClick={searchTickets}
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "#ffffff",
              fontWeight: "bold",
              paddingX: 4,
              "&:hover": {
                backgroundColor: "var(--primary-color)",
              },
            }}
          >
            Search
          </Button>
        </Box>
      </Box>

    
      {error && (
        <Alert
          severity="warning"
          sx={{
            marginBottom: 2,
            backgroundColor: "#FFF5F5",
            color: "#D32F2F",
          }}
        >
          {error}
        </Alert>
      )}

    
      {results.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "8px",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: "var(--primary-color)",
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  Ticket ID
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  Customer ID
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  Flight ID
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  Booking Date
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  Adult Count
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  Children Count
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  Infant Count
                </TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  Total Passengers
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((ticket) => (
                <TableRow key={ticket.ticket_id}>
                  <TableCell
                    sx={{
                      backgroundColor: isHighlighted(
                        ticket.ticket_id,
                        query.ticket_id
                      )
                        ? "var(--background-color)"
                        : "inherit",
                    }}
                  >
                    {ticket.ticket_id}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: isHighlighted(
                        ticket.customer_id,
                        query.customer_id
                      )
                        ? "var(--background-color)"
                        : "inherit",
                    }}
                  >
                    {ticket.customer_id}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: isHighlighted(
                        ticket.flight_id,
                        query.flight_id
                      )
                        ? "var(--background-color)"
                        : "inherit",
                    }}
                  >
                    {ticket.flight_id}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: isHighlighted(
                        ticket.booking_date,
                        query.booking_date
                      )
                        ? "var(--background-color)"
                        : "inherit",
                    }}
                  >
                    {new Date(ticket.booking_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: isHighlighted(
                        ticket.adult_count,
                        query.adult_count
                      )
                        ? "var(--background-color)"
                        : "inherit",
                    }}
                  >
                    {ticket.adult_count}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: isHighlighted(
                        ticket.children_count,
                        query.children_count
                      )
                        ? "var(--background-color)"
                        : "inherit",
                    }}
                  >
                    {ticket.children_count}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: isHighlighted(
                        ticket.infant_count,
                        query.infant_count
                      )
                        ? "var(--background-color)"
                        : "inherit",
                    }}
                  >
                    {ticket.infant_count}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: isHighlighted(
                        ticket.total_passengers,
                        query.total_passengers
                      )
                        ? "var(--background-color)"
                        : "inherit",
                    }}
                  >
                    {ticket.total_passengers}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TicketSearch;
