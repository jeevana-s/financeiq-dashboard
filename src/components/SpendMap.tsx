import { useState } from 'react';
import { PieChart, ShoppingBag, Utensils, Plane, CreditCard, Film, Heart, Car } from 'lucide-react';
import { CategorySpending } from '../types';
import { formatCurrency } from '../utils/dataProcessing';

interface SpendMapProps {
  data: CategorySpending[];
}

const categoryIcons: Record<string, any> = {
  Food: Utensils,
  Shopping: ShoppingBag,
  Travel: Plane,
  Bills: CreditCard,
  Entertainment: Film,
  Healthcare: Heart,
  Transport: Car,
};

export const SpendMap = ({ data }: SpendMapProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const total = data.reduce((sum, cat) => sum + cat.amount, 0);

  let currentAngle = -90;
  const segments = data.map((cat) => {
    const angle = (cat.percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    return {
      ...cat,
      path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`,
      startAngle,
      endAngle,
    };
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 flex items-center justify-center">
          <PieChart className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Spend Map</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Category breakdown</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="relative">
          <svg viewBox="0 0 100 100" className="w-full max-w-xs mx-auto">
            <circle cx="50" cy="50" r="40" fill="transparent" />

            {segments.map((segment, i) => (
              <path
                key={segment.category}
                d={segment.path}
                fill={segment.color}
                opacity={
                  hoveredCategory === null || hoveredCategory === segment.category ? 1 : 0.3
                }
                className="transition-all cursor-pointer"
                onMouseEnter={() => setHoveredCategory(segment.category)}
                onMouseLeave={() => setHoveredCategory(null)}
              />
            ))}

            <circle cx="50" cy="50" r="25" className="fill-white dark:fill-slate-900" />

            <text
              x="50"
              y="48"
              textAnchor="middle"
              className="text-[8px] fill-slate-500 dark:fill-slate-400 font-semibold"
            >
              Total Spend
            </text>
            <text
              x="50"
              y="56"
              textAnchor="middle"
              className="text-[10px] fill-slate-900 dark:fill-white font-bold"
            >
              {formatCurrency(total)}
            </text>
          </svg>
        </div>

        <div className="space-y-2">
          {data.map((cat) => {
            const Icon = categoryIcons[cat.category] || ShoppingBag;
            const isHovered = hoveredCategory === cat.category;

            return (
              <div
                key={cat.category}
                className={`
                  flex items-center justify-between p-3 rounded-lg
                  transition-all cursor-pointer
                  ${
                    isHovered
                      ? 'bg-slate-50 dark:bg-slate-800 scale-105'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }
                `}
                onMouseEnter={() => setHoveredCategory(cat.category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${cat.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">
                      {cat.category}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {cat.percentage.toFixed(1)}% of total
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {formatCurrency(cat.amount)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
