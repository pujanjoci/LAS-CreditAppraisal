'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function PolicyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-800">Policy Settings</h2>
        <p className="text-sm text-slate-500 mt-1">Configure global lending policies as per NRB directives.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Margin Lending Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Max LTV (%)</label>
              <Input type="number" defaultValue={65} />
              <p className="text-xs text-slate-400 mt-1">Maximum Loan-to-Value ratio for ordinary shares</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Promoter Share Max LTV (%)</label>
              <Input type="number" defaultValue={50} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Single Borrower Limit (Core Capital %)</label>
              <Input type="number" defaultValue={10} step={0.1} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Total Margin Lending Cap (Core Capital %)</label>
              <Input type="number" defaultValue={25} />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Button>Save Policy Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
