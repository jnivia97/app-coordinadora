import express from 'express';
import DeliveryController from '../controller/DeliveryController.js';

const router = express.Router();

router.post('/new',DeliveryController.createDelivery);
router.post('/id',DeliveryController.getOrderById);
router.post('/user',DeliveryController.getOrderByUser);
router.post('/filter',DeliveryController.getOrderByFilter);
router.get('/all',DeliveryController.allOrders);
router.get('/allfree',DeliveryController.allOrdersFree)

export default router;