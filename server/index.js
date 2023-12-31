import express from "express";
import cors from 'cors';
import connectDB from './config/database.js';
import dotenv from 'dotenv';
import { userRouter } from './routes/auth.js';


// .env config
dotenv.config({ path: './config/.env' });

connectDB()

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", userRouter);


app.listen(process.env.PORT || "3001", () => {
    console.log(`server is running on ${process.env.PORT}`);
  });