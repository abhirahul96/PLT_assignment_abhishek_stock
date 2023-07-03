import { Request, Response } from 'express';
import StockService from '../services/stock.service';
import StockView from '../views/stock.view';
import StockController from '../controllers/stock.controller';

describe('StockController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let stockService: StockService;
  let stockView: StockView;
  let stockController: StockController;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    stockService = new StockService();
    stockView = new StockView();
    stockController = new StockController();
  });

  describe('getStockLevel', () => {
    it('should return the stock level for a valid SKU', async () => {
      const sku = 'LTV719449/39/39';
      const stock = { sku: 'LTV719449/39/39', stock: 8525 };
      const stockLevel = { sku: 'LTV719449/39/39', qty: 8525 };

      jest.spyOn(stockService, 'getStockLevel').mockResolvedValue(stock);
      jest.spyOn(stockView, 'renderStockLevel').mockReturnValue(stockLevel);

      mockRequest.query = { sku };

      await stockController.getStockLevel(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(stockService.getStockLevel).toHaveBeenCalledWith(sku);
      expect(stockView.renderStockLevel).toHaveBeenCalledWith(stockLevel);
      expect(mockResponse.json).toHaveBeenCalledWith(stockLevel);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return an error response for missing SKU parameter', async () => {
      mockRequest.query = {};

      await stockController.getStockLevel(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'SKU parameter is required',
      });
    });

    it('should return an error response when stockService throws an error', async () => {
      const errorMessage = 'SKU parameter is required';
      jest
        .spyOn(stockService, 'getStockLevel')
        .mockRejectedValue(new Error(errorMessage));

      mockRequest.query = {};

      await stockController.getStockLevel(
        mockRequest as Request,
        mockResponse as Response,
      );

      //   expect(stockService.getStockLevel).toHaveBeenCalledWith(sku);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
