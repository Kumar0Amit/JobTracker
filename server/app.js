// server/server.js
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import {connection} from './database/dbConnect.js';
import path from "path";
import { fileURLToPath } from "url";
// middlewares
import {notFoundMiddleware} from './middleware/notFoundMiddleware.js';
import {errorHandlerMiddleware} from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import helmet from 'helmet';
import { sanitizeMiddleware } from './middleware/sanitizeMiddleware.js';
import rateLimiter from './middleware/rateLimiter.js';
import { v2 as cloudinary } from 'cloudinary'; 


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const app = express();


// Provide a fallback for local development
// const allowedOrigins = [
//   process.env.CLIENT_URL || "https://jobtracker-1-loaq.onrender.com"
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "PATCH","DELETE"],
//     credentials: true,
//   })
// );
const allowedOrigins = [
  "https://jobtracker-1-loaq.onrender.com", // your frontend
  "http://localhost:5173" // optional, for local dev
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);



// routers
import authRouter from './routes/authRouter.js';
import jobRouter from './routes/jobRouter.js';
import userRouter from './routes/userRouter.js';





// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(sanitizeMiddleware);

// test route
app.get('/api/v1', (req, res) => {
  res.send({ message: 'Jobify API is running...' });
});

//routers
app.use('/api/v1/jobs', [rateLimiter(), authenticateUser], jobRouter);
app.use('/api/v1/users', [rateLimiter(), authenticateUser], userRouter);
app.use('/api/v1/auth', authRouter);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React build
app.use(express.static(path.join(__dirname, "dist")));

// Fallback for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


//error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


connection();





