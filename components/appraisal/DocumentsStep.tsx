'use client';
import type { AppraisalFormData } from '@/lib/data';
import { CheckCircle, Circle } from 'lucide-react';

interface DocumentsStepProps {
  data: AppraisalFormData;
  onChange: (field: string, value: { name: string; uploaded: boolean }[]) => void;
}

export const DocumentsStep = ({ data, onChange }: DocumentsStepProps) => {
  const toggleDocument = (index: number) => {
    const updated = [...data.documents];
    updated[index] = { ...updated[index], uploaded: !updated[index].uploaded };
    onChange('documents', updated);
  };

  const completedCount = data.documents.filter((d) => d.uploaded).length;
  const totalCount = data.documents.length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 font-display mb-4">Document Checklist</h3>
        <p className="text-sm text-slate-500 mb-6">Verify that all required documents have been collected.</p>
      </div>
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-slate-500">Progress</span>
          <span className="font-semibold text-slate-700">{completedCount} / {totalCount}</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-accent-600 rounded-full transition-all duration-500" style={{ width: `${(completedCount / totalCount) * 100}%` }} />
        </div>
      </div>
      <div className="space-y-2">
        {data.documents.map((doc, index) => (
          <button key={doc.name} onClick={() => toggleDocument(index)} className="flex items-center gap-3 w-full p-3 rounded-lg border border-slate-200 hover:border-accent-300 transition-all text-left cursor-pointer">
            {doc.uploaded ? <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" /> : <Circle className="h-5 w-5 text-slate-300 shrink-0" />}
            <span className={`text-sm font-medium ${doc.uploaded ? 'text-slate-800' : 'text-slate-500'}`}>{doc.name}</span>
            {doc.uploaded && <span className="ml-auto text-xs text-emerald-600 font-medium">Verified</span>}
          </button>
        ))}
      </div>
    </div>
  );
};
