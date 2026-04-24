'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { addMemo } from '@/lib/memo-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/FormElements';
import { ArrowLeft, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function CreateMemoPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    applicantName: '',
    applicantCIF: '',
    branch: user?.branch || 'Head Office',
    facilityType: 'Loan Against Shares',
    proposedAmount: '',
    existingExposure: '',
    purpose: '',
    narrative: '',
    conditions: '',
    riskScore: '',
    riskGrade: 'B+',
    collateralCoverage: '',
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.applicantName || !form.applicantCIF || !form.proposedAmount || !form.narrative) return;

    addMemo({
      referenceNo: `LAS-MEM-082/83-${String(Date.now()).slice(-3)}`,
      applicantName: form.applicantName,
      applicantCIF: form.applicantCIF,
      branch: form.branch,
      facilityType: form.facilityType,
      proposedAmount: parseFloat(form.proposedAmount) || 0,
      existingExposure: parseFloat(form.existingExposure) || 0,
      purpose: form.purpose,
      status: 'pending_review',
      createdBy: user?.name || 'Unknown',
      createdAt: new Date().toISOString().split('T')[0],
      riskScore: parseInt(form.riskScore) || undefined,
      riskGrade: form.riskGrade || undefined,
      collateralCoverage: parseFloat(form.collateralCoverage) || undefined,
      narrative: form.narrative,
      conditions: form.conditions.split('\n').filter((c) => c.trim()),
      tatDays: 0,
    });

    setSubmitted(true);
    setTimeout(() => router.push('/staff/memo/review'), 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-xl font-display font-bold text-slate-800">Memo Submitted</h2>
        <p className="text-sm text-slate-500 mt-2">Your credit memo has been submitted for review.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link href="/staff/dashboard" className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <ArrowLeft className="h-4 w-4 text-slate-500" />
        </Link>
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-800">Create Credit Memo</h2>
          <p className="text-sm text-slate-500 mt-0.5">Prepare a credit memorandum for committee review</p>
        </div>
      </div>

      {/* Applicant Details */}
      <Card>
        <CardHeader>
          <CardTitle>Applicant Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Applicant Name *</label>
              <Input value={form.applicantName} onChange={(e) => update('applicantName', e.target.value)} placeholder="Full legal name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">CIF Number *</label>
              <Input value={form.applicantCIF} onChange={(e) => update('applicantCIF', e.target.value)} placeholder="CIF-XXXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Branch</label>
              <Select value={form.branch} onChange={(e) => update('branch', e.target.value)}>
                <option value="Head Office">Head Office</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Pokhara">Pokhara</option>
                <option value="Biratnagar">Biratnagar</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Facility Type</label>
              <Select value={form.facilityType} onChange={(e) => update('facilityType', e.target.value)}>
                <option value="Loan Against Shares">Loan Against Shares</option>
                <option value="Margin Lending">Margin Lending</option>
                <option value="Cash Credit">Cash Credit</option>
                <option value="Term Loan">Term Loan</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Details */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Proposed Amount (NPR) *</label>
              <Input type="number" value={form.proposedAmount} onChange={(e) => update('proposedAmount', e.target.value)} placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Existing Exposure (NPR)</label>
              <Input type="number" value={form.existingExposure} onChange={(e) => update('existingExposure', e.target.value)} placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Purpose</label>
              <Input value={form.purpose} onChange={(e) => update('purpose', e.target.value)} placeholder="Purpose of facility" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Risk Score (0-100)</label>
              <Input type="number" value={form.riskScore} onChange={(e) => update('riskScore', e.target.value)} placeholder="72" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Risk Grade</label>
              <Select value={form.riskGrade} onChange={(e) => update('riskGrade', e.target.value)}>
                <option value="A">A — Low Risk</option>
                <option value="B+">B+ — Moderate Low</option>
                <option value="B">B — Moderate</option>
                <option value="C">C — High Risk</option>
                <option value="D">D — Very High Risk</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Collateral Coverage (%)</label>
              <Input type="number" value={form.collateralCoverage} onChange={(e) => update('collateralCoverage', e.target.value)} placeholder="142" />
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700">Ensure risk assessment is supported by latest CIB verification and DEMAT statement. Collateral coverage must exceed 130% for approval.</p>
          </div>
        </CardContent>
      </Card>

      {/* Narrative */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Narrative *</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={form.narrative}
            onChange={(e) => update('narrative', e.target.value)}
            placeholder="Provide a comprehensive credit assessment narrative covering client background, financial analysis, risk observations, collateral adequacy, and recommendation..."
            rows={6}
          />
        </CardContent>
      </Card>

      {/* Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Proposed Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={form.conditions}
            onChange={(e) => update('conditions', e.target.value)}
            placeholder="Enter each condition on a new line:&#10;Maintain LTV below 65%&#10;Submit quarterly DEMAT statement&#10;Annual review mandatory"
            rows={4}
          />
          <p className="text-xs text-slate-400 mt-2">One condition per line. These will be included in the approval letter.</p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pb-8">
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit for Review</Button>
      </div>
    </div>
  );
}
