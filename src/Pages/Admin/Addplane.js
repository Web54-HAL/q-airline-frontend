import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FlightIcon from '@mui/icons-material/FlightOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Axios, * as others from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Image from "./backgroundadmin.jpg";
import TableRow from '@mui/material/TableRow';


const theme = createTheme();

const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) =>
    `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'
    }`,
);

const Flight = [];
const Airplane = [];
const Time = timeSlots;



// fetch('http://localhost:3001/findFlightID').then(response => response.json()).then(data => {

//   for (let i=0;i<data.length;i++){
//     Flight.push(data[i].flight_ID);
//   }   
// });

// fetch('http://localhost:3001/airportID').then(response => response.json()).then(data => {

// for (let i=0;i<data.length;i++){
//   Airplane.push(data[i].airplane_ID);
// }   
// });


const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
    },
  },
};

export default function AddFlight() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

//   const [flight_List, setFlight_List] = useState([]);
//   const [gender, setGender] = useState("");
//   const [flight, setFlight] = useState("");
//   const [airplane, setAirplane] = useState("");
//   const [time, setTime] = useState("");
//   const [date, setDate] = useState("");
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [duration, setDuration] = useState("");
//   let [adder, setAdder] = useState("");
//   const [from_airport, setFrom_airport] = useState("");
//   const [to_airport, setTo_airport] = useState("");
//   const [hours, setHours] = useState('');

const [manufacturer, setManufacturer] = useState("");
const [seatAmount, setSeatAmount] = useState("");
const [airplaneID, setAirplaneID] = useState("");

const handleChange1 = (event) => {
    setManufacturer(event.target.value);
  };

const handleChange2 = (event) => {
    setSeatAmount(event.target.value);
  };

const handleChange3 = (event) => {
    setAirplaneID(event.target.value);
  };

  const giveflight = (event) => {
    //   Axios.post('http://localhost:3001/flightDetails', {   
    //   flight:event.target.value    
    //    }).then((response) => {  
    //     setFlight(event.target.value);
    //     setOrigin(response.data[0].origin);
    //     setDestination(response.data[0].destination);
    //     setDuration(response.data[0].duration);
    //     console.log(response);     
    // });
  }
  const searchflight = () => {
    //   Axios.post('http://localhost:3001/flightDetails', {   
    //   flight:flight     
    //    }).then((response) => {  

    //     setOrigin(response.data[0].origin);
    //     setDestination(response.data[0].destination);
    //     setDuration(response.data[0].duration);   
    // });

    //   Axios.post('http://localhost:3001/addSchedule', {   
    //   flight:flight,  
    //   airplane:airplane,
    //   time:time,
    //   date:date   
    //    }).then((response) => {    
    //       if (response.data[0][0].Added==="Flight schedule can not be assigned"){
    //         setAdder("This airplane can not be assigned to this schedule!");

    //       }else{
    //         setAdder("Flight Schedule is successfully added!");         
    //       }


    // });
  }

  return (
    <Box sx={{ position: "relative", width: "100%", height: "400px" }}>
      {/* Ảnh nền */}
      <Container
        sx={{
          backgroundImage: `url(${Image})`, // Thay link ảnh thực tế
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "120%",
          marginTop: 12,
          borderRadius: 2,
        }}
      />

      {/* Tiêu đề */}
      {/* <Typography
        variant="h3"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
          textAlign: "center",
        }}
      >
        Best deals are waiting for you
      </Typography> */}

      <Container
        maxWidth="md"
        sx={{
          position: "absolute",
          bottom: "-170px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          padding: 2,
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          gap: 1,
          alignItems: "center",
          width: "70%",
          display: "flex", // Sử dụng flexbox để căn giữa
          flexDirection: "column", // Sắp xếp các phần tử theo chiều dọc
          justifyContent: "center", // Căn giữa theo chiều ngang
          border: '5px solid #159F91ff',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <FlightIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Add Plane
        </Typography>
        <Grid Grid component="form" onSubmit={(e) => e.preventDefault()} noValidate
          container
          spacing={2} // Khoảng cách giữa các nút
          justifyContent="center" // Căn giữa các nút theo chiều ngang
          alignItems="center" // Căn giữa các nút theo chiều dọc
        >
          <Grid item>
            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel id="demo-simple-select-label">Airplane ID</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="airplaneID"
                value={airplaneID}
                name="airplaneID"
                label="airplaneID"
                onChange={handleChange3}
              >
                {/* {Airplane.map((test) => <MenuItem value={test}>{test}</MenuItem>)} */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel id="demo-simple-select-label">Manufacturer</InputLabel>
              <Select
                labelId="Manufacturer"
                id="manufacturer"
                name="manufacturer"
                label="manufacturer"
                value={manufacturer}
                onChange={handleChange1}
              // sx={{ marginRight: 1 }}
              // required
              >
                {/* {Location.map((test) => <MenuItem value={test} key={test}>{test}</MenuItem>)} */}
              </Select>
            </FormControl>
          </Grid>
          
          
          <Grid item>
          <TextField
                fullWidth
                label="Seat Amount"
                name="seatAmount"
                type="number"
                value={seatAmount}
                onChange={handleChange2}
                inputProps={{ min: 1 }}
                required
                sx={{ marginRight: 2, maxWidth: 150 }}
              />
          </Grid>

          {/* Nút tìm kiếm */}
          {/* <Button
          variant="contained"
          sx={{
            paddingX: 3,
            backgroundColor: "#159F91ff",
            color: "black",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          →
        </Button> */}
          <Grid item>
            <Button onClick={searchflight}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1, mb: 1, maxWidth: 100, backgroundColor: "#159F91ff", color: "white",
                "&:hover": {
                  backgroundColor: "#5A9F68",
                },
              }}
            >
              ➜
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}