import React from "react";
import { useQuery } from "@apollo/client";
import { GET_GALLERY_IMAGES } from "../utils/queries";
import { Card } from "react-bootstrap";
import ImageCard from "../components/ImageCard.jsx";

import "../assets/styles/Art.css";


const ArtGallery = ({ isLoggedIn }) => {
  const { loading, data } = useQuery(GET_GALLERY_IMAGES);

  if (!isLoggedIn) {
    return <div>Please log in to view the art gallery.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const galleryImages = data?.getGalleryImages || [];

  const handleUpdateRating = (rating) => {
    console.log("Updated rating:", rating);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-images">
        {galleryImages.map((image) => (
          <div key={image.public_id} className="gallery-image">
            <Card.Img src={image.secure_url} alt={`Artwork: ${image.title}`} />
            <ImageCard
              image={image}
              rating={image.averageRating}
              updateRating={handleUpdateRating}
              artUrl={image.secure_url}
            />
          </div>
        ))}
      </div>
      {/* <div className="galler-bg-container">
        <div className="gallery-bg"></div>
      </div> */}
    </div>
  );
};

export default ArtGallery;
