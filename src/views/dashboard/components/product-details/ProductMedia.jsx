import React from "react";

function ProductMedia({ selectedProduct }) {
  //

  const mediaStyle = {
    height: "300px", // Fixed height for all media containers
    width: "100%", // Full width within its parent container
    marginBottom: "1rem",
    overflow: "hidden", // Prevents overflow if media is larger than the container
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative" // Needed for proper positioning of the media
  };

  const imageStyle = {
    width: "auto",
    height: "100%",
    objectFit: "cover" // Cover the area of the div without distorting aspect ratio
  };

  const videoStyle = {
    width: "100%", // Ensure video fills the container width
    height: "100%", // Ensure video fills the container height
    objectFit: "cover" // Cover the area of the div without distorting aspect ratio
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}
    >
      {selectedProduct?.photos?.map((photo, index) => (
        <div key={index} style={mediaStyle}>
          <img
            src={`${process.env.REACT_APP_API_BASE_URL}${photo?.photo_url}`}
            alt={`Product Image ${index + 1}`}
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
            style={imageStyle}
          />
        </div>
      ))}
      {selectedProduct?.videos?.map((video, index) => (
        <div key={index} style={mediaStyle}>
          <video
            controls
            style={videoStyle}
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
          >
            <source
              src={`${process.env.REACT_APP_API_BASE_URL}${video?.video_url}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}

export default ProductMedia;
