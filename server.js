import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import morgan from 'morgan';

import cors from 'cors'
// db and authentication
import connectDb from './db/connect.js';

// routes
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';
import {auth as authenticateUser} from './middleware/auth.js'

import cloudinary from 'cloudinary';

// public
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const __dirname = dirname(fileURLToPath(import.meta.url));
// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error-handler.js';

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
}
// console.log("server running");
app.use(express.static(path.resolve(__dirname, './public')));

app.use(cors({
    origin:'https://jobhub-rituraj.onrender.com'
}));

app.use(express.json());

app.get('/', (req, res) => {
    // throw new Error('error');
    res.send("Welcome!");
});

app.get("/api/v1", (req, res)=> {
    res.json({msg:"API!"});
})

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/jobs/", authenticateUser, jobsRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'))
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running"));

const start = async() => {
    try {
        await connectDb(process.env.MONGO_URL);
    } catch (error) {
        console.log(error);
    }
}

start();
