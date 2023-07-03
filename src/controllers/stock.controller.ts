import { Request, Response } from 'express';
import StockService from '../services/stock.service';
import StockView from '../views/stock.view';

class StockController {
  private stockService: StockService;
  private stockView: StockView;

  constructor() {
    this.stockService = new StockService();
    this.stockView = new StockView();
  }

  /**
   * Retrieve the current stock level for a given SKU.
   * @param req - The Express request object
   * @param res - The Express response object
   * @returns JSON response with the stock level information or an error message
   */
  public async getStockLevel(req: Request, res: Response) {
    const sku: string = req.query.sku as string;

    // Check if SKU parameter is provided
    if (!sku) {
      res.status(400).json({ error: 'SKU parameter is required' });
      return;
    }

    try {
      // Retrieve the stock level from the StockService
      const stockLevel = await this.stockService.getStockLevel(sku);

      // Render the stock level view using the StockView
      const stockLevelView = this.stockView.renderStockLevel(stockLevel);

      // Send the stock level view as JSON response
      res.json(stockLevelView);
    } catch (error: any) {
      // Handle any errors and send an error response
      res.status(500).json({ error: error.message });
    }
  }
}

export default StockController;
