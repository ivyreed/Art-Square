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