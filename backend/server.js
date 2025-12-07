
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectMongoDB, testMySQLConnection } from './config/db.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
         res.send('Backend Server is Running');
});

app.use('/api', apiRoutes);

const start = async () => {
         try {
                  await connectMongoDB();
                  await testMySQLConnection();
                  app.listen(process.env.PORT || 5000, () => {
                           console.log(`Server running on port ${process.env.PORT || 5000}`);
                  });
         } catch (err) {
                  console.error('Failed to start server due to DB connection error');
                  process.exit(1);
         }
};

start();

