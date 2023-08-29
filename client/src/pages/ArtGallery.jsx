import React from "react";
import { useQuery } from '@apollo/client';
import { GET_GALLERY_IMAGES } from '../utils/queries';
import { Card } from 'react-bootstrap';
import ImageCard from "../components/ImageCard.jsx";
import "./art.css";


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
    // Implement your rating update logic here
    console.log("Updated rating:", rating);
  };


  return (
    <div className="gallery-container">
      <h2>Art Gallery</h2>
      <div className="gallery-images">
        {galleryImages.map((image) => (
          <div key={image.public_id} className="gallery-image">
            <Card.Img src={image.secure_url} alt={`Artwork: ${image.title}`} />
            <ImageCard image={image} updateRating={handleUpdateRating} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default ArtGallery;


