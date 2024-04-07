import React from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "primeflex/primeflex.css"; // for PrimeFlex utility classes

// Sample JSON Data for the carousel
const carData = [
  {
    brand: "Audi",
    image: "carsparking.jpg", // Ensure this image is in the public/assets/cars folder
    description:
      "Embrace the epitome of luxury with our Audi collection, boasting state-of-the-art engineering and unparalleled comfort. Each model offers a harmonious blend of performance and sophistication, designed for those who demand excellence in every journey."
  },
  {
    brand: "BMW",
    image: "car-headlights-hood-black-sports-car.png",
    description:
      "Unleash the thrill of driving with BMW's dynamic performance and sleek aesthetics. Our lineup showcases cutting-edge innovation and sporty elegance, providing an invigorating experience for enthusiasts and connoisseurs alike."
  }
  // ... other cars
];
const CarouselContainer = () => {
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

  const carouselTemplate = (car) => {
    return (
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "70vh", maxHeight: "70vh" }}
      >
        <img
          src={`/assets/cars/${car.image}`}
          alt={car.brand}
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
            {car.brand}
          </h2>
          <p
            className="text-sm md:text-xl text-white mb-4"
            style={{ lineHeight: "1.5" }}
          >
            {car.description}
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
      value={carData}
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
