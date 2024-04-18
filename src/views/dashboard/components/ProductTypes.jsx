import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

//
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import { getAllCarTypes } from "../../../services/cars/car-types-service";

import { Skeleton } from "primereact/skeleton";

export default function ProductTypes() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product-types"],
    queryFn: getAllCarTypes
  });

  if (isError) {
    console.log("Error fetching getAllCarTypes:", error);
    toast.error(
      error?.response?.data?.message || "An Error Occurred Please Contact Admin"
    );
    return null;
  }

  const handleClick = (productType) => {
    navigate("/products", { state: { productType: productType.name } });
  };

  console.log("product types : ", data);

  if (isLoading) {
    return (
      <div style={{ width: "100%", height: "300px", overflow: "hidden" }}>
        <Skeleton width="100%" height="100%"></Skeleton>
      </div>
    ); // Show skeleton when loading
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "#FCFAED",
          padding: "1rem"
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
            Explore Our <span style={{ color: "#FF5733" }}>Car Types</span>{" "}
            Collection
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            width: "100%"
          }}
        >
          {isLoading ? (
            <ProgressSpinner style={{ width: "50px", height: "50px" }} />
          ) : (
            <Swiper
              // slidesPerView={4}
              // spaceBetween={20}
              centeredSlides={true}
              modules={[Navigation, Pagination, Autoplay]}
              // navigation
              pagination={{ clickable: true }}
              className="mySwiper"
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              // style={{
              //   width: "100%",
              //   height: "170px",
              //   display: "flex",
              //   alignItems: "center",
              //   justifyContent: "center",
              //   padding: "1rem"
              // }}
              style={{
                width: "100%",
                paddingTop: "50px",
                paddingBottom: "50px"
              }}
              // slidesPerView={3}
              // spaceBetween={30}
              pagination={{
                clickable: true
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                480: { slidesPerView: 3, spaceBetween: 30 },
                768: { slidesPerView: 4, spaceBetween: 30 },
                1024: { slidesPerView: 4, spaceBetween: 30 }
              }}
            >
              {data?.data.map((productType, index) => (
                <SwiperSlide
                  // style={{
                  //   width: "200px",
                  //   height: "150px",
                  //   margin: "1rem",
                  //   cursor: "pointer",
                  //   position: "relative", // Relative positioning for the slide container
                  //   borderRadius: "8px",
                  //   boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)"
                  // }}
                  style={{
                    width: "300px",
                    height: "300px",
                    background: `url("${process.env.REACT_APP_API_BASE_URL}${productType.photo_url}")`,
                    backgroundSize: "cover",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)"
                  }}
                  onClick={() => handleClick(productType)}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      background: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      padding: "0.5rem",
                      fontSize: "18px",
                      borderRadius: "0 0 8px 8px",
                      zIndex: 2
                    }}
                  >
                    {productType.name}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
}
