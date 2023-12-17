import express, { Application, Request, Response } from "express"
import cors from 'cors';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());



app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message : 'Welcome to ph university project'
  })
})

export default app;



//=================================================
/*
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './modules/user/user.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());


app.use('/api', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to mongoose express crud project',
  });
});

export default app;

*/