'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const trendData = [
  { month: 'Shrawan', approved: 2, individual: 1, institutional: 1, total: 4 },
  { month: 'Bhadra', approved: 5, individual: 3, institutional: 2, total: 8 },
  { month: 'Ashoj', approved: 8, individual: 5, institutional: 3, total: 12 },
  { month: 'Kartik', approved: 12, individual: 7, institutional: 5, total: 18 },
  { month: 'Mangsir', approved: 15, individual: 9, institutional: 6, total: 22 },
  { month: 'Poush', approved: 18, individual: 10, institutional: 8, total: 26 },
  { month: 'Magh', approved: 22, individual: 13, institutional: 9, total: 30 },
  { month: 'Falgun', approved: 28, individual: 16, institutional: 12, total: 38 },
  { month: 'Chaitra', approved: 32, individual: 19, institutional: 13, total: 42 },
  { month: 'Baisakh', approved: 18, individual: 11, institutional: 7, total: 25 },
];

export const ApprovalTrend = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '12px',
              padding: '10px 14px',
            }}
            labelStyle={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', color: '#64748b' }}
          />
          <Line
            type="monotone"
            dataKey="approved"
            stroke="#4F46E5"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#4F46E5' }}
            activeDot={{ r: 5, fill: '#4F46E5', stroke: '#fff', strokeWidth: 2 }}
            name="Approved"
          />
          <Line
            type="monotone"
            dataKey="individual"
            stroke="#10b981"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            dot={{ r: 2.5, fill: '#10b981' }}
            name="Individual"
          />
          <Line
            type="monotone"
            dataKey="institutional"
            stroke="#f59e0b"
            strokeWidth={1.5}
            strokeDasharray="3 3"
            dot={{ r: 2.5, fill: '#f59e0b' }}
            name="Institutional"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
