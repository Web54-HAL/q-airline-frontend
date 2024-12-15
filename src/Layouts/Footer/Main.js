import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#159F91ff",
        color: "white",
        padding: "20px 0",
        marginTop: "auto",
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Q Airline
            </Typography>
            <Typography variant="body2">
              Book your flights with ease and convenience. Fly to your dream destinations!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
  <Typography
    variant="body2"
    component={Link}
    to="/search"
    sx={{
      textDecoration: "none",
      color: "inherit",
    }}
  >
    Search
  </Typography>
  <Typography
    variant="body2"
    component={Link}
    to="/home"
    sx={{
      textDecoration: "none",
      color: "inherit",
    }}
  >
    Home
  </Typography>
</Box>

    
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">Email: support@Qairline.com</Typography>
            <Typography variant="body2">Phone: +1 800 123 456</Typography>
            <Typography variant="body2">Address: 123 Aviation Street, SkyCity</Typography>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Typography variant="body2">
            © {new Date().getFullYear()}Qairline . All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
