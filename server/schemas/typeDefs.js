const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    art: [Art]
    secureUrl: String
  }

  type Art {
    _id: ID
    artUrl: String
    creators: [String]
    description: String
    title: String
    image: String
  }

  type Auth {
    token: String!
    user: User
  }

  type ArtImage {
  public_id: String
  secure_url: String
  tags: [String]
  description: String
  title: String
}

  type Query {
    me: User
    getGalleryImages: [ArtImage]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addArt(secureUrl: String!): User

  
  }
`;

module.exports = typeDefs;
