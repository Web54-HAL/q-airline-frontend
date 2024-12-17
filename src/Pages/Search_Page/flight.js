// FlightTable.js
import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';

const FlightTable = ({ flightList }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flight No.</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Take-Off time (UTC)</TableCell>
            <TableCell>Landing time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flightList.map((flight) => (
            <TableRow key={flight.flight_id}>
              <TableCell>{flight.from_pos}</TableCell>
              <TableCell>{flight.to_pos}</TableCell>
              <TableCell>{flight.time_start}</TableCell>
              <TableCell>{flight.duration_minute}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FlightTable;
