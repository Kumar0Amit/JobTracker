// server/server.js
import 'dotenv/config';
// import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import {connection} from './database/dbConnect.js';


export const app = express();


// Provide a fallback for local development
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// routers
// import authRouter from './routes/authRouter.js';
// import jobRouter from './routes/jobRouter.js';
// import userRouter from './routes/userRouter.js';

// middlewares
// import notFoundMiddleware from './middleware/notFoundMiddleware.js';
// import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
// import { authenticateUser } from './middleware/authMiddleware.js';
// import helmet from 'helmet';
// import mongoSanitize from 'express-mongo-sanitize';
// import rateLimiter from './middleware/rateLimiter.js';


// ✅ use morgan only in development
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// middlewares
app.use(cookieParser());
app.use(express.json());
// app.use(helmet());
// app.use(mongoSanitize());

// test route
app.get('/api/v1', (req, res) => {
  res.send({ message: 'Jobify API is running...' });
});

// routers
// app.use('/api/v1/jobs', [rateLimiter(), authenticateUser], jobRouter);
// app.use('/api/v1/users', [rateLimiter(), authenticateUser], userRouter);
// app.use('/api/v1/auth', authRouter);

// error handling
// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;


connection();

// const startServer = async () => {
//   try {
//     await connectDB(process.env.MONGO_URL);
//     app.listen(port, () => console.log(`✅ Server running on port ${port}`));
//   } catch (error) {
//     console.error('❌ Server failed to start:', error);
//   }
// };

// startServer();