import { clsx } from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const MetricCard = ({ title, value, change, trend, className }: MetricCardProps) => {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-slate-400';

  return (
    <div
      className={clsx(
        'rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <p className="text-2xl font-display font-bold text-slate-800 mt-1">{value}</p>
      {change && (
        <div className={clsx('flex items-center gap-1 mt-2 text-xs font-medium', trendColor)}>
          <TrendIcon className="h-3 w-3" />
          <span>{change}</span>
        </div>
      )}
    </div>
  );
};
