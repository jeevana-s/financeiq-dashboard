import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { FinancialPulse } from './components/FinancialPulse';
import { FlowCurve } from './components/FlowCurve';
import { SpendMap } from './components/SpendMap';
import { SmartSignals } from './components/SmartSignals';
import { ActivityLedger } from './components/ActivityLedger';
import { RecentActivityTimeline } from './components/RecentActivityTimeline';
import { AICopilot } from './components/AICopilot';
import { WealthGoals } from './components/WealthGoals';
import { Toast } from './components/Toast';

import { transactions, balanceHistory, insights } from './data/mockData';
import {
  calculateTotalBalance,
  calculateMonthlyChange,
  getCategorySpending,
  getRecentActivity,
} from './utils/dataProcessing';

function AppContent() {
  const [activeSection, setActiveSection] = useState('pulse');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // ✅ TOAST
  const [showToast, setShowToast] = useState(false);

  // ✅ LOADING (SKELETON)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const totalBalance = calculateTotalBalance(transactions);
  const monthlyChange = calculateMonthlyChange(transactions);
  const categorySpending = getCategorySpending(transactions);
  const recentActivity = getRecentActivity(transactions);

  const mainInsight =
    monthlyChange >= 0
      ? 'You saved more this month than last — great progress'
      : "Your expenses increased this month — let's optimize spending";

  const renderSection = () => {

    /* 🔥 PREMIUM SKELETON (MATCHES YOUR UI) */
    if (loading && activeSection === 'pulse') {
      return (
        <div className="space-y-6">

          {/* HERO + GOALS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 h-44 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse shadow-inner" />

            <div className="h-44 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse shadow-inner" />
          </div>

          {/* BELOW */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Timeline */}
            <div className="space-y-4 p-4 rounded-2xl bg-slate-800/50">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-xl bg-slate-700/60 animate-pulse"
                />
              ))}
            </div>

            {/* Signals */}
            <div className="space-y-4 p-4 rounded-2xl bg-slate-800/50">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl bg-slate-700/60 animate-pulse"
                />
              ))}
            </div>

          </div>
        </div>
      );
    }

    /* 🔥 GENERIC SKELETON FOR OTHER SECTIONS */
    if (loading) {
      return (
        <div className="space-y-6">
          <div className="h-64 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
          <div className="h-40 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
        </div>
      );
    }

    /* 🔥 REAL CONTENT */
    switch (activeSection) {
      case 'pulse':
        return (
          <div className="space-y-6">

            {/* HERO */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FinancialPulse
                  balance={totalBalance}
                  change={monthlyChange}
                  insight={mainInsight}
                />
              </div>

              <WealthGoals />
            </div>

            {/* BELOW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivityTimeline events={recentActivity} />
              <SmartSignals insights={insights.slice(0, 2)} />
            </div>
          </div>
        );

      case 'flow':
        return (
          <div className="space-y-6">
            <FlowCurve data={balanceHistory} />
            <SmartSignals insights={insights.filter((i) => i.type === 'good')} />
          </div>
        );

      case 'spend':
        return (
          <div className="space-y-6">
            <SpendMap data={categorySpending} />
            <SmartSignals insights={insights.filter((i) => i.type === 'warning')} />
          </div>
        );

      case 'signals':
        return <SmartSignals insights={insights} />;

      case 'ledger':
        return (
          <div className="space-y-6">
            <ActivityLedger
              transactions={transactions}
              onAddTransaction={() => {
                setShowToast(true);
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar toggleTheme={toggleTheme} theme={theme} />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            {renderSection()}
          </div>
        </main>

        {/* FOOTER */}
        <footer className="text-center text-sm text-gray-400 dark:text-gray-500 py-4">
          Built by Jeevana • Financial Intelligence Dashboard
        </footer>
      </div>

      {/* AI COPILOT */}
      <AICopilot />

      {/* TOAST */}
      <Toast
        message="Transaction added successfully 🚀"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;