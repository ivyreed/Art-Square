
import { useState } from "react";
import "../assets/styles/ImageCard.css";
import ProfileImage from "../assets/images/profile.jpg";


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
      <a href="" className="overlay-user-container">
        <div className="overlay-image">
          <img src={ProfileImage}></img>
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
