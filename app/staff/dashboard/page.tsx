'use client';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { StatusDonut } from '@/components/dashboard/StatusDonut';
import { ApprovalTrend } from '@/components/dashboard/ApprovalTrend';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { CaseTable } from '@/components/dashboard/CaseTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/lib/auth';
import { getAllCases, getDashboardMetrics, formatNPR } from '@/lib/data';
import { getMemoMetrics } from '@/lib/memo-data';
import { FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StaffDashboardPage() {
  const { user } = useAuth();
  const metrics = getDashboardMetrics();
  const memoMetrics = getMemoMetrics();
  const recentCases = getAllCases().slice(0, 5);

  const donutData = [
    { name: 'Approved', value: metrics.approved, color: '#10b981' },
    { name: 'Pending', value: metrics.pending, color: '#f59e0b' },
    { name: 'Returned', value: metrics.returned, color: '#ef4444' },
    { name: 'Draft', value: Math.max(0, metrics.total - metrics.approved - metrics.pending - metrics.returned), color: '#94a3b8' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-800">Dashboard</h2>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, {user?.name}. FY 2082/83 Overview.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/staff/memo/create"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-600 text-white text-sm font-medium hover:bg-accent-700 transition-colors"
          >
            <FileText className="h-3.5 w-3.5" /> New Memo
          </Link>
          <Link
            href="/staff/new-appraisal"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            + New Appraisal
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard title="Total Cases" value={metrics.total} trend="up" change="+3 this month" />
        <MetricCard title="Pending" value={metrics.pending} trend="neutral" change="In pipeline" />
        <MetricCard title="Approved" value={metrics.approved} trend="up" change="This quarter" />
        <MetricCard title="Avg LTV" value={`${metrics.avgLTV.toFixed(1)}%`} trend={metrics.avgLTV > 60 ? 'down' : 'up'} change={metrics.avgLTV > 60 ? 'Above target' : 'Within limit'} />
        <MetricCard title="Pending Memos" value={memoMetrics.pending + memoMetrics.underReview} trend="neutral" change="Review queue" />
        <MetricCard title="Portfolio" value={formatNPR(metrics.totalPortfolio)} trend="up" change="Approved total" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle>Approval Trend — FY 2082/83</CardTitle>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-600 inline-block" /> Approved</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Individual</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Institutional</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ApprovalTrend />
            </CardContent>
          </Card>
        </div>

        {/* Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-4">
            <StatusDonut data={donutData} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle>Recent Cases</CardTitle>
                <Link href="/staff/all-cases" className="flex items-center gap-1 text-xs text-accent-600 hover:text-accent-800 font-medium">
                  View All <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <CaseTable cases={recentCases} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle>Recent Activity</CardTitle>
              <span className="text-[10px] text-slate-400 font-mono">LIVE</span>
            </div>
          </CardHeader>
          <CardContent>
            <ActivityFeed />
          </CardContent>
        </Card>
      </div>

      {/* Memo Quick Access */}
      <Card className="border-accent-100 bg-accent-50/30">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-accent-100 rounded-lg">
                <FileText className="h-5 w-5 text-accent-700" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Credit Memo Workflow</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {memoMetrics.pending} memo{memoMetrics.pending !== 1 ? 's' : ''} pending review · {memoMetrics.approved} approved this period
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/staff/memo/create" className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Create Memo
              </Link>
              <Link href="/staff/memo/review" className="px-3 py-1.5 rounded-lg bg-accent-600 text-xs font-medium text-white hover:bg-accent-700 transition-colors">
                Review Queue
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
