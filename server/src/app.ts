import express from "express";
import helmet from 'helmet'
import compression from 'compression';
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import config from "./config";
import Logger from "./utils/Logger";
import { resolvers, typeDefs } from "./gql";
import GraphQLContext from "./models/GraphQLContext";
import http from 'http'
import bodyParser from 'body-parser'
import { cspDirectives } from "./config/csp";

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app)
  const { PORT, CLIENT_URL } = config;

  // Set security HTTP headers
  app.use(helmet());
  app.use(helmet.hidePoweredBy());

  // Configure Content Security Policy (CSP)
  app.use(
    helmet.contentSecurityPolicy({
      directives: cspDirectives
    })
  );

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
    })
  );
  app.options('*', cors);

  // Add Graphql Middleware
  const apolloServer = new ApolloServer<GraphQLContext>({
    typeDefs: typeDefs,
    resolvers: resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })
  await apolloServer.start()
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(apolloServer),
  )

  // Start the server
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve))
  Logger.info(`Server ready at http://localhost:${PORT}`);
}

export default startServer;