import app from './app';
import server from './graphql-api';

server.applyMiddleware({ app });

/*eslint no-console: ["error", { allow: ["log"] }] */
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
