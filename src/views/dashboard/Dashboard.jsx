import React from "react";
import AppTopbar from "../../AppTopbar";
import CarouselContainer from "./components/CarouselContainer";
import ProductTypes from "./components/ProductTypes";
import AppFooter from "../../AppFooter";
import ServiceOfferings from "./components/ServiceOfferings";
import BestDealsCarousel from "./components/BestDealsCarousel";
import FeaturedProducts from "./components/FeaturedProducts";

const Dashboard = () => {
  return (
    <div style={{ width: "1" }}>
      <AppTopbar />
      <CarouselContainer />
      <ServiceOfferings />
      <ProductTypes />
      <BestDealsCarousel />
      <FeaturedProducts />
      <AppFooter />
    </div>
  );
};

export default Dashboard;
