import React from "react";
import RatingComponent from "./RatingComponent";
import "../assets/styles/ImageCard.css";

const ImageCard = ({ image, updateRating, artUrl, rating }) => {
  console.log(image)
  console.log("Rating for Image:", rating);
  console.log("ImageCard props:", image, rating);

  return (
    <div className="image-card-overlay">
      <div className="image-card-content">
        <RatingComponent
          updateRating={updateRating}
          artUrl={artUrl}
        />
      </div>
    </div>
  );
};

export default ImageCard;
