/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './modules/student/student.route';
import { userRoutes } from './modules/user/user.route';
import globalMiddleWare from './middlewares/globalMiddleware';
import notFound from './middlewares/notFound';
import router from './routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// api endpoints

// app.use('/api/v1/students', studentRoutes);
// app.use('/api/v1/users', userRoutes);

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to ph university project',
  });
});

app.use(notFound)
app.use(globalMiddleWare);

export default app;
