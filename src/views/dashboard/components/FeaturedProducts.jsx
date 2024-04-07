import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";

export default function FeaturedProducts() {
  const deals = [
    // Your deals array with photos key...
    // Example product with multiple photos:
    {
      name: "Lenovo Tab P10",
      price: 2099,
      oldPrice: 3490,
      rating: 4,
      sold: 321,
      photos: [
        "/assets/sample-cars/AutoWallpaper_300083.jpg",
        "/assets/sample-cars/AutoWallpaper_300084.jpg"
        // ... more photos
      ]
    },
    {
      name: "Lenovo Tab P10",
      price: 2099,
      oldPrice: 3490,
      rating: 4,
      sold: 321,
      photos: [
        "/assets/sample-cars/AutoWallpaper_300083.jpg",
        "/assets/sample-cars/AutoWallpaper_300084.jpg"
        // ... more photos
      ]
    },
    {
      name: "Lenovo Tab P10",
      price: 2099,
      oldPrice: 3490,
      rating: 4,
      sold: 321,
      photos: [
        "/assets/sample-cars/AutoWallpaper_300083.jpg",
        "/assets/sample-cars/AutoWallpaper_300084.jpg"
        // ... more photos
      ]
    },
    {
      name: "Lenovo Tab P10",
      price: 2099,
      oldPrice: 3490,
      rating: 4,
      sold: 321,
      photos: [
        "/assets/sample-cars/AutoWallpaper_300083.jpg",
        "/assets/sample-cars/AutoWallpaper_300084.jpg"
        // ... more photos
      ]
    },
    {
      name: "Lenovo Tab P10",
      price: 2099,
      oldPrice: 3490,
      rating: 4,
      sold: 321,
      photos: [
        "/assets/sample-cars/AutoWallpaper_300083.jpg",
        "/assets/sample-cars/AutoWallpaper_300084.jpg"
        // ... more photos
      ]
    }
    // ... other products
  ];

  const [products, setProducts] = useState(deals);
  const [layout, setLayout] = useState("grid");

  //
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
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
    return (
      <div className="col-12" key={product.id}>
        <div
          className={classNames(
            "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
            { "border-top-1 surface-border": index !== 0 }
          )}
        >
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`${product.photos[0]}`}
            alt={product.name}
            onClick={() => {
              setSelectedProduct(product);
              setDisplayDialog(true);
            }}
            style={{ width: "100%", cursor: "pointer" }}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.name}</div>
              <Rating value={product.rating} readOnly cancel={false}></Rating>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.category}</span>
                </span>
                <Tag
                  value={product.inventoryStatus}
                  severity={getSeverity(product)}
                ></Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${product.price}</span>
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                disabled={product.inventoryStatus === "OUTOFSTOCK"}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (product) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{product.category}</span>
            </div>
            <Tag
              value={product.inventoryStatus}
              severity={getSeverity(product)}
            ></Tag>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img
              className="w-9 shadow-2 border-round"
              src={`${product.photos[0]}`}
              alt={product.name}
              onClick={() => {
                setSelectedProduct(product);
                setDisplayDialog(true);
              }}
              style={{ width: "100%", cursor: "pointer" }}
            />
            <div className="text-2xl font-bold">{product.name}</div>
            <Rating value={product.rating} readOnly cancel={false}></Rating>
          </div>
          <div className="flex align-items-center justify-content-between">
            <span className="text-2xl font-semibold">${product.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded"
              disabled={product.inventoryStatus === "OUTOFSTOCK"}
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
        <div className="col-6 p-3">
          <span className="block text-4xl font-bold text-900">
            Featured Products
          </span>
        </div>
        <div className="col-6 p-3 flex justify-content-end align-items-center">
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
        value={products}
        listTemplate={listTemplate}
        layout={layout}
        header={renderHeader()}
      />
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
