import { useQuery } from '@apollo/client';
import { GET_GALLERY_IMAGES } from '../utils/queries';
import { Container, Row, Col, Card } from 'react-bootstrap';


const ArtGallery = () => {
    const { loading, data } = useQuery(GET_GALLERY_IMAGES);

if (loading) {
  return <div>Loading...</div>;
}

const galleryImages = data?.getGalleryImages || [];
console.log(galleryImages);
  
    return (
        <Container>
        <h2>Art Gallery</h2>
        <Row>
          {galleryImages.map((image) => (
            <Col md="4" key={image.public_id}>
              <Card>
                <Card.Img src={image.secure_url} alt={`Artwork: ${image.title}`} variant='top' />
                <Card.Body>
                  <Card.Title>{image.title}</Card.Title>
                  <Card.Text>{image.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>      
    );
  };
export default ArtGallery;  