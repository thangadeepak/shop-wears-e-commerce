import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';
import { sampleProducts } from './controllers/productController.js';
import connectDB from './config/db.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log('✅ Sample products successfully seeded to database!');
    process.exit();
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
