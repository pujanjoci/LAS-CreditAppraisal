'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Stage {
  id: string;
  title: string;
  role: string;
}

export default function ApprovalChainPage() {
  const [stages] = useState<Stage[]>([
    { id: '1', title: 'Initiator', role: 'initiator' },
    { id: '2', title: 'Supporter', role: 'supporter' },
    { id: '3', title: 'Reviewer', role: 'reviewer' },
    { id: '4', title: 'Approver', role: 'approver' },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-800 mb-1">Approval Chain Configuration</h2>
        <p className="text-sm text-slate-500">Configure the multi-step approval workflow for margin lending cases.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap pb-6">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center gap-2">
                <div className="bg-accent-100 text-accent-700 rounded-full h-10 w-10 flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{stage.title}</p>
                  <p className="text-xs text-slate-500 capitalize">{stage.role}</p>
                </div>
                {index < stages.length - 1 && (
                  <div className="text-slate-300 mx-2 hidden sm:block">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100">
            <Button variant="secondary" className="mb-4">Add Stage</Button>
            <p className="text-xs text-slate-400">
              Note: Changing the workflow will only affect new appraisal cases. Existing cases will follow the legacy chain.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Save Workflow Settings</Button>
      </div>
    </div>
  );
}
