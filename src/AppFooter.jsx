import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";

export const footerProductLinks = [
  {
    name: "About Us",
    link: "/about"
  },

  {
    name: "Locations",
    link: "/locations" // Added a link for store locations
  },
  {
    name: "Products",
    link: "/cars" // Added a link for the blog
  },
  {
    name: "Customer Reviews",
    link: "/reviews" // Added a link for reviews
  }
];

export const footerCompanyLinks = [
  {
    name: "New Arrivals",
    link: "/" // Changed to match car sales
  },
  {
    name: "Used Cars",
    link: "/" // Changed to match car sales
  },
  {
    name: "Special Offers",
    link: "/" // Changed to match car sales
  }
];

export const footerSupportLinks = [
  {
    name: "FAQ"
  },
  {
    name: "Reviews"
  },
  {
    name: "Contact Us"
  },
  {
    name: "Shipping"
  },
  {
    name: "Live chat"
  }
];

const AppFooter = () => {
  return (
    <div style={{ backgroundColor: "#000", color: "white" }}>
      <div
        style={{
          padding: "1rem", // Reduced padding for smaller screens
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center", // Center-align items
          backgroundColor: "#342ac8",
          color: "white",
          gap: "1rem", // Add gap between elements for better spacing
          justifyContent: "space-between"
        }}
      >
        <h1
          style={{
            marginBottom: "1rem", // Adjust margin
            fontSize: "1.5rem", // Adjust font size for smaller screens
            fontWeight: "600",
            color: "white"
          }}
        >
          <span style={{ color: "#FF0707" }}>Subscribe</span>{" "}
          <span style={{ color: "#4DFF07" }}>To our Car</span>
          <span style={{ color: "#FFEE01" }}> Collection</span> to get news,
          events & offers
        </h1>

        <div
          style={{
            position: "relative"
          }}
        >
          <React.Fragment>
            <div className="p-inputgroup" style={{ flex: "1 1 300px" }}>
              <InputText placeholder="Enter Email" style={{ width: "100%" }} />
              <Button icon="pi pi-search" style={{}} />
            </div>
          </React.Fragment>
        </div>
      </div>

      {/*=================================== next ====================================*/}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Allows children to wrap onto multiple lines
          gap: "24px",
          padding: "64px 20px",
          textAlign: "center",
          justifyContent: "space-around" // Distributes space around items
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            maxWidth: "300px"
          }}
        >
          <img
            src="/assets/cars/mycarclassicgold.png"
            alt="logo/image"
            style={{ width: "40%" }}
          />
          <p style={{ marginTop: "12px" }}>
            The home and elements needed to create beautiful products
          </p>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "15px" }}
          >
            <a href="https://web.facebook.com/rahi680/" target="_blank">
              <i
                className="pi pi-facebook"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </a>
            <a
              href="https://twitter.com/Asfak00"
              target="_blank"
              style={{ marginLeft: "15px" }}
            >
              <i
                className="pi pi-twitter"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </a>
            <a
              href="https://github.com/asfak00"
              target="_blank"
              style={{ marginLeft: "15px" }}
            >
              <i
                className="pi pi-github"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </a>
            <a
              href="https://www.instagram.com/asfakahmed22/"
              target="_blank"
              style={{ marginLeft: "15px" }}
            >
              <i
                className="pi pi-instagram"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </a>
          </div>
        </ul>

        <ul style={{ textAlign: "left" }}>
          <h1 style={{ marginBottom: "4px", fontWeight: "600" }}>Company</h1>
          {footerCompanyLinks?.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.5rem",
                  color: "#718096",
                  cursor: "pointer"
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul style={{ textAlign: "left" }}>
          <h1 style={{ marginBottom: "4px", fontWeight: "600" }}>Shop</h1>
          {footerProductLinks?.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.5rem",
                  color: "#718096",
                  cursor: "pointer"
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul style={{ textAlign: "left" }}>
          <h1 style={{ marginBottom: "4px", fontWeight: "600" }}>Support</h1>
          {footerSupportLinks?.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.5rem",
                  color: "#718096",
                  cursor: "pointer"
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/*====================================== next ==============================*/}
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Stack children vertically
          gap: "40px",
          paddingTop: "8px",
          paddingBottom: "32px",
          textAlign: "center",
          color: "#718096"
        }}
      >
        <span>
          &copy; {new Date().getFullYear()}{" "}
          <span
            style={{ color: "#342ac8", fontWeight: "bold", cursor: "pointer" }}
          >
            MYCAR
          </span>{" "}
          . all rights reserved.
        </span>

        <span>
          Terms <sup style={{ fontWeight: "800" }}>.</sup> privacy policy
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt="Payment Methods"
          />
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
