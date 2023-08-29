import React, { useState } from "react";
import "./RatingComponent.css"; 

const RatingComponent = ({ updateRating }) => {
  const [userRating, setUserRating] = useState(null);

  const handleRatingChange = (rating) => {
    setUserRating(rating);
    updateRating(rating);
  };

  return (
    <div className="rating-overlay">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          onClick={() => handleRatingChange(rating)}
          className={userRating === rating ? "selected" : ""}
        >
          {rating}
        </button>
      ))}
    </div>
  );
};

export default RatingComponent;
