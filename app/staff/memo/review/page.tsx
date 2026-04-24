'use client';
import { useState } from 'react';
import { getAllMemos, updateMemoStatus, type CreditMemo } from '@/lib/memo-data';
import { useAuth } from '@/lib/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/FormElements';
import { Badge } from '@/components/ui/Badge';
import { formatNPR } from '@/lib/data';
import {
  FileText,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  Shield,
  AlertTriangle,
  ChevronDown,
  RotateCcw,
  Printer,
  FileBarChart,
  FileCheck,
  Search,
} from 'lucide-react';
import { Dropdown, DropdownItem, DropdownDivider } from '@/components/ui/Dropdown';
import Link from 'next/link';

const statusConfig: Record<string, { label: string; variant: 'info' | 'warning' | 'success' | 'danger' }> = {
  draft: { label: 'Draft', variant: 'info' },
  pending_review: { label: 'Pending Review', variant: 'warning' },
  under_review: { label: 'Under Review', variant: 'info' },
  approved: { label: 'Approved', variant: 'success' },
  rejected: { label: 'Rejected', variant: 'danger' },
};

export default function MemoReviewPage() {
  const { user } = useAuth();
  const [memos, setMemos] = useState<CreditMemo[]>(getAllMemos());
  const [selectedMemo, setSelectedMemo] = useState<CreditMemo | null>(null);
  const [reviewRemarks, setReviewRemarks] = useState('');

  const handleAction = (memoId: string, action: 'approved' | 'rejected') => {
    updateMemoStatus(
      memoId,
      action,
      user?.name || 'Unknown',
      reviewRemarks || (action === 'approved' ? 'Approved with standard conditions.' : 'Rejected — see remarks.')
    );
    setMemos(getAllMemos());
    setSelectedMemo(null);
    setReviewRemarks('');
  };

  if (selectedMemo) {
    const sc = statusConfig[selectedMemo.status] || statusConfig.draft;
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedMemo(null)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ArrowLeft className="h-4 w-4 text-slate-500" />
          </button>
          <div className="flex-1">
            <h2 className="text-2xl font-display font-bold text-slate-800">{selectedMemo.referenceNo}</h2>
            <p className="text-sm text-slate-500 mt-0.5">Credit Memo Detail</p>
          </div>
          <Badge variant={sc.variant}>{sc.label}</Badge>
        </div>

        {/* Applicant Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Applicant Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Name</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedMemo.applicantName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">CIF</p>
                <p className="text-sm font-mono text-slate-700 mt-0.5">{selectedMemo.applicantCIF}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Branch</p>
                <p className="text-sm text-slate-700 mt-0.5">{selectedMemo.branch}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Facility</p>
                <p className="text-sm text-slate-700 mt-0.5">{selectedMemo.facilityType}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial & Risk Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Proposed Amount</span>
                <span className="font-bold text-slate-800">{formatNPR(selectedMemo.proposedAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Existing Exposure</span>
                <span className="font-semibold text-slate-700">{formatNPR(selectedMemo.existingExposure)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-slate-100 pt-2">
                <span className="text-slate-500 font-medium">Total Exposure</span>
                <span className="font-bold text-accent-700">{formatNPR(selectedMemo.proposedAmount + selectedMemo.existingExposure)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Purpose</span>
                <span className="text-slate-700 text-right max-w-[200px]">{selectedMemo.purpose}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-2xl font-display font-bold text-accent-700">{selectedMemo.riskScore ?? '—'}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Score</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-2xl font-display font-bold text-amber-600">{selectedMemo.riskGrade ?? '—'}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Grade</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-2xl font-display font-bold text-emerald-600">{selectedMemo.collateralCoverage ? `${selectedMemo.collateralCoverage}%` : '—'}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Coverage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Narrative */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Narrative</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedMemo.narrative}</p>
          </CardContent>
        </Card>

        {/* Conditions */}
        {selectedMemo.conditions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {selectedMemo.conditions.map((condition, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <Shield className="h-3.5 w-3.5 text-accent-500 mt-0.5 shrink-0" />
                    {condition}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Review remarks (if already reviewed) */}
        {selectedMemo.reviewRemarks && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Review Remarks</p>
            <p className="text-sm text-slate-700">{selectedMemo.reviewRemarks}</p>
            <p className="text-xs text-slate-400 mt-2">— {selectedMemo.reviewedBy}, {selectedMemo.reviewedAt}</p>
          </div>
        )}

        {/* Action panel (only for reviewable memos) */}
        {(selectedMemo.status === 'pending_review' || selectedMemo.status === 'under_review') && (
          <Card className="border-accent-200">
            <CardHeader>
              <CardTitle>Review Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Review Remarks</label>
                <Textarea
                  value={reviewRemarks}
                  onChange={(e) => setReviewRemarks(e.target.value)}
                  placeholder="Enter your review observations and recommendation..."
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <Dropdown
                  trigger={
                    <Button variant="primary" disabled={!reviewRemarks}>
                      Decision Action
                      <ChevronDown className="h-3.5 w-3.5 ml-2" />
                    </Button>
                  }
                >
                  <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submit Decision</div>
                  <DropdownItem icon={CheckCircle2} onClick={() => handleAction(selectedMemo.id, 'approved')}>
                    Approve Memo
                  </DropdownItem>
                  <DropdownItem icon={RotateCcw}>
                    Return for Correction
                  </DropdownItem>
                  <DropdownItem icon={XCircle} variant="danger" onClick={() => handleAction(selectedMemo.id, 'rejected')}>
                    Reject Memo
                  </DropdownItem>
                  
                  <DropdownDivider />
                  <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Options</div>
                  <DropdownItem icon={Printer}>Print Draft</DropdownItem>
                  <DropdownItem icon={FileBarChart}>View Full Report</DropdownItem>
                </Dropdown>

                <Button variant="secondary" onClick={() => setSelectedMemo(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Memo list view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-800">Credit Memo Review</h2>
          <p className="text-sm text-slate-500 mt-0.5">Review and manage credit memorandums</p>
        </div>
        <Link href="/staff/memo/create">
          <Button>
            <FileText className="h-4 w-4 mr-1.5" />
            New Memo
          </Button>
        </Link>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Pending', value: memos.filter(m => m.status === 'pending_review').length, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { label: 'Under Review', value: memos.filter(m => m.status === 'under_review').length, icon: Eye, color: 'text-blue-600 bg-blue-50' },
          { label: 'Approved', value: memos.filter(m => m.status === 'approved').length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Rejected', value: memos.filter(m => m.status === 'rejected').length, icon: XCircle, color: 'text-red-600 bg-red-50' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-slate-800">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Memo table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 font-medium">Reference</th>
                  <th className="px-5 py-3 font-medium">Applicant</th>
                  <th className="px-5 py-3 font-medium">Branch</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Risk</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">TAT</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memos.map((memo) => {
                  const sc = statusConfig[memo.status] || statusConfig.draft;
                  return (
                    <tr key={memo.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedMemo(memo)}>
                      <td className="px-5 py-3 font-mono text-xs text-accent-600 font-semibold">{memo.referenceNo}</td>
                      <td className="px-5 py-3">
                        <p className="font-medium text-slate-800">{memo.applicantName}</p>
                        <p className="text-xs text-slate-400">{memo.applicantCIF}</p>
                      </td>
                      <td className="px-5 py-3 text-slate-600">{memo.branch}</td>
                      <td className="px-5 py-3 font-semibold text-slate-800">{formatNPR(memo.proposedAmount)}</td>
                      <td className="px-5 py-3">
                        <span className="text-xs font-mono">{memo.riskGrade ?? '—'}</span>
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={sc.variant}>{sc.label}</Badge>
                      </td>
                      <td className="px-5 py-3 text-xs font-mono text-slate-500">{memo.tatDays}d</td>
                      <td className="px-5 py-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedMemo(memo); }}
                          className="text-xs text-accent-600 hover:text-accent-800 font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
