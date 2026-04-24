'use client';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { formatNPR, type AppraisalFormData, type CollateralRow } from '@/lib/data';
import { FileText, Send } from 'lucide-react';

interface PreviewStepProps {
  data: AppraisalFormData;
  onSubmit: () => void;
  onChange: (field: string, value: string) => void;
}

export const PreviewStep = ({ data, onSubmit, onChange }: PreviewStepProps) => {
  const totalMV = data.collateralRows.reduce((s: number, r: CollateralRow) => s + (r.mv || 0), 0);
  const totalEV = data.collateralRows.reduce((s: number, r: CollateralRow) => s + (r.ev || 0), 0);
  const ltv = totalEV > 0 ? ((data.proposedLimit / totalEV) * 100) : 0;
  const docsComplete = data.documents.filter((d) => d.uploaded).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="h-5 w-5 text-accent-600" />
        <h3 className="text-lg font-semibold text-slate-800 font-display">
          Proposal Preview &amp; Submit
        </h3>
      </div>

      {/* Borrower */}
      <Section title="Borrower">
        <Grid>
          <Field label="Name" value={data.borrowerName || '—'} />
          <Field label="CIF" value={data.borrowerCIF || '—'} />
          <Field label="Address" value={data.borrowerAddress || '—'} />
          <Field label="Phone" value={data.borrowerPhone || '—'} />
          <Field label="Occupation" value={data.borrowerOccupation || '—'} />
          <Field label="Income" value={data.borrowerIncome ? `NPR ${data.borrowerIncome.toLocaleString()}` : '—'} />
        </Grid>
      </Section>

      {/* Financial */}
      <Section title="Financial">
        <Grid>
          <Field label="Existing Exposure" value={formatNPR(data.existingExposure || 0)} />
          <Field label="Proposed Limit" value={formatNPR(data.proposedLimit || 0)} />
          <Field label="Tenure" value={`${data.tenure} months`} />
          <Field label="Interest Rate" value={`${data.interestRate}% p.a.`} />
        </Grid>
      </Section>

      {/* Facility */}
      <Section title="Facility">
        <Grid>
          <Field label="Type" value={data.facilityType} />
          <Field label="Purpose" value={data.purposeOfLoan || '—'} />
          <Field label="Repayment Source" value={data.repaymentSource || '—'} />
        </Grid>
      </Section>

      {/* Collateral Summary */}
      <Section title="Collateral Summary">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-3 bg-slate-50 rounded-lg text-center">
            <p className="text-xs text-slate-500">Market Value</p>
            <p className="text-base font-bold text-slate-800">{formatNPR(totalMV)}</p>
          </div>
          <div className="p-3 bg-accent-50 rounded-lg text-center">
            <p className="text-xs text-slate-500">Eligible Value</p>
            <p className="text-base font-bold text-accent-700">{formatNPR(totalEV)}</p>
          </div>
          <div className={`p-3 rounded-lg text-center ${ltv > 65 ? 'bg-red-50' : 'bg-emerald-50'}`}>
            <p className="text-xs text-slate-500">LTV</p>
            <p className={`text-base font-bold ${ltv > 65 ? 'text-red-600' : 'text-emerald-600'}`}>
              {ltv.toFixed(1)}%
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500">{data.collateralRows.length} securities pledged</p>
      </Section>

      {/* Documents */}
      <Section title="Documents">
        <div className="flex items-center gap-2">
          <Badge variant={docsComplete === data.documents.length ? 'success' : 'warning'}>
            {docsComplete} / {data.documents.length} complete
          </Badge>
        </div>
      </Section>

      {/* Remarks */}
      <Section title="Initiator Remarks">
        <Textarea
          value={data.remarks}
          onChange={(e) => onChange('remarks', e.target.value)}
          placeholder="Add any observations or recommendations..."
          rows={3}
        />
      </Section>

      {/* Submit */}
      <div className="pt-4 border-t border-slate-200 flex justify-end">
        <Button size="lg" onClick={onSubmit}>
          <Send className="h-4 w-4 mr-2" />
          Submit for Approval
        </Button>
      </div>
    </div>
  );
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 border border-slate-200 rounded-lg">
      <h4 className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">{title}</h4>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs text-slate-400">{label}</span>
      <p className="text-sm font-medium text-slate-700">{value}</p>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{children}</div>;
}
