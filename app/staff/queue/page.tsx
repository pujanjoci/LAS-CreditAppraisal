'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { CaseCard } from '@/components/dashboard/CaseCard';
import { getPendingCasesForUser, approveCase, returnCase, type AppraisalCase } from '@/lib/data';
import { Inbox } from 'lucide-react';

export default function QueuePage() {
  const { user, loading: authLoading } = useAuth();
  const [cases, setCases] = useState<AppraisalCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user) {
      const pending = getPendingCasesForUser(user.role);
      setCases(pending);
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleApprove = (caseId: string) => {
    if (user) {
      approveCase(caseId, user.role);
      setCases((prev) => prev.filter((c) => c.id !== caseId));
    }
  };

  const handleReturn = (caseId: string, remarks: string) => {
    if (user) {
      returnCase(caseId, user.role, remarks);
      setCases((prev) => prev.filter((c) => c.id !== caseId));
    }
  };

  if (loading || authLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="h-32 w-full bg-slate-200 rounded-xl animate-pulse" />
        <div className="h-32 w-full bg-slate-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-slate-800">My Queue</h2>
        <p className="text-sm text-slate-500 mt-1">Cases pending your action as a {user?.role}.</p>
      </div>

      {cases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white border border-slate-200 rounded-xl border-dashed">
          <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
            <Inbox className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-slate-600 font-medium">Your queue is empty</p>
          <p className="text-sm text-slate-400 mt-1">No cases are currently awaiting your action.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cases.map((c) => (
            <CaseCard
              key={c.id}
              caseData={c}
              onApprove={handleApprove}
              onReturn={handleReturn}
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
