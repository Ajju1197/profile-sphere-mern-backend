import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import auth from './router/auth.js';
import userDetails from './router/userDetails.js';
import about from './router/about.js';
import blogCommentRoute from './router/blogComments.js';
import videoRoute from './router/videos.js';
import blog from './router/blog.js';

const app = express();
dotenv.config({ path: './config.env' });

// app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url); // Convert import.meta.url to a file path
const __dirname = path.dirname(__filename); // Get the directory name from the file path
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


// this MongoDB URI
const DB = process.env.DATABASE;

// Connecting the DataBase of MongoDB With Mongoose.
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB connection success');
}).catch(err => {
    console.log(err + ' ' + 'no Connection');
});

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.use('/api', auth);
app.use('/api', userDetails);
app.use('/api', about);
app.use('/api', blog);
app.use('/api', videoRoute);
app.use('/api', blogCommentRoute);


// this is PORT
const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
    console.log('Port is Running in 5000');
})