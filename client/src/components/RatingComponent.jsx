import { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_RATING_TO_ART } from '../utils/mutations';
import "../assets/styles/ImageCard.css";
import ProfileImage from "../assets/images/profile.jpg";


const roundToOneDecimal = (num) => {
  return Math.round(num * 10) / 10;
}

const RatingComponent = ({ updateRating, artUrl, username }) => {
  console.log(artUrl);
  const [userRating, setUserRating] = useState(null);
  const [hasRated, setHasRated] = useState(false);
  const [addRatingToArt] = useMutation(ADD_RATING_TO_ART);

  const handleRatingChange = async (rating) => {

    setHasRated(true);
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
        setUserRating(roundToOneDecimal(data.addRatingToArt.averageRating));
      }

    } catch (error) {
      console.error("Failed to submit rating:", error.message);
    }
  };

  return (
    <div className="rating-overlay">
      <a href="" className="overlay-user-container">
        <div className="overlay-image">
          <img src={ProfileImage}></img>
        </div>
        <div className="username">{username}</div>
      </a>
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => handleRatingChange(rating)}
            disabled={hasRated}
            className={`rating-btn ${userRating === rating ? "selected" : ""}`}
          >
          {rating}
          </button>
        ))}
      </div>
      <div className="image-average"> {roundToOneDecimal(userRating)}/5</div>
    </div>
  );
};

export default RatingComponent;
