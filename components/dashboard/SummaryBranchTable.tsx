'use client';

const branchData = [
  { name: 'KOLHUWA BRANCH', files: 341, amount: 4, approved: 18 },
  { name: 'GHORAHI BRANCH', files: 3131, amount: 4, approved: 12 },
  { name: 'BENI BRANCH', files: 255, amount: 0, approved: 3 },
  { name: 'GARUDA BRANCH', files: 489, amount: 0, approved: 5 },
  { name: 'BODEBARSHAIN BRANCH', files: 395, amount: 0, approved: 2 },
];

export const SummaryBranchTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 font-medium">Branch Name</th>
            <th className="px-4 py-3 font-medium text-right">Files</th>
            <th className="px-4 py-3 font-medium text-right">Amount (M)</th>
            <th className="px-4 py-3 font-medium text-right">Approved</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {branchData.map((branch, index) => (
            <tr key={branch.name} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                    index === 0 ? 'bg-amber-100 text-amber-600' : 
                    index === 1 ? 'bg-slate-200 text-slate-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="font-medium text-slate-700">{branch.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-right text-slate-600 font-mono">{branch.files.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-slate-600 font-mono">{branch.amount}</td>
              <td className="px-4 py-3 text-right">
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                  {branch.approved}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
