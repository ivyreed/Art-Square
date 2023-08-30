import { gql } from "@apollo/client";
export const ADDART = gql`
  mutation addArt($secureUrl: String!) {
    addArt(secureUrl: $secureUrl) {
      secureUrl
    }
  }
`;
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const ADD_RATING_TO_ART = gql`
  mutation AddRatingToArt($artUrl: String!, $ratingValue: Int!) {
    addRatingToArt(artUrl: $artUrl, ratingValue: $ratingValue) {
      artUrl
      averageRating
    }
  }
`;

