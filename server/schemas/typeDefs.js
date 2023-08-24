const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    art: [Art]
  }

  type Art {
    artId: ID
    creators: [String]
    description: String
    title: String
    image: String
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
