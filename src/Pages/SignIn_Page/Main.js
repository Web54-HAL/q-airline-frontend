
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
import Image from "../SignUp_Page/1.jpg";

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

  const checkUser = () => {
    Axios.post("http://localhost:5000/login", {
      name: name,
      password: password,
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        
        localStorage.setItem("access_token", response.data.access_token);

        // Save credentials if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem("saved_user", name);
          localStorage.setItem("saved_password", password);
        } else {
          localStorage.removeItem("saved_user");
          localStorage.removeItem("saved_password");
        }

        navigate("/");
      } else {
        setWrong("Invalid username or password");
      }
    }).catch((error) => {
      console.error("Error during login:", error);
      setWrong("An error occurred. Please try again.");
    });
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
        <Grid item xs={1} sm={7} />
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
              <Avatar sx={{ m: 1, bgcolor: "blue" }}>
                <FlightIcon sx={{ color: "white" }} />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Typography>
            <Box
              component="form"
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
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
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
