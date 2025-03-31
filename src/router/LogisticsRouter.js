import express from 'express';
import LogisticsController from '../controller/LogisticsController.js';

const router = express.Router();

router.post('/new',LogisticsController.createNewLogistics);
router.get('/transp',LogisticsController.reportePromTransportadores);
router.post('/period',LogisticsController.reportePeriodo);

export default router;