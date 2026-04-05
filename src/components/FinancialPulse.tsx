export const FinancialPulse = ({ balance, change, insight }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl transition-all duration-300 hover:shadow-2xl">

      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl opacity-30"></div>

      {/* Title */}
      <p className="text-sm text-slate-400 mb-2 tracking-wide uppercase">
        Wealth Pulse
      </p>

      {/* Balance */}
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold text-white tracking-tight">
          ${balance.toLocaleString()}
        </h1>

        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
          change >= 0
            ? 'bg-emerald-500/20 text-emerald-400'
            : 'bg-red-500/20 text-red-400'
        }`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      </div>

      {/* Insight */}
      <div className="mt-6 p-4 rounded-lg bg-slate-800/60 border border-slate-700">
        <p className="text-sm text-slate-300">
          <span className="text-teal-400 font-semibold mr-2">AI Insight:</span>
          {insight}
        </p>
      </div>

      {/* Mini bars (visual touch) */}
      <div className="mt-6 flex items-end gap-2 h-10">
        {[20, 30, 25, 40, 35, 50, 45, 60, 55].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-teal-400/70 rounded-sm"
            style={{ height: `${h}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};