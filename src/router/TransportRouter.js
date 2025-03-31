import express from 'express';
import TransportController from '../controller/TransportController.js';

const router = express.Router();

router.get('/allfree',TransportController.allGetTransport);

export default router;