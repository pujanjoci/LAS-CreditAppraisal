'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { scriptsMaster } from '@/lib/data';
import { Search } from 'lucide-react';

export default function EligibleScriptsPage() {
  const scripts = Object.values(scriptsMaster);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-800">Eligible Scripts</h2>
          <p className="text-sm text-slate-500 mt-1">Manage approved securities for collateral.</p>
        </div>
        <Button>+ Add New Script</Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Script Master</CardTitle>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input className="pl-9" placeholder="Search symbol..." />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Symbol</th>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Sector</th>
                  <th className="px-6 py-3 font-medium text-right">LTP</th>
                  <th className="px-6 py-3 font-medium text-right">120-Day Avg</th>
                  <th className="px-6 py-3 font-medium text-right">Haircut</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scripts.map((script) => (
                  <tr key={script.symbol} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-semibold text-slate-800">{script.symbol}</td>
                    <td className="px-6 py-3">{script.name}</td>
                    <td className="px-6 py-3 text-slate-500">{script.sector}</td>
                    <td className="px-6 py-3 text-right">{script.latestPrice.toLocaleString()}</td>
                    <td className="px-6 py-3 text-right">{script.avg120.toLocaleString()}</td>
                    <td className="px-6 py-3 text-right font-medium">{script.haircut}%</td>
                    <td className="px-6 py-3 capitalize">{script.type.replace('_', ' ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
