'use client';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import type { AppraisalFormData } from '@/lib/data';

interface FacilityStepProps {
  data: AppraisalFormData;
  onChange: (field: string, value: string | number) => void;
}

export const FacilityStep = ({ data, onChange }: FacilityStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 font-display mb-4">
          Facility Details
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Describe the type of facility, purpose, and repayment plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Facility Type
          </label>
          <Select
            value={data.facilityType}
            onChange={(e) => onChange('facilityType', e.target.value)}
          >
            <option value="Loan Against Shares">Loan Against Shares</option>
            <option value="Overdraft Against Shares">Overdraft Against Shares</option>
            <option value="Margin Lending Facility">Margin Lending Facility</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Renewal Date
          </label>
          <Input
            type="date"
            value={data.renewalDate}
            onChange={(e) => onChange('renewalDate', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Purpose of Loan <span className="text-red-500">*</span>
          </label>
          <Textarea
            value={data.purposeOfLoan}
            onChange={(e) => onChange('purposeOfLoan', e.target.value)}
            placeholder="Describe the purpose of the margin lending facility..."
            rows={3}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Repayment Source
          </label>
          <Textarea
            value={data.repaymentSource}
            onChange={(e) => onChange('repaymentSource', e.target.value)}
            placeholder="Describe the primary source of repayment..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};
