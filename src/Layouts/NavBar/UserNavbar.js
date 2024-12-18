import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Image from "./logo.jpg";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);
  let navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLogout = () => {
    setOpenDialog(false);
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#159F91ff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", paddingX: "16px" }}>
        <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/user")}>
          <img
            src={Image}
            alt="Logo"
            style={{ height: "70px", width: "250px", objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: "20px",
            justifyContent: "flex-end",
            flex: 1,
            marginRight: "30px",
          }}
        >
          <Button sx={{ color: "#ffffff", fontWeight: "bold" }} onClick={() => navigate("/user")}>
            Home
          </Button>
          <Button sx={{ color: "#ffffff", fontWeight: "bold" }} onClick={() => navigate("/user/search")}>
            Search Flight
          </Button>
          <Button sx={{ color: "#ffffff", fontWeight: "bold" }} onClick={() => navigate("/user/bookinglist")}>
            My Booking
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#C3FEFC",
              color: "#1976D2",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#E3F2FD" },
            }}
            onClick={handleLogoutClick}
          >
            Log Out
          </Button>
        </Box>

        <IconButton
          sx={{ display: { xs: "block", md: "none" }, color: "#ffffff" }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <MenuItem onClick={() => navigate("/user")}>Home</MenuItem>
        <MenuItem onClick={() => navigate("/user/search")}>Search Flight</MenuItem>
        <MenuItem onClick={() => navigate("/user/bookinglist")}>My Booking</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Log Out</MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Log Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
