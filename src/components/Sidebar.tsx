import { Activity, TrendingUp, Receipt, Zap, BarChart3 } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'pulse', label: 'Cash Pulse', icon: Activity },
  { id: 'flow', label: 'Flow Curve', icon: TrendingUp },
  { id: 'spend', label: 'Spend Map', icon: BarChart3 },
  { id: 'signals', label: 'Smart Signals', icon: Zap },
  { id: 'ledger', label: 'Activity Ledger', icon: Receipt },
];

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-colors">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              FinanceIQ
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Financial Intelligence
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }
                `}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-4 text-white">
          <div className="text-xs font-semibold mb-1 opacity-90">PRO TIP</div>
          <p className="text-sm leading-relaxed">
            Track your spending patterns to save more effectively
          </p>
        </div>
      </div>
    </aside>
  );
};
