import { Clock, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { formatCurrency } from '../utils/dataProcessing';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'income' | 'expense';
  amount: number;
}

interface RecentActivityTimelineProps {
  events: TimelineEvent[];
}

export const RecentActivityTimeline = ({ events }: RecentActivityTimelineProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 flex items-center justify-center">
          <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Recent Activity
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Latest events</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />

        <div className="space-y-6">
          {events.map((event, index) => {
            const isIncome = event.type === 'income';

            return (
              <div key={event.id} className="relative pl-14">
                <div
                  className={`
                    absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center
                    ${
                      isIncome
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 border-2 border-emerald-500'
                        : 'bg-red-50 dark:bg-red-500/10 border-2 border-red-500'
                    }
                  `}
                >
                  {isIncome ? (
                    <ArrowDownCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ArrowUpCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  )}
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                        {event.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {event.description}
                      </p>
                    </div>
                    <div
                      className={`text-lg font-bold whitespace-nowrap ${
                        isIncome
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {isIncome ? '+' : '-'}
                      {formatCurrency(event.amount)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(event.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button className="w-full py-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 rounded-lg transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};
