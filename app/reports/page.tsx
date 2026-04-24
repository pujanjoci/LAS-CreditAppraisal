'use client';
import { useAuth } from '@/lib/auth';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getDashboardMetrics, formatNPR } from '@/lib/data';
import { Download, Filter, FileBarChart } from 'lucide-react';
import { StatusDonut } from '@/components/dashboard/StatusDonut';
import { ApprovalTrend } from '@/components/dashboard/ApprovalTrend';
import { SummaryBranchTable } from '@/components/dashboard/SummaryBranchTable';

export default function ReportsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  const metrics = getDashboardMetrics();

  const donutData = [
    { name: 'Approved', value: metrics.approved, color: '#10b981' },
    { name: 'Processing', value: metrics.pending, color: '#3b82f6' },
    { name: 'Pending', value: 8, color: '#f59e0b' },
    { name: 'Rejected', value: metrics.returned, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-800">Analytics & Reports</h2>
          <p className="text-sm text-slate-500 mt-1">System-wide credit appraisal portfolio metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-3.5 w-3.5 mr-2" />
            Filters
          </Button>
          <Button variant="primary" size="sm">
            <FileBarChart className="h-3.5 w-3.5 mr-2" />
            Generate Full Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total ML Portfolio" value={formatNPR(metrics.totalPortfolio)} trend="up" change="+12.5%" />
        <MetricCard title="Avg Portfolio LTV" value={`${metrics.avgLTV.toFixed(1)}%`} trend="down" change="-2.1%" />
        <MetricCard
          title="Core Capital Used"
          value={isAdmin ? '24.1%' : 'Restricted'}
          className={!isAdmin ? 'opacity-60 bg-slate-50 border-dashed' : ''}
          trend="neutral"
        />
        <MetricCard title="Total Cases" value={metrics.total} trend="up" change="+5 this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle>Approval Trend — FY 2082/83</CardTitle>
              <select className="text-xs border-slate-200 rounded-md bg-white px-2 py-1 outline-none">
                <option>Last 12 Months</option>
                <option>Quarterly</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <ApprovalTrend />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary By Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-6">
            <StatusDonut data={donutData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Summary By Branch</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <SummaryBranchTable />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Regulatory Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="secondary" size="sm" className="w-full justify-start">
                <Download className="h-3.5 w-3.5 mr-2" />
                NRB Regulatory Return
              </Button>
              <Button variant="secondary" size="sm" className="w-full justify-start">
                <Download className="h-3.5 w-3.5 mr-2" />
                Margin Call Register
              </Button>
              {isAdmin && (
                <Button variant="secondary" size="sm" className="w-full justify-start">
                  <Download className="h-3.5 w-3.5 mr-2" />
                  Concentration Report
                </Button>
              )}
              <Button variant="secondary" size="sm" className="w-full justify-start">
                <Download className="h-3.5 w-3.5 mr-2" />
                Portfolio Ageing
              </Button>
            </CardContent>
          </Card>

          <div className="bg-accent-50 border border-accent-100 rounded-xl p-5">
            <h4 className="text-sm font-bold text-accent-800 mb-1">Portfolio Healthy</h4>
            <p className="text-xs text-accent-700 leading-relaxed">
              Overall portfolio LTV is currently at 58.2%, which is 6.8% below the regulatory ceiling of 65%. 
              Concentration in Banking sector remains at 35%, well within the 40% cap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
