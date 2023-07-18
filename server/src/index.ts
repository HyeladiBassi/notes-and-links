import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import Logger from "./utils/Logger";
import startServer from "./app";

startServer();

const exitHandler = () => {
  process.exit(1);
};

const unexpectedErrorHandler = (error: unknown) => {
  Logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  Logger.info("SIGTERM received");
});
