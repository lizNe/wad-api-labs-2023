import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler'
import moviesRouter from './api/movies';   //import movies router
import authenticate from './authenticate';
import seriesRouter from './api/series'; 
import actorsRouter from './api/actors'; 



dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use(cors());
app.use(express.json());
app.use('/api/movies',authenticate,  moviesRouter);

app.use('/api/series', authenticate, seriesRouter); // Use tvSeriesRouter
app.use('/api/actors', authenticate, actorsRouter); // Use tvSeriesRouter


app.use('/api/users', usersRouter);
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});