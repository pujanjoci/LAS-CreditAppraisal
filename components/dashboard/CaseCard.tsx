'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { formatNPR, type AppraisalCase } from '@/lib/data';
import { ChevronDown, ChevronUp, CheckCircle, RotateCcw } from 'lucide-react';

interface CaseCardProps {
  caseData: AppraisalCase;
  onApprove?: (caseId: string) => void;
  onReturn?: (caseId: string, remarks: string) => void;
  showActions?: boolean;
}

const statusBadge: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
  draft: { label: 'Draft', variant: 'default' },
  pending_supporter: { label: 'Pending Supporter', variant: 'warning' },
  pending_reviewer: { label: 'Pending Reviewer', variant: 'warning' },
  pending_approver: { label: 'Pending Approver', variant: 'info' },
  approved: { label: 'Approved', variant: 'success' },
  returned: { label: 'Returned', variant: 'danger' },
};

export const CaseCard = ({ caseData, onApprove, onReturn, showActions = true }: CaseCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [returnRemarks, setReturnRemarks] = useState('');
  const [showReturnForm, setShowReturnForm] = useState(false);

  const badge = statusBadge[caseData.status] || statusBadge.draft;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-mono text-slate-400">{caseData.id}</span>
              <Badge variant={badge.variant}>{badge.label}</Badge>
            </div>
            <h4 className="text-base font-semibold text-slate-800">{caseData.borrowerName}</h4>
            <p className="text-sm text-slate-500 mt-0.5">
              CIF: {caseData.borrowerCIF} · {caseData.branch} · Created: {caseData.createdAt}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-display font-bold text-slate-800">
              {formatNPR(caseData.facilityAmount)}
            </p>
            <p className="text-xs text-slate-500">
              LTV: <span className={caseData.ltv > 65 ? 'text-red-600 font-semibold' : 'text-emerald-600 font-semibold'}>{caseData.ltv}%</span>
            </p>
          </div>
        </div>

        {caseData.remarks && (
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
            <strong>Remarks:</strong> {caseData.remarks}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-accent-600 hover:text-accent-700 font-medium cursor-pointer"
          >
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {expanded ? 'Hide Details' : 'View Details'}
          </button>

          {showActions && onApprove && onReturn && caseData.status.startsWith('pending_') && (
            <div className="flex gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowReturnForm(!showReturnForm)}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Return
              </Button>
              <Button
                variant="success"
                size="sm"
                onClick={() => onApprove(caseData.id)}
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Approve
              </Button>
            </div>
          )}
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400">Market Value</span>
              <p className="font-semibold text-slate-700">{formatNPR(caseData.totalMV)}</p>
            </div>
            <div>
              <span className="text-slate-400">Eligible Value</span>
              <p className="font-semibold text-slate-700">{formatNPR(caseData.totalEV)}</p>
            </div>
            <div>
              <span className="text-slate-400">Created By</span>
              <p className="font-semibold text-slate-700">{caseData.createdBy}</p>
            </div>
            <div>
              <span className="text-slate-400">Current Stage</span>
              <p className="font-semibold text-slate-700 capitalize">{caseData.currentStage}</p>
            </div>
          </div>
        )}

        {showReturnForm && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
            <Textarea
              placeholder="Enter return remarks..."
              value={returnRemarks}
              onChange={(e) => setReturnRemarks(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowReturnForm(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  if (onReturn) onReturn(caseData.id, returnRemarks);
                  setShowReturnForm(false);
                  setReturnRemarks('');
                }}
              >
                Confirm Return
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
