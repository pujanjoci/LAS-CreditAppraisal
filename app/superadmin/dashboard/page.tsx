'use client';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { getDashboardMetrics } from '@/lib/data';
import { MonitorDot, Database, Lock, Settings } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Link from 'next/link';

export default function SuperAdminDashboardPage() {
  const metrics = getDashboardMetrics();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-800">Super Admin Dashboard</h2>
        <p className="text-sm text-slate-500 mt-1">High-level system oversight and control.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="System Health" value="100%" trend="up" />
        <MetricCard title="Database Latency" value="12ms" trend="down" />
        <MetricCard title="Active Integrations" value="4" trend="neutral" />
        <MetricCard title="Total Appraisals" value={metrics.total} trend="up" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/superadmin/system-settings" className="block">
          <Card className="hover:shadow-md transition-all cursor-pointer h-full border-l-4 border-l-violet-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-violet-50 rounded-lg">
                  <MonitorDot className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="font-semibold text-slate-800">System Settings</h3>
              </div>
              <p className="text-sm text-slate-500">Configure global platform variables and features.</p>
            </CardContent>
          </Card>
        </Link>
        <Card className="opacity-60 cursor-not-allowed h-full border-l-4 border-l-slate-400">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-slate-100 rounded-lg">
                <Database className="h-6 w-6 text-slate-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Database Tools</h3>
            </div>
            <p className="text-sm text-slate-500">Backup, restore, and clear cache (Coming soon).</p>
          </CardContent>
        </Card>
        <Card className="opacity-60 cursor-not-allowed h-full border-l-4 border-l-slate-400">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-slate-100 rounded-lg">
                <Lock className="h-6 w-6 text-slate-600" />
              </div>
              <h3 className="font-semibold text-slate-800">API Keys</h3>
            </div>
            <p className="text-sm text-slate-500">Manage API keys and webhooks (Coming soon).</p>
          </CardContent>
        </Card>
        <Link href="/superadmin/users" className="block">
          <Card className="hover:shadow-md transition-all cursor-pointer h-full border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Super User Mgmt</h3>
              </div>
              <p className="text-sm text-slate-500">Add Staff and Admin users.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
