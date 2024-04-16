import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { getAllCarTypes } from "../../../services/cars/car-types-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Carousel } from "primereact/carousel";

const ProductTypes = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: ["db-slider-photos"],
    queryFn: getAllCarTypes
  });

  // Check for query errors
  if (isError) {
    console.log("Error fetching getAllCarTypes:", error);

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

  console.log("getAllCarTypes data is : ", data);

  // Settings for the slider

  // const responsiveOptions = [
  //   {
  //     breakpoint: "1400px",
  //     numVisible: 2,
  //     numScroll: 1
  //   },
  //   {
  //     breakpoint: "1199px",
  //     numVisible: 3,
  //     numScroll: 1
  //   },
  //   {
  //     breakpoint: "767px",
  //     numVisible: 2,
  //     numScroll: 1
  //   },
  //   {
  //     breakpoint: "575px",
  //     numVisible: 1,
  //     numScroll: 1
  //   }
  // ];

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: "600px",
      numVisible: 1,
      numScroll: 1
    }
  ];
  const handleClick = (productType) => {
    navigate("/products", { state: { productType: productType.name } });
  };

  const carouselTemplate = (productType) => (
    <div
      style={{
        width: "200px",
        margin: "0.5em",
        textAlign: "center",
        cursor: "pointer",
        overflow: "hidden",
        borderRadius: "8px", // Optionally round the corners
        boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)" // Optional shadow for depth
      }}
      className="p-col-12 p-md-6 p-lg-4"
      onClick={() => handleClick(productType)}
    >
      <div style={{ width: "100%", height: "150px", position: "relative" }}>
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}${productType.photo_url}`}
          alt={productType.name}
          style={{
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>
      <div style={{ padding: "0.5em 0" }}>{productType.title}</div>
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
        <h1 style={{ fontFamily: "Platypi, sans-serif" }}>
          {" "}
          {/* Here's where we apply the Google Font */}
          Explore Our <span style={{ color: "#FF5733" }}>Car Types</span>{" "}
          Collection {/* Color a specific part */}
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          flexWrap: "wrap",
          gap: "1rem"
          // flexDirection: "column"
        }}
      >
        <Carousel
          value={data?.data ?? []}
          responsiveOptions={responsiveOptions}
          itemTemplate={carouselTemplate}
          // header={<h2>Car Types</h2>}
          numVisible={3}
          numScroll={1}
          circular
          autoplayInterval={3000}
          showIndicators={true}
          showNavigators={true}
        />
      </div>
    </div>
  );
};

export default ProductTypes;
