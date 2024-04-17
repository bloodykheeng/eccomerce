import React from "react";
// import Swiper from "swiper";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProgressBar } from "primereact/progressbar";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import { getAllDashboardSliderPhotos } from "../../../services/dashboardslider/dashboard-slider-photos-services.js";
import "primereact/resources/themes/lara-light-blue/theme.css";

const CarouselContainer = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["db-slider-photos"],
    queryFn: getAllDashboardSliderPhotos
  });

  if (isError) {
    console.error("Error fetching getAllDashboardSliderPhotos:", error);
    toast.error("An Error Occurred Please Contact Admin");
    return null; // Early return on error
  }

  if (isLoading) {
    return (
      <div style={{ margin: "20px", width: "100%" }}>
        <ProgressBar
          mode="indeterminate"
          style={{ height: "6px" }}
        ></ProgressBar>
      </div>
    ); // Show progress bar when loading
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
      lazy={true}
      autoplay={{ delay: 10000, disableOnInteraction: false }}
      loop={true}
    >
      {data?.data.map((car, index) => (
        <SwiperSlide zoom={true} key={index}>
          <img
            src={`${process.env.REACT_APP_API_BASE_URL}${car.photo_url}`}
            alt={car.caption}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              boxSizing: "border-box"
            }}
          >
            <h2
              style={{ color: "white", fontSize: "2rem", marginBottom: "20px" }}
            >
              {car.title}
            </h2>
            <p style={{ color: "white", marginBottom: "20px" }}>
              {car.caption}
            </p>

            {/* <Button label="Shop Now" onClick={() => navigate("/products")} /> */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselContainer;
