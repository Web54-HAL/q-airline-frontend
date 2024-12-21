import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Dialog, DialogContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Image from "../Home_Page/air4.jpg";
import "../../color.css";
export default function Slider() {
  const [slides, setSlides] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMarkdown, setSelectedMarkdown] = useState("");

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/promotions/newest?limit=6");
        setSlides(response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  const handleCardClick = (markdownContent) => {
    setSelectedMarkdown(markdownContent);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMarkdown("");
  };

  return (
    <Box
  sx={{
    maxWidth: "100%", 
    padding: 6,
    "& .swiper-button-next, .swiper-button-prev": {
      opacity: 0.7,
      transition: "all 0.3s ease",
      padding: "15px",
      borderRadius: "50%", // Điều chỉnh bo tròn
    },
    "& .swiper-button-next:hover, .swiper-button-prev:hover": {
      opacity: 1,
      transform: "scale(1.1)",
    },
  }}
>
      <Typography
  variant="h4"
  align="center"
  mb={3}
  sx={{
    fontSize: "40px",
    paddingBottom : "20px",
    fontFamily: "'Roboto Slab', serif", 
    fontWeight: 600,
    color: "var(--primary-color)",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
    letterSpacing: "1.5px",
    marginTop:5,
  }}
>
  Our Highlight
</Typography>
    <Swiper
  slidesPerView={1} 
  spaceBetween={10} 
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  modules={[Navigation, Pagination, Autoplay]}
  loop
  breakpoints={{
    640: { 
      slidesPerView: 1, 
      spaceBetween: 10,
    },
    768: { 
      slidesPerView: 2, 
      spaceBetween: 15,
    },
    1024: { 
      slidesPerView: 3, 
      spaceBetween: 20,
    },
  }}
  style={{ paddingBottom: "50px" }}
>
  {slides.map((slide) => (
    <SwiperSlide key={slide.promotion_id}>
      <Card
        onClick={() => handleCardClick(slide.markdown_content)}
        sx={{
          maxWidth: 300,
          height: 300,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          transition: "transform 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={slide.preview_image_url || Image}
          alt={slide.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ddd",
          }}
        >
          <Typography variant="h7">{slide.title}</Typography>
        </CardContent>
      </Card>
    </SwiperSlide>
  ))}
</Swiper>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <ReactMarkdown>{selectedMarkdown}</ReactMarkdown>
        </DialogContent>
      </Dialog>
    </Box>
  );
}