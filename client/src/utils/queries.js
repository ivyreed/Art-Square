import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      art {
          creators
          artId
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

