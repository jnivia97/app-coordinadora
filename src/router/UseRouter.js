import express from 'express';
import UserController from '../controller/UserController.js'

const router = express.Router();

router.post("/into",UserController.loginUser);

export default router;