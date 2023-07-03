import express from 'express';
import stockRoutes from './stock.routes';

const router = express.Router();

router.use('/stock', stockRoutes);

export default router;
