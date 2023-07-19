import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import Logger from "./utils/Logger";
import http from "http";
import bodyParser from "body-parser";
import { cspDirectives } from "./config/csp";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from "@apollo/server/plugin/landingPage/default";
import { resolvers } from "./resolvers";
import { connectToMongo } from "./utils/mongo";
import Context from "./types/context";
import { customFormatError } from './utils/formatError';
import config from './config';

async function startServer() {
  const schema = await buildSchema({
    resolvers,
  });

  const app = express();
  const httpServer = http.createServer(app);

  // Set security HTTP headers
  app.use(helmet());
  app.use(helmet.hidePoweredBy());

  // Add cookie parser middleware
  app.use(cookieParser());

  // Set security HTTP headers
  app.use(helmet());
  app.use(helmet.hidePoweredBy());

  // Configure Content Security Policy (CSP)
  app.use(
    helmet.contentSecurityPolicy({
      directives: cspDirectives,
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
      origin: "*",
    })
  );
  app.options("*", cors);

  // Add Graphql Middleware
  const apolloServer = new ApolloServer<Context>({
    schema,
    formatError: customFormatError,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault(),
    ],
  });
  await apolloServer.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res, user }: Context) => {
        return { req, res, user };
      },
    })
  );

  // Start the server
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: config.port }, resolve)
  );
  Logger.info(`Server ready at http://localhost:${config.port}`);
  connectToMongo();
}

export default startServer;
