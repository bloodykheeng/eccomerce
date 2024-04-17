import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";

//
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import { getAllCars } from "../../../services/cars/car-service.js";
import { ProgressBar } from "primereact/progressbar";

import { Skeleton } from "primereact/skeleton";

export default function FeaturedProducts() {
  const [layout, setLayout] = useState("grid");

  //
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);

  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cars"],
    queryFn: getAllCars
  });

  // Loading handling
  if (isLoading) {
    return (
      <div style={{ margin: "20px", width: "100%" }}>
        <ProgressBar
          mode="indeterminate"
          style={{ height: "6px" }}
        ></ProgressBar>
      </div>
    ); // Show progress bar when loading
  }

  if (isError) {
    console.log("Error fetching getAllCars:", error);
    toast.error(
      error?.response?.data?.message || "An Error Occurred Please Contact Admin"
    );
    return null;
  }

  console.log("featured products : ", data);

  const handleClick = (productType) => {
    navigate("/products", { state: { productType: productType.name } });
  };

  const getSeverity = (product) => {
    switch (product?.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const listItem = (product, index) => {
    // Check if product data is available
    if (!product && isLoading) {
      return (
        <div className="col-12" key={index}>
          <div className="flex gap-4 p-4 flex-column xl:flex-row xl:align-items-start">
            <Skeleton className="block mx-auto w-9 sm:w-16rem xl:w-10rem shadow-2 h-6rem xl:block border-round" />
            <div className="flex flex-1 gap-4 flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start">
              <div className="flex gap-3 flex-column align-items-center sm:align-items-start">
                <Skeleton className="w-8rem border-round h-2rem" />
                <Skeleton className="w-6rem border-round h-1rem" />
                <div className="flex gap-3 align-items-center">
                  <Skeleton className="w-6rem border-round h-1rem" />
                  <Skeleton className="w-3rem border-round h-1rem" />
                </div>
              </div>
              <div className="flex gap-3 sm:flex-column align-items-center sm:align-items-end sm:gap-2">
                <Skeleton className="w-4rem border-round h-2rem" />
                <Skeleton shape="circle" className="w-3rem h-3rem" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="col-12" key={product.id}>
        <div
          className={classNames(
            "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
            { "border-top-1 surface-border": index !== 0 }
          )}
        >
          <img
            className="block mx-auto w-9 sm:w-16rem xl:w-10rem shadow-2 xl:block border-round"
            src={`${product?.photos && product?.photos[0]}`}
            alt={product?.name}
            onClick={() => {
              setSelectedProduct(product);
              setDisplayDialog(true);
            }}
            style={{ width: "100%", cursor: "pointer" }}
          />
          <div className="flex flex-1 gap-4 flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start">
            <div className="flex gap-3 flex-column align-items-center sm:align-items-start">
              <div className="text-2xl font-bold text-900">{product?.name}</div>
              <Rating value={product?.rating} readOnly cancel={false}></Rating>
              <div className="flex gap-3 align-items-center">
                <span className="flex gap-2 align-items-center">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product?.category}</span>
                </span>
                <Tag
                  value={product?.inventoryStatus}
                  severity={getSeverity(product)}
                ></Tag>
              </div>
            </div>
            <div className="flex gap-3 sm:flex-column align-items-center sm:align-items-end sm:gap-2">
              <span className="text-2xl font-semibold">${product?.price}</span>
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                disabled={product?.inventoryStatus === "OUTOFSTOCK"}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (product) => {
    // Check if product data is available
    if (!product && isLoading) {
      return (
        <div
          className="p-2 col-12 sm:col-6 lg:col-12 xl:col-4"
          key={product.id}
        >
          <div className="p-4 border-1 surface-border surface-card border-round">
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
              <Skeleton className="w-6rem border-round h-1rem" />
              <Skeleton className="w-3rem border-round h-1rem" />
            </div>
            <div className="flex gap-3 py-5 flex-column align-items-center">
              <Skeleton className="w-9 shadow-2 border-round h-10rem" />
              <Skeleton className="w-8rem border-round h-2rem" />
              <Skeleton className="w-6rem border-round h-1rem" />
            </div>
            <div className="flex align-items-center justify-content-between">
              <Skeleton className="w-4rem border-round h-2rem" />
              <Skeleton shape="circle" className="w-3rem h-3rem" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-2 col-12 sm:col-6 lg:col-12 xl:col-4" key={product.id}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <div className="flex gap-2 align-items-center">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{product?.category}</span>
            </div>
            <Tag
              value={product.inventoryStatus}
              severity={getSeverity(product)}
            ></Tag>
          </div>
          <div className="flex gap-3 py-5 flex-column align-items-center">
            <img
              className="w-9 shadow-2 border-round"
              src={`${product?.photos && product?.photos[0]}`}
              alt={product?.name}
              onClick={() => {
                setSelectedProduct(product);
                setDisplayDialog(true);
              }}
              style={{ width: "100%", cursor: "pointer" }}
            />
            <div className="text-2xl font-bold">{product?.name}</div>
            <Rating value={product?.rating} readOnly cancel={false}></Rating>
          </div>
          <div className="flex align-items-center justify-content-between">
            <span className="text-2xl font-semibold">${product.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded"
              disabled={product?.inventoryStatus === "OUTOFSTOCK"}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout, index) => {
    if (!product) {
      return;
    }

    if (layout === "list") return listItem(product, index);
    else if (layout === "grid") return gridItem(product);
  };

  const listTemplate = (products, layout) => {
    return (
      <div className="grid grid-nogutter">
        {products.map((product, index) => itemTemplate(product, layout, index))}
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="p-3 col-6">
          <span className="block text-4xl font-bold text-900">
            Featured Products
          </span>
        </div>
        <div className="flex p-3 col-6 justify-content-end align-items-center">
          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value)}
          />
        </div>
      </div>
    );
  };

  const imageDialogFooter = (
    <Button
      label="Close"
      icon="pi pi-times"
      onClick={() => setDisplayDialog(false)}
      className="p-button-text"
    />
  );

  return (
    <div className="card">
      <DataView
        value={data?.data ?? []}
        listTemplate={listTemplate}
        layout={layout}
        header={renderHeader()}
      />
      {!isLoading && Array.isArray(data?.data) && data?.data.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            width: "100%",
            flexDirection: "column",
            textAlign: "center"
          }}
        >
          <h1 style={{ fontFamily: "Platypi, sans-serif", fontSize: "2rem" }}>
            No Featured Products Yet
          </h1>
        </div>
      )}

      {selectedProduct && (
        <Dialog
          visible={displayDialog}
          onHide={() => setDisplayDialog(false)}
          style={{ width: "50vw" }}
          footer={imageDialogFooter}
          modal
          showHeader={false}
        >
          {selectedProduct.photos.map((photoUrl, index) => (
            <img
              key={index}
              src={photoUrl}
              alt={`Product Image ${index + 1}`}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
              style={{ width: "100%", display: "block", marginBottom: "1rem" }}
            />
          ))}
        </Dialog>
      )}
    </div>
  );
}
