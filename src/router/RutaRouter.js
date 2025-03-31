import express from 'express';
import RouteController from '../controller/RouteController.js';


const router = express.Router();

router.get('/all',RouteController.getAllRoutes);

export default router;