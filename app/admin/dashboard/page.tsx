'use client';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { getDashboardMetrics } from '@/lib/data';
import { ShieldAlert, Users, Settings, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ApprovalTrend } from '@/components/dashboard/ApprovalTrend';
import { StatusDonut } from '@/components/dashboard/StatusDonut';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const metrics = getDashboardMetrics();

  const systemStatusData = [
    { name: 'Up', value: 98, color: '#10b981' },
    { name: 'Down', value: 2, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-800">Admin Dashboard</h2>
          <p className="text-sm text-slate-500 mt-1">System configuration and monitoring.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          SYSTEM OPERATIONAL
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="System Alerts" value="0" trend="neutral" change="No critical issues" />
        <MetricCard title="Active Users" value="5" trend="up" change="+1 this week" />
        <MetricCard title="Total Appraisals" value={metrics.total} trend="up" change="Live cases" />
        <MetricCard title="Avg TAT" value="1.2d" trend="down" change="Processing speed" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Throughput — FY 2082/83</CardTitle>
          </CardHeader>
          <CardContent>
            <ApprovalTrend />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-6">
            <StatusDonut data={systemStatusData} title="Uptime %" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/policy" className="block">
          <Card className="hover:shadow-md transition-all cursor-pointer h-full border-l-4 border-l-accent-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-accent-50 rounded-lg">
                  <ShieldAlert className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Policy Limits</h3>
              </div>
              <p className="text-sm text-slate-500">Configure global LTV limits, exposure caps, and risk parameters.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/users" className="block">
          <Card className="hover:shadow-md transition-all cursor-pointer h-full border-l-4 border-l-emerald-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-800">User Management</h3>
              </div>
              <p className="text-sm text-slate-500">Manage staff access, assign roles, and configure branches.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/approval-chain" className="block">
          <Card className="hover:shadow-md transition-all cursor-pointer h-full border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-amber-50 rounded-lg">
                  <Settings className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Approval Workflow</h3>
              </div>
              <p className="text-sm text-slate-500">Design approval hierarchies and assign responsibilities.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
