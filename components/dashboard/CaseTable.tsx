'use client';
import { Badge } from '@/components/ui/Badge';
import { formatNPR, type AppraisalCase } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface CaseTableProps {
  cases: AppraisalCase[];
  onRowClick?: (caseId: string) => void;
}

const statusBadge: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
  draft: { label: 'Draft', variant: 'default' },
  pending_supporter: { label: 'Pending Supporter', variant: 'warning' },
  pending_reviewer: { label: 'Pending Reviewer', variant: 'warning' },
  pending_approver: { label: 'Pending Approver', variant: 'info' },
  approved: { label: 'Approved', variant: 'success' },
  returned: { label: 'Returned', variant: 'danger' },
};

export const CaseTable = ({ cases, onRowClick }: CaseTableProps) => {
  const router = useRouter();

  const handleRowClick = (caseId: string) => {
    if (onRowClick) {
      onRowClick(caseId);
    } else {
      router.push(`/staff/all-cases/${caseId}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b border-slate-200">
            <th className="pb-3 font-medium">Case ID</th>
            <th className="pb-3 font-medium">Borrower</th>
            <th className="pb-3 font-medium">Branch</th>
            <th className="pb-3 font-medium">Facility</th>
            <th className="pb-3 font-medium">LTV</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => {
            const badge = statusBadge[c.status] || statusBadge.draft;
            return (
              <tr
                key={c.id}
                className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => handleRowClick(c.id)}
              >
                <td className="py-3 font-mono text-xs text-slate-500">{c.id}</td>
                <td className="py-3 font-medium text-slate-800">{c.borrowerName}</td>
                <td className="py-3 text-slate-600">{c.branch}</td>
                <td className="py-3 font-semibold text-slate-800">{formatNPR(c.facilityAmount)}</td>
                <td className="py-3">
                  <span className={c.ltv > 65 ? 'text-red-600 font-semibold' : 'text-emerald-600 font-semibold'}>
                    {c.ltv}%
                  </span>
                </td>
                <td className="py-3">
                  <Badge variant={badge.variant}>{badge.label}</Badge>
                </td>
                <td className="py-3 text-slate-500">{c.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {cases.length === 0 && (
        <div className="py-12 text-center text-slate-400">
          <p className="text-sm">No cases found.</p>
        </div>
      )}
    </div>
  );
};
