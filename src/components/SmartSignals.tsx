import { Zap, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Insight } from '../types';

interface SmartSignalsProps {
  insights: Insight[];
}

export const SmartSignals = ({ insights }: SmartSignalsProps) => {

  // 🔥 CUSTOM INSIGHT (ALWAYS INCLUDED)
  const customInsight: Insight = {
    id: "weekend-spending",
    type: "warning",
    title: "Weekend Spending Pattern",
    description: "You spend 2.3x more on weekends than weekdays — consider balancing discretionary expenses.",
    metric: "2.3x",
    trend: [30, 45, 60, 80, 70, 90, 85]
  };

  // 👉 Combine existing + custom
  const allInsights = [customInsight, ...insights];

  const getIcon = (type: string) => {
    switch (type) {
      case 'good':
        return CheckCircle;
      case 'warning':
        return AlertCircle;
      case 'attention':
        return TrendingUp;
      default:
        return Zap;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'good':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-500/10',
          border: 'border-emerald-200 dark:border-emerald-500/20',
          icon: 'text-emerald-600 dark:text-emerald-400',
          accent: 'bg-emerald-100 dark:bg-emerald-500/20',
          metric: 'text-emerald-600 dark:text-emerald-400',
        };
      case 'warning':
        return {
          bg: 'bg-orange-50 dark:bg-orange-500/10',
          border: 'border-orange-200 dark:border-orange-500/20',
          icon: 'text-orange-600 dark:text-orange-400',
          accent: 'bg-orange-100 dark:bg-orange-500/20',
          metric: 'text-orange-600 dark:text-orange-400',
        };
      case 'attention':
        return {
          bg: 'bg-blue-50 dark:bg-blue-500/10',
          border: 'border-blue-200 dark:border-blue-500/20',
          icon: 'text-blue-600 dark:text-blue-400',
          accent: 'bg-blue-100 dark:bg-blue-500/20',
          metric: 'text-blue-600 dark:text-blue-400',
        };
      default:
        return {
          bg: 'bg-slate-50 dark:bg-slate-800',
          border: 'border-slate-200 dark:border-slate-700',
          icon: 'text-slate-600 dark:text-slate-400',
          accent: 'bg-slate-100 dark:bg-slate-700',
          metric: 'text-slate-900 dark:text-white',
        };
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 transition-colors">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 flex items-center justify-center">
          <Zap className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Smart Signals
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            AI-powered financial insights
          </p>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-4">
        {allInsights.map((insight) => {
          const Icon = getIcon(insight.type);
          const styles = getStyles(insight.type);

          return (
            <div
              key={insight.id}
              className={`
                relative overflow-hidden rounded-xl p-5 border transition-all
                hover:shadow-lg hover:scale-[1.02]
                ${styles.bg} ${styles.border}
              `}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg ${styles.accent} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${styles.icon}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {insight.title}
                    </h4>

                    {insight.metric && (
                      <div className={`px-3 py-1 rounded-full ${styles.accent} font-bold text-sm ${styles.metric}`}>
                        {insight.metric}
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {insight.description}
                  </p>

                  {insight.trend && (
                    <div className="flex items-end gap-1 h-12">
                      {insight.trend.map((value, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm ${styles.accent}`}
                          style={{ height: `${value}%` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span>Insights updated in real-time</span>
          </div>
          <button className="text-teal-600 dark:text-teal-400 font-medium hover:underline">
            View All Insights
          </button>
        </div>
      </div>
    </div>
  );
};