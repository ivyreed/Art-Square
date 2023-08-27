import { useQuery } from '@apollo/client';
import { GET_GALLERY_IMAGES } from '../utils/queries';
import { Container, Row, Col, Card } from 'react-bootstrap';


const ArtGallery = ({ isLoggedIn }) => {
    const { loading, data } = useQuery(GET_GALLERY_IMAGES);

    if (!isLoggedIn) {
      return <div>Please log in to view the art gallery.</div>;
    }
  
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
              <Card style={{border: "none", borderRadius: "0",overflow: "hidden"}}>
                <Card.Img src={image.secure_url} alt={`Artwork: ${image.title}`} variant='top' style={{width:"260px", height:"260px", objectFit: image.width === 260 && image.height === 260 ? 'cover' : 'none', borderRadius:"0"}}/>
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