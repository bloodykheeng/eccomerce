import React from "react";
import { Card } from "primereact/card";

const ServiceOfferings = () => {
  const services = [
    {
      name: "Free Shipping",
      icon: "pi pi-send",
      color: "orange",
      description: "From all orders over $100"
    },
    // {
    //   name: "Daily Surprise Offers",
    //   icon: "pi pi-gift",
    //   color: "goldenrod",
    //   description: "Save up to 25% off"
    // },
    {
      name: "Affordable Prices",
      icon: "pi pi-tag",
      color: "green",
      description: "Get Factory direct price"
    },
    {
      name: "Secure Payments",
      icon: "pi pi-lock",
      color: "blue",
      description: "100% protected payments"
    }
    // ... add more services if necessary
  ];

  const serviceCard = (service) => (
    <div
      style={{
        textAlign: "center",
        display: "inline-block",
        margin: "0.5rem",
        padding: "0.5rem", // Reduced padding
        width: "240px", // Fixed width for all cards
        height: "120px", // Reduced fixed height for consistency
        verticalAlign: "top",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)" // subtle shadow
      }}
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
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "stretch"
      }}
    >
      {services.map((service) => serviceCard(service))}
    </div>
  );
};

export default ServiceOfferings;
