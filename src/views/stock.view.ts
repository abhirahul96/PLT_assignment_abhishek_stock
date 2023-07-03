import { Stock } from '../models/stock.model';

class StockView {
  public renderStockLevel(stock: Stock): { sku: string; qty: number } {
    return { sku: stock.sku, qty: stock.stock };
  }
}

export default StockView;
