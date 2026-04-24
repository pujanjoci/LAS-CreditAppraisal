'use client';
import { Input } from '@/components/ui/Input';
import type { AppraisalFormData } from '@/lib/data';

interface FinancialStepProps {
  data: AppraisalFormData;
  onChange: (field: string, value: string | number) => void;
}

export const FinancialStep = ({ data, onChange }: FinancialStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 font-display mb-4">
          Financial Details
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Specify the existing exposure and proposed facility terms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Existing Exposure (NPR)
          </label>
          <Input
            type="number"
            value={data.existingExposure || ''}
            onChange={(e) => onChange('existingExposure', Number(e.target.value))}
            placeholder="0"
          />
          <p className="text-xs text-slate-400 mt-1">Total existing credit facilities with the bank</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Proposed Limit (NPR) <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            value={data.proposedLimit || ''}
            onChange={(e) => onChange('proposedLimit', Number(e.target.value))}
            placeholder="0"
          />
          <p className="text-xs text-slate-400 mt-1">Proposed margin lending limit</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Tenure (Months)
          </label>
          <Input
            type="number"
            value={data.tenure}
            onChange={(e) => onChange('tenure', Number(e.target.value))}
            min={1}
            max={12}
          />
          <p className="text-xs text-slate-400 mt-1">Maximum 12 months as per NRB directive</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Interest Rate (% p.a.)
          </label>
          <Input
            type="number"
            value={data.interestRate}
            onChange={(e) => onChange('interestRate', Number(e.target.value))}
            step={0.25}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Processing Fee (%)
          </label>
          <Input
            type="number"
            value={data.processingFee}
            onChange={(e) => onChange('processingFee', Number(e.target.value))}
            step={0.25}
          />
        </div>
      </div>

      {/* Summary box */}
      <div className="mt-6 p-4 bg-accent-50 rounded-lg border border-accent-200">
        <h4 className="text-sm font-semibold text-accent-700 mb-2">Exposure Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Existing</span>
            <p className="font-semibold text-slate-800">NPR {(data.existingExposure || 0).toLocaleString()}</p>
          </div>
          <div>
            <span className="text-slate-500">Proposed</span>
            <p className="font-semibold text-slate-800">NPR {(data.proposedLimit || 0).toLocaleString()}</p>
          </div>
          <div>
            <span className="text-slate-500">Total</span>
            <p className="font-bold text-accent-700">
              NPR {((data.existingExposure || 0) + (data.proposedLimit || 0)).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
