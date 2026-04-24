'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-800">System Settings</h2>
        <p className="text-sm text-slate-500 mt-1">Global platform configuration available only to superadmins.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-w-2xl">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="text-sm font-semibold text-slate-700">Maintenance Mode</h4>
              <p className="text-sm text-slate-500 mt-1 mb-3">Enable to restrict access to all users except superadmins.</p>
              <Button variant="secondary" size="sm">Enable Maintenance Mode</Button>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="text-sm font-semibold text-slate-700">Debug Logging</h4>
              <p className="text-sm text-slate-500 mt-1 mb-3">Toggle verbose debug logging for API routes.</p>
              <Button variant="secondary" size="sm">Enable Debug Logging</Button>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="text-sm font-semibold text-red-700">Purge Data</h4>
              <p className="text-sm text-red-500 mt-1 mb-3">Warning: This will permanently delete all mock appraisal cases and reset metrics.</p>
              <Button variant="secondary" size="sm" className="bg-red-600 text-white hover:bg-red-700 hover:text-white border-0">Purge All Appraisals</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
