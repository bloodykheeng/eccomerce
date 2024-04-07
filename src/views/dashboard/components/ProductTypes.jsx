import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";

const ProductTypes = () => {
  const navigate = useNavigate();

  const productTypes = [
    { name: "Engines", icon: "pi pi-cog", color: "#f28b22" },
    { name: "Tires", icon: "pi pi-sliders-h", color: "#0c5c8c" },
    { name: "Brakes", icon: "pi pi-compass", color: "#e63946" },
    { name: "Batteries", icon: "pi pi-battery", color: "#2a9d8f" },
    { name: "Lights", icon: "pi pi-lightbulb", color: "#f4a261" },
    { name: "Oil & Fluids", icon: "pi pi-inbox", color: "#264653" }
  ];

  const handleClick = (productType) => {
    navigate("/products", { state: { productType: productType.name } });
  };

  const productCard = (productType) => (
    <Card
      title={productType.name}
      style={{
        width: "200px",
        margin: "0.5em",
        textAlign: "center",
        verticalAlign: "top",
        cursor: "pointer"
      }}
      className="p-col-12 p-md-6 p-lg-4"
      onClick={() => handleClick(productType)}
    >
      <i
        className={`${productType.icon} p-text-center`}
        style={{ fontSize: "3em", margin: "1em", color: productType.color }}
      ></i>
    </Card>
  );

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        {productTypes.map((productType) => productCard(productType))}
      </div>
    </Card>
  );
};

export default ProductTypes;
