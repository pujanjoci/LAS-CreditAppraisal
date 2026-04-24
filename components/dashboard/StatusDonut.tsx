'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface StatusDonutProps {
  data: { name: string; value: number; color: string }[];
  title?: string;
}

export const StatusDonut = ({ data, title }: StatusDonutProps) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col items-center">
      {title && (
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">{title}</h4>
      )}
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={56}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '12px',
                padding: '8px 12px',
              }}
              formatter={(value: any, name: any) => [`${value} cases`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-display font-bold text-slate-800">{total}</span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Total</span>
        </div>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: entry.color }} />
            <span className="text-xs text-slate-500">{entry.name}</span>
            <span className="text-xs font-semibold text-slate-700">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
