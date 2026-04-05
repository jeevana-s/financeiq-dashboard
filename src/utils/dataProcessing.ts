import { Transaction, CategorySpending } from '../types';

export const calculateTotalBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
};

export const calculateMonthlyChange = (transactions: Transaction[]): number => {
  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth - 1;

  const currentMonthTotal = transactions
    .filter((t) => new Date(t.date).getMonth() === currentMonth)
    .reduce((sum, t) => sum + t.amount, 0);

  const lastMonthTotal = transactions
    .filter((t) => new Date(t.date).getMonth() === lastMonth)
    .reduce((sum, t) => sum + t.amount, 0);

  if (lastMonthTotal === 0) return 0;
  return ((currentMonthTotal - lastMonthTotal) / Math.abs(lastMonthTotal)) * 100;
};

export const getCategorySpending = (transactions: Transaction[]): CategorySpending[] => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {} as Record<string, number>);

  const total = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  const colors: Record<string, string> = {
    Food: '#10b981',
    Bills: '#f59e0b',
    Travel: '#3b82f6',
    Shopping: '#8b5cf6',
    Entertainment: '#ec4899',
    Healthcare: '#14b8a6',
    Transport: '#6366f1',
    Salary: '#22c55e',
  };

  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category: category as any,
      amount,
      percentage: (amount / total) * 100,
      color: colors[category] || '#6b7280',
    }))
    .sort((a, b) => b.amount - a.amount);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const getRecentActivity = (transactions: Transaction[]) => {
  return [...transactions]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5)
    .map((t) => ({
      id: t.id,
      title: t.merchant,
      description: t.description,
      timestamp: t.date,
      type: t.type,
      amount: t.amount,
    }));
};
