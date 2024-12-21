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
import Image from "./signupbg3.jpg";
import { useNavigate } from "react-router-dom";
import "../../color.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const theme = createTheme();

export default function SignUp() {
  
  const [openSnackbar, setOpenSnackbar] = useState(false); // Trạng thái hiển thị Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Nội dung thông báo
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Loại thông báo (success, error, etc.)
  
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
  const addUser = async () => {
    // Kiểm tra nếu có trường nào bị bỏ trống
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
      setSnackbarMessage("*All fields are required.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setCheckPassword("");
      return;
    }
  
    // Kiểm tra định dạng số điện thoại
    if (!/^\+84[0-9]{9,10}$/.test(phoneNumber)) {
      setFullInfromation("");
      setSnackbarMessage("*Phone number must start with +84 and have 10-11 digits.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setCheckPassword("");
      return;
    }
  
    // Kiểm tra định dạng email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setFullInfromation("");
      setSnackbarMessage("*Invalid email format.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setCheckPassword("");
      return;
    }
  
    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (password !== confirm_password) {
      setFullInfromation("");
      setSnackbarMessage("*Password and confirm password do not match.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setCheckPassword("");
      return;
    }
  
    // Gửi yêu cầu đăng ký
    try {
      const response = await Axios.post("http://localhost:3000/auth/register", {
        family_name: firstName,
        given_name: lastName,
        date_of_birth: birthday,
        gender: gender,
        phone_num: phoneNumber,
        email: email,
        password: password,
      });
  
      // Nếu đăng ký thành công
      if (response.status === 201) {
        setFullInfromation("");
        setCheckPassword("");
        setSnackbarMessage("Registration successful! Redirecting to login...");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/SignIn");
        }, 3000);
      }
    } catch (error) {
      // Nếu có lỗi từ server
      if (error.response && error.response.data && error.response.data.message) {
        setSnackbarMessage(`*Error: ${error.response.data.message}`);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      } else {
        // Lỗi kết nối
        setSnackbarMessage("*Unable to connect to the server. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
      setFullInfromation("");
      setCheckPassword("");
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
              margin: "150px 0px",
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
                  <Grid item xs={6} sm={6}>
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
                  <Grid item xs={6} sm={6}>
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
                  <Grid item xs={6} sm={6}>
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

                  <Grid item xs={6} sm={6}>
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
                            console.log("Selected Gender:", event.target.value); 
                          }}
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
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
                 
                </Grid>
                <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: 4,
  }}
>
  <Button
    onClick={addUser}
    type="button"
    variant="contained"
    sx={{
      bgcolor: "var(--primary-color)",
      width: "50%",
      minWidth: "180px",
      color: "white",
      "&:hover": { bgcolor: "var(--primary-color-dark)" },
    }}
  >
    Sign Up
  </Button>
</Box>


                <div style={{ color: "red" }}>{fullInfromation}</div>
                <div style={{ color: "red" }}>{checkPassword}</div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Snackbar
  open={openSnackbar}
  autoHideDuration={3000} // Tự động đóng sau 3 giây
  onClose={() => setOpenSnackbar(false)} // Đóng snackbar khi kết thúc
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
  <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
    {snackbarMessage}
  </Alert>
</Snackbar>

    </>
  );
}
