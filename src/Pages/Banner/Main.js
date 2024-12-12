import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Dialog, DialogContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Image from "../SignUp_Page/1.jpg";

export default function Slider() {
  const [slides, setSlides] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMarkdown, setSelectedMarkdown] = useState("");

  useEffect(() => {
    // Fetch promotions from JSON Server
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/promotions");
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
    maxWidth: 1200,
    margin: "auto",
    padding: 6,
    "& .swiper-button-next, .swiper-button-prev": {
      opacity: 0.7,
      transition: "all 0.3s ease",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      padding: "15px",
      color: "#fff",
      zIndex: 10,
      borderRadius: "20%",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    "& .swiper-button-next": {
      display: "flex", 
    },
    "& .swiper-button-prev": {
      display: "flex",
    },
    "& .swiper-button-next:hover, .swiper-button-prev:hover": {
      opacity: 1,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      transform: "scale(1.1)",
      border: "2px solid #ddd",
    },
    "& .swiper-button-next::after, .swiper-button-prev::after": {
      fontSize: "16px",
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
    color: "#",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
    letterSpacing: "1.5px",
  }}
>
  Let's Flight with Us
</Typography>
      <Swiper
        slidesPerView={3}
        spaceBetween={5}
        slidesPerGroup={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        loop
        style={{ paddingBottom: "50px" }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.promotion_id}>
            <Card
              onClick={() => handleCardClick(slide.markdown_content)}
              sx={{
                maxWidth: 280,
                height: 280,
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
                height="210"
                image={Image}
                alt={slide.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{display: "flex", justifyContent: "center", alignItems: "center", background:"#ddd"}}>
                <Typography variant="h5">
                  {slide.title}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  {slide.markdown_content.split("\n")[0]}
                </Typography> */}
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Markdown Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <ReactMarkdown>{selectedMarkdown}</ReactMarkdown>
        </DialogContent>
      </Dialog>
    </Box>
  );
}