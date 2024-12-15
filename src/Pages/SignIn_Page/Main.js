
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { useState, useEffect } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import { useNavigate } from "react-router-dom";
import Image from "../SignUp_Page/6.jpg";
import "../../color.css";
import "@fontsource/poppins"; // Import toàn bộ font
import { jwtDecode } from "jwt-decode";


const theme = createTheme();

export default function SignInSide() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [wrong, setWrong] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    // Check if credentials are saved
    const savedUser = localStorage.getItem("saved_user");
    const savedPassword = localStorage.getItem("saved_password");
    if (savedUser && savedPassword) {
      setName(savedUser);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const checkUser = async () => {
    if (!name || !password) {
      setWrong("Please fill in both username and password.");
      return;
    }
  
    try {
      const response = await Axios.post("http://localhost:3000/auth/login", {
        username: name,
        password: password,
      });
  
      if (response.status === 200) {
        // Lưu token vào localStorage
        const token = response.data.access_token;
        localStorage.setItem("access_token", token);
  
        // Giải mã token để xem thông tin
        try {
          const decodedToken = jwtDecode(token); // Giải mã token
          console.log("Decoded Token:", decodedToken);
  
          // Kiểm tra role và điều hướng
          if (decodedToken.role === "Admin") {
            navigate("/admin/dashboard"); // Điều hướng đến trang Admin Dashboard
          } else {
            navigate("/user/dashboard"); // Điều hướng đến trang User Dashboard
          }
        } catch (decodeError) {
          console.error("Error decoding token:", decodeError);
        }
  
        // Lưu thông tin nếu Remember Me được chọn
        if (rememberMe) {
          localStorage.setItem("saved_user", name);
          localStorage.setItem("saved_password", password);
        } else {
          localStorage.removeItem("saved_user");
          localStorage.removeItem("saved_password");
        }
      } else {
        setWrong("Invalid username or password.");
      }
    } catch (error) {
      if (error.response) {
        setWrong(error.response.data.message || "Invalid username or password.");
      } else if (error.request) {
        setWrong("Unable to connect to the server. Please try again later.");
      } else {
        setWrong("An unexpected error occurred. Please try again.");
      }
      console.error("Error during login:", error);
    }
  };
  
  
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: "90vh",
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Grid
  item
  xs={1}
  sm={7}>
  
</Grid>

        <Grid
          item
          xs={11}
          sm={5}
          sx={{
            position : "relative",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(15px)",
              borderRadius: "12px",
              padding: "20px 10px",
              margin: "20px 0px",
              right: "15px",
              boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box
            sx={{
              my: 0,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "var(--primary-color)" }}>
                <FlightIcon sx={{ color: "white" }} />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ color: "var(--primary-color)", fontWeight:"bold"}}>
                Sign in
              </Typography>
            </Typography>
            <Box
              noValidate
              sx={{
                mt: 1,
              }}
            >
              <TextField
                onChange={(event) => setName(event.target.value)}
                margin="normal"
                required
                fullWidth
                id="user"
                label="Username:"
                name="user"
                autoComplete="user"
                autoFocus
                value={name}
              />
              <TextField
                onChange={(event) => setPassword(event.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label={<Typography>Remember me</Typography>}
              />
              <Button
                onClick={checkUser}
                type="button"
                fullWidth
                variant="contained"
                
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "var(--primary-color)" 
                }}
              >
                Sign In
              </Button>
              <Typography sx={{ textAlign: "center" }}>{wrong}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
