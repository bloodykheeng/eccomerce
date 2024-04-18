import React, { useState, useEffect } from "react";
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

//
import CustomShaderMaterial from "./CustomShaderMaterial";
import { Skeleton } from "primereact/skeleton";

const CarouselContainer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["db-slider-photos"],
    queryFn: getAllDashboardSliderPhotos
  });

  if (isError) {
    console.error("Error fetching getAllDashboardSliderPhotos:", error);
    toast.error("An Error Occurred Please Contact Admin");
    return null; // Early return on error
  }

  // if (isLoading) {
  //   return (
  //     <div style={{ margin: "20px", width: "100%" }}>
  //       <ProgressBar
  //         mode="indeterminate"
  //         style={{ height: "6px" }}
  //       ></ProgressBar>
  //     </div>
  //   ); // Show progress bar when loading
  // }

  if (isLoading) {
    return (
      <div style={{ width: "100%", height: "70vh", overflow: "hidden" }}>
        <Skeleton width="100%" height="100%">
          <Skeleton
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              backgroundColor: isHovered
                ? "rgba(0, 0, 0, 0.7)"
                : "rgba(0, 0, 0, 0.5)",
              padding: "20px",
              borderRadius: "5px",
              color: isHovered ? "#ffffff" : "#ddd",
              textAlign: "left",
              transition: "all 0.3s ease"
            }}
          >
            <Skeleton style={{ margin: "0 0 10px 0", fontSize: "2rem" }}>
              <div style={{ margin: "20px", width: "100%" }}>
                <ProgressBar
                  mode="indeterminate"
                  style={{ height: "6px" }}
                ></ProgressBar>
              </div>
            </Skeleton>
            <Skeleton>
              {" "}
              <ProgressBar
                mode="indeterminate"
                style={{ height: "6px" }}
              ></ProgressBar>
            </Skeleton>
          </Skeleton>
        </Skeleton>
      </div>
    ); // Show skeleton when loading
  }

  const descriptionStyle = {
    position: windowWidth > 768 ? "absolute" : "relative",
    bottom: windowWidth > 768 ? "10px" : "initial",
    right: windowWidth > 768 ? "10px" : "initial",
    left: windowWidth > 768 ? "initial" : "50%",
    transform: windowWidth > 768 ? "none" : "translateX(-50%)",
    backgroundColor: isHovered ? "#FDDFAF" : "#FFE9C7",
    padding: "20px",
    borderRadius: "5px",
    color: isHovered ? "#ffffff" : "#131313",
    textAlign: "left",
    transition: "all 0.3s ease",
    width: windowWidth > 768 ? "auto" : "100%",
    marginTop: windowWidth > 768 ? "0" : "0px"
  };

  const arrowStyle = {
    display: windowWidth > 768 ? "block" : "none" // Show arrows only on wider screens
  };

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
          disabledClass: "swiper-button-disabled"
        }}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
        lazy={true}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={true}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          "--swiper-button-disabled": windowWidth > 768 ? false : true
        }}
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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              // style={{
              //   position: "absolute",
              //   bottom: 10,
              //   right: 10,
              //   // left: "50%",
              //   // transform: "translateX(-50%)",
              //   backgroundColor: isHovered
              //     ? "rgba(0, 0, 0, 0.7)"
              //     : "rgba(0, 0, 0, 0.3)",
              //   padding: "20px",
              //   borderRadius: "5px",
              //   color: isHovered ? "#ffffff" : "#ddd",
              //   textAlign: "left",
              //   transition: "all 0.3s ease"
              // }}
              style={descriptionStyle}
            >
              <h2 style={{ margin: "0 0 10px 0", fontSize: "2rem" }}>
                {car.title}
              </h2>
              <p>{car.caption}</p>
            </div>

            {/* Custom white next/prev buttons (optional) */}
            <div
              className="swiper-button-next swiper-button-next-custom"
              style={arrowStyle}
            ></div>
            <div
              className="swiper-button-prev swiper-button-prev-custom"
              style={arrowStyle}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselContainer;
