import app from './app';
import { ApolloServer, gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world'
  }
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

/*eslint no-console: ["error", { allow: ["log"] }] */
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)