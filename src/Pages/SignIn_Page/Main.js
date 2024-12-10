
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
// import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Image from "../SignUp_Page/1.jpg";

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      user: data.get("user"),
      password: data.get("password"),
    });
  };

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState("");

  // const { user, setUser } = useAuth();
  let navigate = useNavigate();
  const checkUser = () => {
    Axios.post("http://localhost:5000/login", {
      name: name,
      password: password,
    }).then((response) => {
      if (response.status === 200) {
        console.log("success", response.data);
        localStorage.setItem("access_token", response.data.access_token); // Lưu token
        navigate("/");
      }
      else {
        setWrong("Invalid username or password")
      }
      
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
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
    position: "relative",
    background: "linear-gradient(135deg, #ef6c00, #ffcc80)", 
    borderRadius: "12px",
    padding: "20px 10px",
    // margin: "0px 0px",
    // right: "15px",
    boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.3)",
  }}
>
  <Box
    sx={{
      my: 8,
      mx: 4,
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
      <Avatar sx={{ m: 1, bgcolor: "#e65100" }}> 
        <FlightIcon sx={{ color: "white" }} />
      </Avatar>
      <Typography component="h1" variant="h5" > 
Sign in
      </Typography>
    </Typography>
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        mt: 1,
      }}
    >
      <TextField
        onChange={(event) => {
          setName(event.target.value);
        }}
        margin="normal"
        required
        fullWidth
        id="user"
        label="Username:"
        name="user"
        autoComplete="user"
        autoFocus
        sx={{
          "& .MuiInputLabel-root": { color: "white" }, 
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "#ffcc80" }, 
            "&.Mui-focused fieldset": { borderColor: "#e65100" }, 
            "& input": { color: "white" }, 
          },
        }}
      />
      <TextField
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        sx={{
          "& .MuiInputLabel-root": { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "#ffcc80" },
            "&.Mui-focused fieldset": { borderColor: "#e65100" },
            "& input": { color: "white" },
          },
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            value="remember"
            sx={{
              color: "white",
              "&.Mui-checked": { color: "#e65100" }, 
            }}
          />
        }
        label={
          <Typography sx={{ color: "white" }}>
            Remember me
          </Typography>
        }
      />
      <Button
        onClick={checkUser}
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: "#e65100", // Nút cam đậm
          "&:hover": {
            backgroundColor: "#bf360c", // Hover cam đậm hơn
          },
        }}
      >
        Sign In
      </Button>

      <Typography sx={{ color: "white", textAlign: "center" }}>
        {wrong}
      </Typography>
    </Box>
  </Box>
</Grid>

      </Grid>
    </ThemeProvider>
  );
}
