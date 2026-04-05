import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { BalanceDataPoint } from '../types';
import { formatCurrency } from '../utils/dataProcessing';

interface FlowCurveProps {
  data: BalanceDataPoint[];
}

export const FlowCurve = ({ data }: FlowCurveProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const maxBalance = Math.max(...data.map((d) => d.balance));
  const minBalance = Math.min(...data.map((d) => d.balance));
  const range = maxBalance - minBalance;

  const getY = (balance: number) => {
    const normalized = (balance - minBalance) / range;
    return 100 - normalized * 80;
  };

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = getY(d.balance);
      return `${x},${y}`;
    })
    .join(' ');

  const pathD = `M 0,100 L ${data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = getY(d.balance);
      return `${x},${y}`;
    })
    .join(' L ')} L 100,100 Z`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Flow Curve</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Balance over time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Balance Trend</span>
        </div>
      </div>

      <div className="relative h-64">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <path d={pathD} fill="url(#gradient)" />

          <polyline
            points={points}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />

          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = getY(d.balance);
            const isHovered = hoveredPoint === i;

            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? '1.5' : d.event ? '1' : '0.5'}
                  fill={d.event ? '#14b8a6' : '#06b6d4'}
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(i)}
                  vectorEffect="non-scaling-stroke"
                />
                {d.event && (
                  <circle
                    cx={x}
                    cy={y}
                    r="2"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="0.3"
                    opacity="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {hoveredPoint !== null && (
          <div
            className="absolute bg-slate-900 dark:bg-slate-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm pointer-events-none border border-slate-700"
            style={{
              left: `${(hoveredPoint / (data.length - 1)) * 100}%`,
              top: `${getY(data[hoveredPoint].balance)}%`,
              transform: 'translate(-50%, -120%)',
            }}
          >
            <div className="font-semibold">{formatCurrency(data[hoveredPoint].balance)}</div>
            <div className="text-xs text-slate-400">{data[hoveredPoint].date}</div>
            {data[hoveredPoint].event && (
              <div className="text-xs text-teal-400 mt-1">
                {data[hoveredPoint].event}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {data[0]?.date} - {data[data.length - 1]?.date}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-slate-500 dark:text-slate-400">Peak: </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {formatCurrency(maxBalance)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
