import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_GALLERY_IMAGES } from "../utils/queries";
import { Card } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import ImageCard from "../components/ImageCard.jsx";
import Welcome from "../assets/images/welcome.svg";
import "../assets/styles/art.css";
import Auth from "../utils/auth";

const ArtGallery = () => {
  const { loading, data } = useQuery(GET_GALLERY_IMAGES);
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  const galleryImages = data?.getGalleryImages || [];

  const handleUpdateRating = (rating) => {

    console.log("Updated rating:", rating);
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <div className="gallery-container">
          <div className="gallery-images">
            {galleryImages.map((image) => (
              <div key={image.public_id} className="gallery-image">
                <Card.Img
                  src={image.secure_url}
                  alt={`Artwork: ${image.title}`}
                />
                <ImageCard
                  image={image}
                  updateRating={handleUpdateRating}
                  artUrl={image.secure_url}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="welcome-container">
            <div className="welcome-box">
              <img src={Welcome}></img>
              <button
                className="welcome-btn"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      <LoginForm
        handleModalClose={() => setShowLoginModal(false)}
        isActive={showLoginModal}
      />
    </div>
  );
};

export default ArtGallery;
