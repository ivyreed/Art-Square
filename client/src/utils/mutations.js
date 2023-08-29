import { gql } from "@apollo/client";
export const ADDART = gql`
  mutation addArt($secureUrl: String!) {
    addArt(secureUrl: $secureUrl) {
      _id
      email
      art {
        artUrl
      }
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
        art {
          creators
          artId
          description
          image
          title
        }
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
