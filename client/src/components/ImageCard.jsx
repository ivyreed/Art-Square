import React from "react";
import RatingComponent from "./RatingComponent";
import "./ImageCard.css";


const calculateAverage = (ratings) => {
  if (!ratings || ratings.length === 0) {
    return 0; 
  }


  const totalRatings = ratings.reduce((sum, rating) => sum + rating, 0);
  const average = totalRatings / ratings.length;


  return average;
};


const ImageCard = ({ image, updateRating }) => {
  const averageRating = calculateAverage(image.ratings);


  return (
    <div className="image-card-overlay">
      <div className="image-card-content">
        
        <RatingComponent updateRating={updateRating} averageRating={averageRating} />
      </div>
    </div>
  );
};


export default ImageCard;



