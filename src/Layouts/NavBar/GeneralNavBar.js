import React, { useRef } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Image from "./logo.jpg"; // Path to your logo image

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#159F91ff", // Navbar background color
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", paddingX: "16px" }}>
        {/* Logo Section */}
        <Box
          sx={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/")} // Logo navigates to Home
        >
          <img
            src={Image}
            alt="Logo"
            style={{
              height: "70px",
              width: "250px",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Navigation Links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: "20px",
            justifyContent: "flex-end",
            flex: 1,
            marginRight: "30px",
          }}
        >
          <Button
            sx={{ color: "#ffffff", fontWeight: "bold" }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            sx={{ color: "#ffffff", fontWeight: "bold" }}
            onClick={() => navigate("/search")}
          >
            Search
          </Button>
        </Box>

        {/* Login/Register */}
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outlined"
            sx={{
              color: "#ffffff",
              borderColor: "#ffffff",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#ffffff", color: "#1976D2" },
            }}
            onClick={() => navigate("/SignIn")}
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#C3FEFC",
              color: "#1976D2",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#E3F2FD" },
            }}
            onClick={() => navigate("/SignUp")}
          >
            Register
          </Button>
        </Box>

        {/* Mobile Menu */}
        <IconButton
          sx={{ display: { xs: "block", md: "none" }, color: "#ffffff" }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Dropdown Menu for Mobile */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
        <MenuItem onClick={() => navigate("/search")}>Search</MenuItem>
        <MenuItem onClick={() => navigate("/SignIn")}>Login</MenuItem>
        <MenuItem onClick={() => navigate("/SignUp")}>Register</MenuItem>
      </Menu>
    </AppBar>
  );
}
