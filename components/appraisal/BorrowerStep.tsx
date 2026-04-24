'use client';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { AppraisalFormData } from '@/lib/data';

interface BorrowerStepProps {
  data: AppraisalFormData;
  onChange: (field: string, value: string | number) => void;
}

export const BorrowerStep = ({ data, onChange }: BorrowerStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 font-display mb-4">
          Borrower Information
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Enter the borrower&apos;s personal and KYC details as per bank records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            value={data.borrowerName}
            onChange={(e) => onChange('borrowerName', e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            CIF Number <span className="text-red-500">*</span>
          </label>
          <Input
            value={data.borrowerCIF}
            onChange={(e) => onChange('borrowerCIF', e.target.value)}
            placeholder="CIF-XXXXX"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Address
          </label>
          <Input
            value={data.borrowerAddress}
            onChange={(e) => onChange('borrowerAddress', e.target.value)}
            placeholder="Enter address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Phone Number
          </label>
          <Input
            value={data.borrowerPhone}
            onChange={(e) => onChange('borrowerPhone', e.target.value)}
            placeholder="98XXXXXXXX"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Email
          </label>
          <Input
            type="email"
            value={data.borrowerEmail}
            onChange={(e) => onChange('borrowerEmail', e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            PAN Number
          </label>
          <Input
            value={data.borrowerPAN}
            onChange={(e) => onChange('borrowerPAN', e.target.value)}
            placeholder="PAN Number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Date of Birth
          </label>
          <Input
            type="date"
            value={data.borrowerDOB}
            onChange={(e) => onChange('borrowerDOB', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Occupation
          </label>
          <Select
            value={data.borrowerOccupation}
            onChange={(e) => onChange('borrowerOccupation', e.target.value)}
            placeholder="Select occupation"
          >
            <option value="" disabled>Select occupation</option>
            <option value="Business">Business</option>
            <option value="Service">Service</option>
            <option value="Professional">Professional</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Student">Student</option>
            <option value="Retired">Retired</option>
            <option value="Other">Other</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Annual Income (NPR)
          </label>
          <Input
            type="number"
            value={data.borrowerIncome || ''}
            onChange={(e) => onChange('borrowerIncome', Number(e.target.value))}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};
