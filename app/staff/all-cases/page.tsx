'use client';
import { useState, useEffect } from 'react';
import { CaseTable } from '@/components/dashboard/CaseTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { getAllCases, type AppraisalCase } from '@/lib/data';

export default function AllCasesPage() {
  const [cases, setCases] = useState<AppraisalCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCases(getAllCases());
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="h-64 w-full bg-slate-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-800">All Cases</h2>
        <p className="text-sm text-slate-500 mt-1">View all credit appraisal cases across the system.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Case Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <CaseTable cases={cases} />
        </CardContent>
      </Card>
    </div>
  );
}
