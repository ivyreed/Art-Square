import { useState } from "react";
import "../assets/styles/ImageCard.css";
import profileImage from "../assets/images/profile.jpg";

const RatingComponent = ({ updateRating }) => {
  const [userRating, setUserRating] = useState(null);

  const handleRatingChange = (rating) => {
    setUserRating(rating);
    updateRating(rating);
  };

  return (
    <div className="rating-overlay">
      <a href="" className="overlay-user-container">
        <div className="overlay-image">
          <img src={profileImage}></img>
        </div>
        <div className="username">Username</div>
      </a>
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => handleRatingChange(rating)}
            className={`rating-btn ${userRating === rating ? "selected" : ""}`}
          >
            {rating}
          </button>
        ))}
      </div>
      <div className="image-average">5/5</div>
    </div>
  );
};

export default RatingComponent;
