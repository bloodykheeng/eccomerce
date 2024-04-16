import React from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "primeflex/primeflex.css"; // for PrimeFlex utility classes

import { getAllDashboardSliderPhotos } from "../../../services/dashboardslider/dashboard-slider-photos-services.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CarouselContainer = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: ["db-slider-photos"],
    queryFn: getAllDashboardSliderPhotos
  });

  // Check for query errors
  if (isError) {
    console.log("Error fetching getAllDashboardSliderPhotos:", error);

    // Access specific error details (if applicable)
    const errorMessage = error?.response?.data?.message;

    if (errorMessage) {
      toast.error(errorMessage);
    } else if (!error?.response) {
      toast.warning("Check Your Internet Connection Please");
    } else {
      toast.error("An Error Occured Please Contact Admin");
    }
  }

  console.log("getAllDashboardSliderPhotos data is : ", data);
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: "600px",
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1
    }
  ];

  const carouselTemplate = (car, index) => {
    return (
      <div
        key={index}
        className="relative w-full overflow-hidden"
        style={{ minHeight: "70vh", maxHeight: "70vh" }}
      >
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}${car.photo_url}`}
          alt={car.caption}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            position: "absolute"
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-column justify-content-center align-items-center text-center px-4">
          <h2
            className="text-3xl md:text-6xl text-white font-bold mb-4"
            style={{ lineHeight: "1.2" }}
          >
            {car.title}
          </h2>
          <p
            className="text-sm md:text-xl text-white mb-4"
            style={{ lineHeight: "1.5" }}
          >
            {car.caption}
          </p>
          <Link to={"/products"}>
            <Button
              label="Shop Now"
              className="p-button-raised p-button-rounded p-button-lg"
              style={{ zIndex: 10 }} // Ensure the button is above the overlay
            />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Carousel
      value={data?.data ?? []}
      numVisible={1}
      numScroll={1}
      responsiveOptions={responsiveOptions}
      itemTemplate={carouselTemplate}
      circular
      autoplayInterval={10000}
      showIndicators={false}
      showNavigators={false}
    />
  );
};

export default CarouselContainer;
