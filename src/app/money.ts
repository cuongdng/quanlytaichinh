import { Transaction } from './transaction';

export interface Money {
  transactions: Transaction[];
  total: number;
}
