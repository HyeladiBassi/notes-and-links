import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import config from './config';
import Logger from './utils/Logger';
import { resolvers, typeDefs } from './gql';
import GraphQLContext from './models/GraphQLContext';

async function startServer() {
  const app = express();
  const { PORT, CLIENT_URL } = config;

  // Set security HTTP headers
  app.use(helmet());
  app.use(helmet.hidePoweredBy());

  // Parse Json request body
  app.use(express.json());

  // Parse urlencoded request body
  app.use(express.urlencoded({ extended: true }));

  // Set gzip compression
  app.use(compression());

  // Enable cors
  app.use(
    cors({
      origin: CLIENT_URL,
    }),
  );
  app.options('*', cors);

  // Add Graphql Middleware
  const apolloServer = new ApolloServer<GraphQLContext>({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });
  await apolloServer.start();
  app.use(expressMiddleware(apolloServer));

  // Start the server
  app.listen(PORT, () => {
    Logger.info(`Listening on PORT ${PORT}`);
  });
}

export default startServer;
