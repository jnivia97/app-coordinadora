import express from 'express';
import cors from 'cors';
import userRouter from './router/UseRouter.js';
import deliveryRouter from './router/DeliveryRouter.js';
import rutaRouter from './router/RutaRouter.js';
import transportRouter from './router/TransportRouter.js';
import assignOrderRouter from './router/AssignOrderRouter.js';
import logisticsRouter from './router/LogisticsRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user',userRouter);
app.use('/order',deliveryRouter);
app.use('/route',rutaRouter);
app.use('/transport',transportRouter);
app.use('/assign',assignOrderRouter);
app.use('/report',logisticsRouter);


export default app;




