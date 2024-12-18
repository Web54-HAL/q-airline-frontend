import { Box, Container, Grid, Typography, Button, TextField, Avatar } from '@mui/material';
import FlightIcon from '@mui/icons-material/FlightOutlined';
import Image1 from './air1.jpeg';
import Image2 from './air2.jpeg';
import Image3 from './air3.jpeg';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const images = [Image1, Image2, Image3];

function TravelLayout() {


  const [currentIndex, setCurrentIndex] = useState(0);
  let navigate = useNavigate();
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === images.length - 1) {
        setCurrentIndex(0);
      }
      else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 5000)

    return () => clearInterval(intervalId);
  }, [currentIndex])

  const sliderRef = useRef(null);
  const handleScrollToSlider = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = () => {
    const section = document.getElementById('slider');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      <Container maxWidth="xl"
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '90%',
          height: '120%',
          marginTop: 2,
          borderRadius: 5,
          // marginBottom: '150px',
        }}
      >
        {/* Hero Section */}
        <Box sx={{ position: 'relative', height: '60vh', backgroundImage: `url(${images[currentIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 5, }}>
          <Box sx={{
            position: 'absolute', color: '#fff', backgroundColor: 'rgba(0,0,0,.3)', height: '100%', width: { xs: '100%', sm: '50%', md: '35%' }, borderRadius: 5, display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Căn giữa theo chiều dọc
            alignItems: 'center'
          }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>Explore</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '3rem', color: '#C3FEFC', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>the world</Typography>
            <br />
            <Typography variant="h5" sx={{ fontWeight: 400, marginBottom: '20px', fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } }}>
              Your Journey - Our Priority!
            </Typography>
            <Button variant="contained"
              onClick={scrollToSection}
              sx={{ backgroundColor: '#159F91', color: 'white', padding: '10px 20px', borderRadius: 5 }}>
              Explore
            </Button>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="md"
        sx={{
          borderRadius: 5, height: "30%", marginTop: 2, marginBottom: 10, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: "center", bgcolor: 'white', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '1,5rem', color: 'black' }}>About us</Typography>
        <Typography sx={{ textAlign: 'center' }} variant="body1"> At Q Airline, we are committed to providing you with an exceptional flying experience. As a leading airline, we specialize in offering comfort, reliability, and affordability, ensuring that your journey with us is smooth and enjoyable. Whether you're traveling for business or leisure, our modern fleet of aircraft, friendly crew, and top-tier services make us your preferred choice in the skies. </Typography>
      </Container>
    </Box>
  );
}

export default TravelLayout;
