import express from 'express';
import dbConnect from '../config/dbConnect.js';
import dotenv from 'dotenv';
import { globalErrorHandler , notFound } from '../middleware/globalerrorHandler.js';
import userRouter from '../routes/userRouter.js';
import cors from 'cors';

dotenv.config();
dbConnect();

const app = express();

app.use(cors({ origin: ["http://localhost:3000"] }));

app.use(express.json());

//routes
app.use('/api/v1/users/', userRouter);

//error middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;

