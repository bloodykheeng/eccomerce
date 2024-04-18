import React from "react";
import { Card } from "primereact/card";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
// import required modules
import { Navigation, Autoplay } from "swiper/modules";

const ServiceOfferings = () => {
  const services = [
    {
      name: "Free Delivery",
      icon: "pi pi-send",
      color: "orange",
      description: "Nationwide delivery at no extra cost.",
      bgColor: "#FFF3E0" // Light orange background
    },
    {
      name: "Affordable Prices",
      icon: "pi pi-tag",
      color: "green",
      description: "Competitive factory direct pricing.",
      bgColor: "#E8F5E9" // Light green background
    },
    {
      name: "Secure Payments",
      icon: "pi pi-lock",
      color: "blue",
      description: "Safe transaction with 100% protection.",
      bgColor: "#E3F2FD" // Light blue background
    },
    {
      name: "Wide Selection",
      icon: "pi pi-car",
      color: "purple",
      description: "A variety of cars to choose from.",
      bgColor: "#F3E5F5" // Light purple background
    },
    {
      name: "Quality Assurance",
      icon: "pi pi-check-square",
      color: "red",
      description: "Inspected cars that meet high standards.",
      bgColor: "#FFEBEE" // Light red background
    },
    {
      name: "After-Sales Support",
      icon: "pi pi-users",
      color: "teal",
      description: "Dedicated support for your post-purchase needs.",
      bgColor: "#E0F2F1" // Light teal background
    }
  ];
  const serviceCard = (service) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: "0.5rem",
        padding: "0.5rem", // Reduced padding
        // width: "200px", // Fixed width for all cards
        // height: "200px", // Reduced fixed height for consistency
        width: "100%",
        height: "100%",
        verticalAlign: "top",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // subtle shadow
        transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out", // Add a transition effect for shadow and transform
        backgroundColor: service.bgColor // Use the bgColor for background color
      }}
      className="p-shadow-4" // Use PrimeReact shadow utilities
    >
      <i
        className={service.icon}
        style={{
          fontSize: "1.5rem",
          color: service.color,
          marginBottom: "0.5rem"
        }} // Reduced icon size
      ></i>
      <h4 style={{ margin: "0.5em 0" }}>{service.name}</h4>
      <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "0.85em" }}>
        {service.description}
      </p>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#FCFAED"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}
      >
        <h1 style={{ fontFamily: "Platypi, sans-serif", fontSize: "2rem" }}>
          Our <span style={{ color: "#FE1A1A" }}>Core</span> Values
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#FCFAED"
        }}
      >
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          className="mySwiper"
          style={{
            width: "100%",
            paddingTop: "50px",
            paddingBottom: "50px"
          }}
        >
          {services.map((service) => (
            <SwiperSlide
              style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "300px",
                height: "300px"
              }}
            >
              {serviceCard(service)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ServiceOfferings;
