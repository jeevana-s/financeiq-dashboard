export const WealthGoals = () => {
  const current = 20000;
  const target = 50000;

  const progress = (current / target) * 100;
  const days = Math.ceil((target - current) / 1000);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-white text-lg font-semibold mb-2">
        Wealth Goals
      </h2>

      <p className="text-gray-400 text-sm mb-4">
        Save ₹50,000 goal
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-3 mb-2">
        <div
          className="bg-teal-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-400">
        ₹{current} / ₹{target}
      </p>

      <p className="text-xs text-teal-400 mt-2">
        At this rate, you'll reach your goal in {days} days 🚀
      </p>
    </div>
  );
};