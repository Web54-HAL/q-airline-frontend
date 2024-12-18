import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FlightIcon from "@mui/icons-material/Flight";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import Axios from "axios";
import Image from "./6.jpg";
import { useNavigate } from "react-router-dom";
import "../../color.css";
const theme = createTheme();

export default function SignUp() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      user: data.get("email"),
    });
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [fullInfromation, setFullInfromation] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const addUser = () => {
    if (
      !firstName ||
      !lastName ||
      !birthday ||
      !gender ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirm_password
    ) {
      setFullInfromation("*All fields are required.");
      setCheckPassword("");
    } else if (password != confirm_password) {
      setCheckPassword("*Password and confirm password does not match.");
      setFullInfromation("");
    } else {
      const token = localStorage.getItem("access_token");
      Axios.post("http://localhost:3000/auth/register", {
        family_name: firstName,
        given_name: lastName,
        date_of_birth: birthday,
        gender: gender,
        phone_num: phoneNumber,
        email: email,
        password: password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setOpenSnackbar(true); 
            setTimeout(() => {
              navigate("/SignIn"); 
            }, 2000);
          }
        })
        .catch((error) => {
          if (error.response) {
            setCheckPassword("The email exists");
          } else {
            console.error("Lỗi kết nối:", error.message);
          }
        });
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
  container
  component="main"
  sx={{
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%", 
    minHeight: "100vh", 
    display: "flex",
    paddingLeft : "15px",
    justifyContent: "center",
  }}
>
          <CssBaseline />
          <Grid 
      item 
      xs={12} 
      sm={7} 
      order={1} 
        sx={{paddingTop : "0px"}}
    >
      
    </Grid>
          <Grid
            item
            xs={11}
            sm={5}
            order={2}
            sx={{
            
              position: "relative",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(15px)",
              borderRadius: "12px",
              padding: "20px 10px",
              margin: "90px 0px",
              mt : "40px",
              right: "15px",
              boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.3)",
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                m : 0
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "var(--primary-color)" }}>
                  <FlightIcon />
                </Avatar>

                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
                >
                  Sign up
                </Typography>
              </Box>
              <Box
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={(event) => {
                        setBirthday(event.target.value);
                      }}
                      required
                      fullWidth
                      id="date"
                      label="Date of birth"
                      type="date"
                      name="birthday"
                      autoComplete="family-name"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="gender"
                          value={gender}
                          name="gender"
                          label="Gender"
                          onChange={(event) => {
                            setGender(event.target.value);
                          }}
                        >
                          <MenuItem value={10}>Male</MenuItem>
                          <MenuItem value={20}>Female</MenuItem>
                          <MenuItem value={30}>Custom</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={(event) => {
                        setPhoneNumber(event.target.value);
                      }}
                      required
                      fullWidth
                      type="tel"
                      id="Telephone_Number"
                      label="Phone no."
                      name="phoneNumber"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      required
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      id="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                      }}
                      required
                      fullWidth
                      name="confirm_password"
                      label="Confirm Password"
                      type="password"
                      id="confirm_password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label={
                        <Typography variant="body2" fontSize="14">
                          I confirm....
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  onClick={addUser}
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, bgcolor: "var(--primary-color)" }}
                >
                  Sign Up
                </Button>

                <div style={{ color: "red" }}>{fullInfromation}</div>
                <div style={{ color: "red" }}>{checkPassword}</div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
