import express from 'express';
import AssignOrderController from '../controller/AssignOrderController.js';


const router = express.Router();

router.post('/new',AssignOrderController.createNewAssign);

export default router;