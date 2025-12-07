import mysql from 'mysql2/promise';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mysqlPool = mysql.createPool({
         host: process.env.DB_HOST || 'localhost',
         user: process.env.DB_USER || 'root',
         password: process.env.DB_PASSWORD,
         database: process.env.DB_NAME || 'ecommerce_db'
});

// Quick test function to verify MySQL connectivity
const testMySQLConnection = async () => {
         try {
                  // A simple query to ensure the pool can perform queries
                  await mysqlPool.query('SELECT 1');
                  console.log('Connected to MySQL');
         } catch (err) {
                  console.error('MySQL connection error:', err);
                  // Don't exit the process here; surface error to caller
                  throw err;
         }
};

const connectMongoDB = async () => {
         try {
                  if (!process.env.MONGO_URI) {
                           console.error('MONGO_URI is not defined in environment');
                           return;
                  }
                  await mongoose.connect(process.env.MONGO_URI);
                  console.log('Connected to MongoDB');
         } catch (error) {
                  console.error('MongoDB connection error:', error);
                  process.exit(1);
         }
};

export { mysqlPool, connectMongoDB, testMySQLConnection };