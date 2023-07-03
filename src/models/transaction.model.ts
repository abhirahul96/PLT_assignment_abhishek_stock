import { TrasactionType } from '../enums/transaction-type.enum';

export interface Transaction {
  sku: string;
  qty: number;
  type: TrasactionType;
}
