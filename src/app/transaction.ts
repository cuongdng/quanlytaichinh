export type TransactionType = 'outcome' | 'income';
export type Category =
  | 'food'
  | 'clothes'
  | 'salary'
  | 'fee'
  | 'shopping'
  | 'dept'
  | 'transportation'
  | 'bonus'
  | 'gift';

export interface Transaction {
  date: Date;
  title?: string;
  type: TransactionType;
  category: Category;
  amount: number;
}
