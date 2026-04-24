'use client';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  branch: string;
  type: string;
  time: string;
}

const activities: ActivityItem[] = [
  { id: 'LAS-MEM-082/83-001', user: 'R. Thapa', action: 'Created memo for approval', branch: 'Head Office', type: 'Credit Memo', time: '2 min ago' },
  { id: 'CASE-003', user: 'S. Gurung', action: 'Submitted for review', branch: 'Head Office', type: 'Loan Against Shares', time: '15 min ago' },
  { id: 'LAS-MEM-082/83-002', user: 'A. Basnet', action: 'Memo approved by committee', branch: 'Kathmandu', type: 'Credit Memo', time: '1 hr ago' },
  { id: 'CASE-001', user: 'H. Shrestha', action: 'Collateral updated', branch: 'Head Office', type: 'Margin Lending', time: '2 hrs ago' },
  { id: 'CASE-005', user: 'B. Tamang', action: 'Returned — LTV exceeds limit', branch: 'Kathmandu', type: 'Loan Against Shares', time: '3 hrs ago' },
];

export const ActivityFeed = () => {
  return (
    <div className="divide-y divide-slate-100">
      {activities.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-3 py-3 px-1 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
            {item.user.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono text-accent-600 font-semibold">{item.id}</p>
            <p className="text-sm text-slate-700 truncate">{item.action}</p>
            <p className="text-xs text-slate-400 mt-0.5">{item.branch} · {item.type}</p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap shrink-0 mt-1">{item.time}</span>
        </div>
      ))}
    </div>
  );
};
