import { TrasactionType } from '../enums/transaction-type.enum';
import { Stock } from '../models/stock.model';
import { Transaction } from '../models/transaction.model';
import { readFile } from '../utils/readFile.util';

class StockService {
  private stockData: Stock[];
  private transactionsData: Transaction[];

  constructor() {
    this.stockData = [];
    this.transactionsData = [];
  }

  /**
   * Initialize stockData and transactionsData by reading the JSON files
   */
  public async initialize(): Promise<void> {
    const stockData = await readFile('./src/data/stock.json');
    const transactionsData = await readFile('./src/data/transactions.json');

    this.stockData = JSON.parse(stockData);
    this.transactionsData = JSON.parse(transactionsData);
  }

  /**
   * Get the current stock level for a given SKU
   * @param sku - The SKU to retrieve the stock level for
   * @returns A Promise resolving to the Stock object containing the SKU and current stock level
   * @throws If an error occurs during the process
   */
  public async getStockLevel(sku: string): Promise<Stock> {
    try {
      await this.initialize();

      // Find the starting stock level for the given SKU, defaulting to 0 if not found
      const startingStockLevel =
        this.stockData.find(item => item.sku === sku)?.stock || 0;

      // Calculate the total quantity change for the given SKU
      const totalQuantityChange = this.transactionsData
        .filter(transaction => transaction.sku === sku)
        .reduce(
          (total, transaction) =>
            total +
            (transaction.type === TrasactionType.ORDER
              ? transaction.qty
              : -transaction.qty),
          0,
        );

      // Calculate the current stock level by adding the starting stock level and the total quantity change
      const currentStockLevel = startingStockLevel + totalQuantityChange;

      // Throw an error if the current stock level is negative
      if (currentStockLevel < 0) {
        throw new Error('Invalid stock level');
      }

      // Create the Stock object with the SKU and current stock level
      const output: Stock = { sku, stock: currentStockLevel };
      return output;
    } catch (error) {
      throw error;
    }
  }
}

export default StockService;
