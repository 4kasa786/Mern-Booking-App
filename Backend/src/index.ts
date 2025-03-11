import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';//it is used to load the environment variables from the .env file into process.env
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log(err);
})//as string is used to tell the typescript that the value is a string.

const app = express();

app.use(express.static(path.join(__dirname, '../../Frontend/dist')))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));// this is used to parse the incoming requests with urlencoded payloads.
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes)

app.listen(7000, () => {
    console.log("Server running on port 7000");
})