import React, { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

//
import { toast } from "react-toastify";
import { ProgressBar } from "primereact/progressbar";
import { useParams } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCars,
  getCarById,
  getCarBySlug,
  postCar,
  updateCar,
  deleteCarById
} from "../../services/cars/car-service";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";

const ProductDetailPage = () => {
  const [productDetailItem, setProductDetailItem] = useState({ images: [] });
  const [quantity, setQuantity] = useState(1);
  let { slug } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cars", slug],
    queryFn: () => getCarBySlug(slug)
  });

  console.log("featured product by id : ", data);
  useEffect(() => {
    if (!isLoading && !isError && data) {
      const modifiedImages = data.data.photos.map((photo) => ({
        original: `${process.env.REACT_APP_API_BASE_URL}${photo.photo_url}`,
        thumbnail: `${process.env.REACT_APP_API_BASE_URL}${photo.photo_url}`
      }));
      setProductDetailItem({ ...data.data, images: modifiedImages });
    }
  }, [data]);

  // const productDetailItem = {
  //   images: [
  //     {
  //       original:
  //         "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
  //       thumbnail:
  //         "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600"
  //     },
  //     {
  //       original:
  //         "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
  //       thumbnail:
  //         "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600"
  //     },
  //     {
  //       original:
  //         "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
  //       thumbnail:
  //         "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600"
  //     },
  //     {
  //       original:
  //         "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       thumbnail:
  //         "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //     },
  //     {
  //       original:
  //         "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
  //       thumbnail:
  //         "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600"
  //     }
  //   ],
  //   title: "BIG ITALIAN SOFA",
  //   reviews: "150",
  //   availability: true,
  //   brand: "apex",
  //   category: "Sofa",
  //   sku: "BE45VGTRK",
  //   price: 450,
  //   previousPrice: 599,
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem exercitationem voluptate sint eius ea assumenda provident eos repellendus qui neque! Velit ratione illo maiores voluptates commodi eaque illum, laudantium non!",
  //   size: ["XS", "S", "M", "L", "XL"],
  //   color: ["gray", "violet", "red"]
  // };

  const plusMinuceButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";

  const containerStyle = {
    margin: "auto",
    padding: "20px"
  };

  const headingStyle = {
    paddingTop: "12px",
    fontSize: "24px",
    fontWeight: "bold"
  };

  const ratingTextStyle = {
    marginLeft: "12px",
    fontSize: "small",
    color: "#aaa"
  };

  const availabilityTextStyle = {
    marginTop: "20px",
    fontWeight: "bold",
    color: productDetailItem?.availability ? "green" : "red"
  };

  const textStyleBold = {
    fontWeight: "bold"
  };

  const textStyleNormal = {
    fontWeight: "normal"
  };

  const priceStyle = {
    marginTop: "16px",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#8a2be2"
  };

  const oldPriceStyle = {
    fontSize: "small",
    color: "#aaa",
    textDecoration: "line-through"
  };

  const descriptionStyle = {
    paddingTop: "20px",
    fontSize: "small",
    color: "#aaa",
    lineHeight: "normal"
  };

  const labelStyle = {
    paddingBottom: "8px",
    fontSize: "small",
    color: "#aaa"
  };

  const hoverStyle = {
    backgroundColor: "#8a2be2",
    color: "white"
  };

  const [hoverCart, setHoverCart] = useState(false);
  const [hoverWishlist, setHoverWishlist] = useState(false);

  const buttonStyle = {
    height: "48px",
    width: "33%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8a2be2",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s"
  };

  const hoverCartStyle = {
    ...buttonStyle,
    backgroundColor: hoverCart ? "#0000ff" : "#8a2be2"
  };

  const hoverWishlistStyle = {
    ...buttonStyle,
    backgroundColor: hoverWishlist ? "#ffff00" : "#ffc107"
  };

  //
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState(false);

  const plusMinuceButtonStyle = {
    display: "flex",
    height: "32px",
    width: "32px",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    transition: "background-color 100ms",
    backgroundColor: hover ? "#f4f4f4" : "transparent", // neutral-100 equivalent
    outline: focus || active ? "2px solid #ccc" : "none" // ring-gray-500 equivalent
  };

  //

  //
  // Initialize state with default styles
  const [sectionStyle, setSectionStyle] = useState({
    display: "flex", // Default to flex
    flexWrap: "wrap",
    margin: "0 auto",
    width: "100%",
    paddingTop: "20px",
    paddingBottom: "20px",
    gridTemplateColumns: "1fr", // Default to single column layout
    gap: "20px" // Adjusted for visual consistency
  });

  const mainContainerStyle = {
    margin: "0 auto",
    paddingLeft: "16px",
    paddingRight: "16px"
  };

  // Loading handling
  if (isLoading) {
    return (
      <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
        <Skeleton width="100%" height="100%">
          <Skeleton
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,

              padding: "20px",
              borderRadius: "5px",

              textAlign: "left",
              transition: "all 0.3s ease"
            }}
          >
            <Skeleton style={{ margin: "0 0 10px 0", fontSize: "2rem" }}>
              <div style={{ margin: "20px", width: "100%" }}>
                <ProgressBar
                  mode="indeterminate"
                  style={{ height: "6px" }}
                ></ProgressBar>
              </div>
            </Skeleton>
            <Skeleton>
              {" "}
              <ProgressBar
                mode="indeterminate"
                style={{ height: "6px" }}
              ></ProgressBar>
            </Skeleton>
          </Skeleton>
        </Skeleton>
      </div>
    ); // Show skeleton when loading
  }

  if (isError) {
    console.log("Error fetching getAllCars:", error);
    toast.error(
      error?.response?.data?.message || "An Error Occurred Please Contact Admin"
    );
    return null;
  }

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  //
  const videoItemTemplate = (video) => {
    return (
      <div>
        <video controls style={{ width: "100%", maxHeight: "300px" }}>
          <source
            src={`${process.env.REACT_APP_API_BASE_URL}${video.video_url}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <p>{video.caption}</p>
      </div>
    );
  };

  //
  return (
    <Card>
      <section className="productDetailSection">
        {/* image gallery */}
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px"
          }}
        >
          <ReactImageGallery
            showBullets={false}
            showFullscreenButton={false}
            showPlayButton={false}
            items={productDetailItem?.images}
          />

          {productDetailItem?.videos && productDetailItem?.videos.length > 0 ? (
            <Carousel
              value={productDetailItem.videos}
              numVisible={3}
              numScroll={1}
              itemTemplate={videoItemTemplate}
            />
          ) : (
            <p>No videos available.</p>
          )}

          {/* /image gallery  */}
        </div>
        {/* description  */}

        <div style={containerStyle}>
          <h2 style={headingStyle}>
            {" "}
            <span style={textStyleBold}>Car: </span>
            {productDetailItem?.name}
          </h2>
          <div style={{ marginTop: "4px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Rater component placeholder */}
              <div style={{ fontSize: "20px" }}>★★★★☆</div>
              <p style={ratingTextStyle}>({productDetailItem?.reviews})</p>
            </div>
          </div>
          <p style={availabilityTextStyle}>
            Availability:{" "}
            <span>
              {productDetailItem?.visibility ? "In Stock " : "Expired"}
            </span>
          </p>
          <p style={textStyleBold}>
            Brand:{" "}
            <span style={textStyleNormal}>
              {productDetailItem?.brand?.name}
            </span>
          </p>
          <p style={textStyleBold}>
            Type:{" "}
            <span style={textStyleNormal}>{productDetailItem?.type?.name}</span>
          </p>
          {/* <p style={textStyleBold}>
          SKU: <span style={textStyleNormal}>{productDetailItem?.sku}</span>
        </p> */}
          <p style={priceStyle}>
            <span style={{ color: "white" }}> Price:</span> $
            {Number(productDetailItem?.price)?.toLocaleString()}UGX
            {/* <span style={oldPriceStyle}>
              ${Number(productDetailItem?.previousPrice)?.toLocaleString()}
            </span> */}
          </p>

          <p style={descriptionStyle}>
            <span style={{ color: "white" }}> Description: </span>
            {productDetailItem?.description}
          </p>
          {/* <div style={{ marginTop: "24px" }}>
          <p style={labelStyle}>Size</p>
          <div style={{ display: "flex", gap: "4px" }}>
            {productDetailItem?.size?.map((x, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  height: "32px",
                  width: "32px",
                  cursor: "pointer",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #ccc"
                }}
              >
                {x}
              </div>
            ))}
          </div>
        </div> */}
          <div style={{ marginTop: "24px" }}>
            <p style={labelStyle}>Color</p>
            <div style={{ display: "flex", gap: "4px" }}>
              {/* {productDetailItem?.color.map((x, index) => ( */}
              <div
                // key={index}
                style={{
                  height: "32px",
                  width: "32px",
                  cursor: "pointer",
                  border: "1px solid #fff",
                  // backgroundColor: x
                  backgroundColor: productDetailItem?.color
                }}
              />
              {/* ))} */}
            </div>
          </div>
          <div style={{ marginTop: "24px" }}>
            <p style={labelStyle}>Quantity</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                label="-"
                className="p-button-rounded p-button-outlined"
                onClick={decrement}
                icon="pi pi-minus"
                style={{ width: "50px" }}
              />
              <div
                style={{
                  margin: "0 10px",
                  minWidth: "32px",
                  textAlign: "center"
                }}
              >
                {quantity}
              </div>
              <Button
                label="+"
                className="p-button-rounded p-button-outlined"
                onClick={increment}
                icon="pi pi-plus"
                style={{ width: "50px" }}
              />
            </div>
          </div>
          <div style={{ marginTop: "28px", display: "flex", gap: "24px" }}>
            <Button
              label="Add to cart"
              icon="pi pi-shopping-cart"
              className="p-button-success p-button-rounded"
              onClick={() => console.log("Add to cart")}
              style={{ width: "140px" }}
            />
            <Button
              label="Buy"
              icon="pi pi-money-bill"
              className="p-button-primary p-button-rounded"
              onClick={() => console.log("Buy Item")}
              style={{ width: "140px" }}
            />
          </div>
        </div>
      </section>
    </Card>
  );
};

export default ProductDetailPage;
