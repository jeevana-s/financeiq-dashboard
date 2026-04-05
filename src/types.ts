export type TransactionCategory =
  | 'Food'
  | 'Bills'
  | 'Travel'
  | 'Salary'
  | 'Shopping'
  | 'Entertainment'
  | 'Healthcare'
  | 'Transport';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  merchant: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  timestamp: number;
}

export interface BalanceDataPoint {
  date: string;
  balance: number;
  event?: string;
}

export interface CategorySpending {
  category: TransactionCategory;
  amount: number;
  percentage: number;
  color: string;
}

export interface Insight {
  id: string;
  type: 'good' | 'warning' | 'attention';
  title: string;
  description: string;
  metric?: string;
  trend?: number[];
}

export type UserRole = 'admin' | 'viewer';
