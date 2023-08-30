import React, { useState } from "react";
import "./RatingComponent.css"; 
import { useMutation } from '@apollo/client';
import { ADD_RATING_TO_ART } from '../utils/mutations';

const RatingComponent = ({ updateRating, artUrl }) => {
  console.log(artUrl);
  const [userRating, setUserRating] = useState(null);
  const [addRatingToArt] = useMutation(ADD_RATING_TO_ART);

  const handleRatingChange = async (rating) => {
    setUserRating(rating);

    try {
      const { data } = await addRatingToArt({
        variables: {
          artUrl: artUrl,
          ratingValue: rating
        }
      });
      
      if (data && data.addRatingToArt) {
        updateRating(data.addRatingToArt.averageRating);
      }

    } catch (error) {
      console.error("Failed to submit rating:", error.message);
    }
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
