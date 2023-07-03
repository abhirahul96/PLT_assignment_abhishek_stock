import express from 'express';
import StockController from '../controllers/stock.controller';

const router = express.Router();
const stockController = new StockController();

router.get('/getPrice', (req, res) => {
  stockController.getStockLevel(req, res);
});

export default router;
