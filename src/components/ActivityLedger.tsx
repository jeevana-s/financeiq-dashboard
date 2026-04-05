import { useState } from 'react';
import { Receipt, Plus, Search, Filter, ArrowUpCircle, ArrowDownCircle, Utensils, CreditCard, Plane, ShoppingBag, Film, Heart, Car, DollarSign } from 'lucide-react';
import { Transaction, TransactionCategory } from '../types';
import { formatCurrency, formatDate } from '../utils/dataProcessing';
import { useApp } from '../context/AppContext';

interface ActivityLedgerProps {
  transactions: Transaction[];
  onAddTransaction?: () => void;
}

const categoryIcons: Record<TransactionCategory, any> = {
  Food: Utensils,
  Bills: CreditCard,
  Travel: Plane,
  Shopping: ShoppingBag,
  Entertainment: Film,
  Healthcare: Heart,
  Transport: Car,
  Salary: DollarSign,
};

export const ActivityLedger = ({ transactions, onAddTransaction }: ActivityLedgerProps) => {
  const { userRole, searchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);

  const categories = ['All', 'Income', 'Expenses', ...Array.from(new Set(transactions.map(t => t.category)))];

  const filteredTransactions = transactions
    .filter((t) => {
      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Income') return t.type === 'income';
      if (selectedCategory === 'Expenses') return t.type === 'expense';
      return t.category === selectedCategory;
    })
    .filter((t) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        t.merchant.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 flex items-center justify-center">
            <Receipt className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Activity Ledger</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {filteredTransactions.length} transactions
            </p>
          </div>
        </div>

        {userRole === 'admin' && (
          <button
            onClick={onAddTransaction}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
              ${
                selectedCategory === category
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-10 h-10 text-slate-400" />
          </div>
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            No activity yet
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Your financial story starts here
          </p>
          {userRole === 'admin' && (
            <button
              onClick={onAddTransaction}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Add First Transaction
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTransactions.map((transaction) => {
            const Icon = categoryIcons[transaction.category];
            const isExpanded = expandedTransaction === transaction.id;
            const isIncome = transaction.type === 'income';

            return (
              <div
                key={transaction.id}
                className={`
                  rounded-xl border transition-all cursor-pointer
                  ${
                    isExpanded
                      ? 'bg-slate-50 dark:bg-slate-800 border-teal-200 dark:border-teal-500/30 shadow-lg'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }
                `}
                onClick={() => setExpandedTransaction(isExpanded ? null : transaction.id)}
              >
                <div className="flex items-center gap-4 p-4">
                  <div
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${isIncome ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-slate-100 dark:bg-slate-800'}
                    `}
                  >
                    {isIncome ? (
                      <ArrowDownCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                          {transaction.merchant}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                          {transaction.description}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div
                          className={`text-lg font-bold ${
                            isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {isIncome ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
                        {transaction.category}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          Transaction ID
                        </div>
                        <div className="text-sm font-mono text-slate-900 dark:text-white">
                          {transaction.id}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Date</div>
                        <div className="text-sm text-slate-900 dark:text-white">
                          {new Date(transaction.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Type</div>
                        <div className="text-sm text-slate-900 dark:text-white capitalize">
                          {transaction.type}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          Amount
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {formatCurrency(transaction.amount)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
