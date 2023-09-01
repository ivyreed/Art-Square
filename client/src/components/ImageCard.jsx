import React from "react";
import RatingComponent from "./RatingComponent";
import "../assets/styles/ImageCard.css";

const ImageCard = ({ updateRating, artUrl }) => {


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
