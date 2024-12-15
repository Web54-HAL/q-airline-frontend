import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image1 from '../SignUp_Page/1.jpg';
import Image2 from '../SignUp_Page/1.jpg';
import Image3 from '../SignUp_Page/1.jpg';
import './Main.css';

const images = [Image1, Image2, Image3];

function Main() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main>
      <Paper
        className="main__paper"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      >
        <Box className="main__overlay" />
        <Grid container>
          <Grid item md={6}>
            <Box className="main__content">
              <Typography component="h1" className="main__title">
                <center>B Airways</center>
              </Typography>
              <Typography className="main__subtitle">
                <center>We fly you Everywhere</center>
              </Typography>
              <Grid container spacing={1} className="main__buttons-container">
                <Grid item xs={12} sm={3}>
                  <Typography align="right">
                    <Button className="main__button">Register</Button>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography align="center">
                    <Button className="main__button">Login</Button>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography align="left">
                    <Button className="main__button">Proceed as a guest</Button>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography align="left">
                    <Button className="main__button">Proceed as an Admin</Button>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
}

export default Main;
