import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      art {
          creators
          _id
          description
          image
          title
      }
    }
  }
`;

export const GET_GALLERY_IMAGES = gql`
  query getGalleryImages {
    getGalleryImages {
      public_id
      secure_url
      tags
      description
      title
    }
  }
`;

export const GET_ART_COUNT_FOR_USER = gql`
  query GetAllArtCountForUser($username: String!) {
    getAllArtCountForUser(username: $username) 
    
  }
`;


