import { ApolloServer } from 'apollo-server-express';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import { userResolvers, userTypeDefs } from './UserGQL';
import { citaResolvers, citaTypeDefs } from './CitaGQL';

const typeDefs = mergeTypes([userTypeDefs, citaTypeDefs], { all: true });

const resolvers = mergeResolvers([userResolvers, citaResolvers]);

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
