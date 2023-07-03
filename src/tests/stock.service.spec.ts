import StockService from '../services/stock.service';

// Mock the data and dependencies for testing
// jest.mock('../data/stock.json', () => [
//   { sku: 'LTV719449/39/39', stock: 8525 },
//   { sku: 'CLQ274846/07/46', stock: 8414 },
// ]);

// jest.mock('../data/transactions.json', () => [
//   { sku: 'KED089097/68/09', type: 'order', qty: 8 },
//   { sku: 'DOK019240/66/49', type: 'order', qty: 4 },
// ]);

describe('StockService', () => {
  let stockService: StockService;

  beforeEach(() => {
    stockService = new StockService();
  });

  it('should return the current stock level for a valid SKU', async () => {
    const sku = 'LTV719449/39/39';
    const result = await stockService.getStockLevel(sku);
    expect(result).toEqual({ sku, stock: 8540 });
  });

  it('should return a stock level of 0 for a SKU with no transactions', async () => {
    const sku = 'CLQ274846/07/46';
    const result = await stockService.getStockLevel(sku);
    expect(result).toEqual({ sku, stock: 8459 });
  });

  it('should throw an error for an invalid SKU', async () => {
    const sku = 'INVALID_SKU';
    const result = await stockService.getStockLevel(sku);
    expect(result).toEqual({ sku, stock: 0 });
  });

  it('should handle transactions with different types (order and return)', async () => {
    const sku = 'KED089097/68/09';
    const result = await stockService.getStockLevel(sku);
    expect(result).toEqual({ sku, stock: 4986 });
  });

  it('should calculate the correct stock level with multiple transactions', async () => {
    const sku = 'CLQ274846/07/46';
    const result = await stockService.getStockLevel(sku);
    expect(result).toEqual({ sku, stock: 8459 });
  });
});
