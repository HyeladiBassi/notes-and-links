import mongoose from 'mongoose';
import Logger from '../utils/Logger';
import config from '../config';

// Define the MongoDB connection URI
const MONGODB_URI = config.DB_URL || "";

// Create a function to initialize MongoDB connection
export const initializeMongoDB = async () => {
    try {
      // Connect to MongoDB using the provided URI
      await mongoose.connect(MONGODB_URI, {
        auth: {
            username: '',
            password: ''
        }
      });
  
      // Connection successful, log a success message
      mongoose.connection.once('open', () => {
        Logger.info('MongoDb Database connection')
      });
  
    } catch (error) {
      // Connection failed, log the error
      Logger.error('MongoDB Connection Error');
    }
}
