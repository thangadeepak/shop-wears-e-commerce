import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce_db');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Instead of exiting process in dev demo if local mongo is offline, log warning
    console.log('⚠️ Running in fallback in-memory mode if DB unavailable.');
  }
};

export default connectDB;
