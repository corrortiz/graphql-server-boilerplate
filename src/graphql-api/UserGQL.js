import gql from 'graphql-tag';
import { login, create, findAll } from '../controllers/UsersController';

export const userTypeDefs = gql`
  type Query {
    allUsers: [User]
    login(credentials: CredentialsInput): UserJWT!
  }

  type Mutation {
    addUser(data: UserInput): User
  }

  type User {
    id: ID!
    name: String!
    password: String!
    type: String!
  }

  type UserJWT {
    id: ID
    name: String
    password: String
    type: String
    jwt: String
  }

  input CredentialsInput {
    name: String!
    password: String!
  }

  input UserInput {
    _id: ID
    name: String
    password: String
    type: String
  }

`;

export const userResolvers = {
  Query: {
    allUsers: () => {
      return findAll();
    },
    login: (_, { credentials }) => {
      return login(credentials);
    }
  },
  Mutation: {
    addUser: (_, { data }) => {
      return create(data);
    }
  }
};
