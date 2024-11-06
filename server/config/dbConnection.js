const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MongoDB URI is missing in the .env file');
    }

    // Remove deprecated options
    await mongoose.connect(uri);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDb;
