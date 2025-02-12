const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      connectTimeoutMS: 100000, // Increase timeout for server selection
      connectTimeoutMS: 45000,         // Increase timeout for connection
      socketTimeoutMS: 45000 ,
              // Increase timeout for socket operations
    });
    console.log(' MongoDB connected successfully');
  } catch (error) {
    console.error(' MongoDB connection error:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = { connectDB };
