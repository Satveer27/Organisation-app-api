import express from 'express';
import dbConnect from '../config/dbConnect.js';
import dotenv from 'dotenv';
import { globalErrorHandler , notFound } from '../middleware/globalerrorHandler.js';
import userRouter from '../routes/userRouter.js';
import cors from 'cors';

dotenv.config();
dbConnect();

const app = express();
app.use(express.json());

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const cors = require('cors');

//cors
app.use(cors(corsOptions));

//routes
app.use('/api/v1/users/', userRouter);

//error middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;