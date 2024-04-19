import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppTopbar from "../../AppTopbar";
import CarouselContainer from "./components/CarouselContainer";
import ProductTypes from "./components/ProductTypes";
import AppFooter from "../../AppFooter";
import ServiceOfferings from "./components/ServiceOfferings";
import FeaturedProducts from "./components/FeaturedProducts";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";

const LoadingOverlay = () => {
  const textVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 1.5 } }
  };

  return (
    <Card
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "white",
        zIndex: 9999
      }}
    >
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
      <motion.div initial="hidden" animate="visible" variants={textVariant}>
        <h1 style={{ marginTop: "20px", fontSize: "24px", color: "#007ad9" }}>
          MYCAR
        </h1>
      </motion.div>
    </Card>
  );
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulates a loading time of 5 seconds.
  }, []);

  // Define animation variants for visibility transitions
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const variant = {
    visible: { scale: 1 },
    hidden: { scale: 0 }
  };

  return (
    <div style={{ width: "100%" }}>
      {isLoading && <LoadingOverlay />}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={variants}
      >
        <CarouselContainer />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        variants={variants}
      >
        <ServiceOfferings />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        variants={variants}
      >
        <ProductTypes />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        variants={variants}
      >
        <FeaturedProducts />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        variants={variants}
      >
        <AppFooter />
      </motion.div>
    </div>
  );
};

export default Dashboard;
