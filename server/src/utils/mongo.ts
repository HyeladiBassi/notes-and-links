import mongoose from "mongoose";
import config from "../config";
import Logger from "./Logger";

export async function connectToMongo() {
  try {
    await mongoose.connect(config.dbUrl);
    Logger.info("Connected to Database");
  } catch (error) {
    Logger.error(error);
  }
}
