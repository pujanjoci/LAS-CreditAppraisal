'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StepIndicator } from '@/components/appraisal/StepIndicator';
import { BorrowerStep } from '@/components/appraisal/BorrowerStep';
import { FinancialStep } from '@/components/appraisal/FinancialStep';
import { FacilityStep } from '@/components/appraisal/FacilityStep';
import { CollateralStep } from '@/components/appraisal/CollateralStep';
import { DocumentsStep } from '@/components/appraisal/DocumentsStep';
import { PreviewStep } from '@/components/appraisal/PreviewStep';
import { initialFormData, addCase, type AppraisalFormData, type CollateralRow } from '@/lib/data';

const STEPS = ['Borrower', 'Financial', 'Facility', 'Collateral', 'Documents', 'Preview & Submit'];

export default function NewAppraisalPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AppraisalFormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const updateField = useCallback((field: string, value: string | number | CollateralRow[] | { name: string; uploaded: boolean }[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleNext = () => setCurrentStep((p) => Math.min(p + 1, STEPS.length - 1));
  const handleBack = () => setCurrentStep((p) => Math.max(p - 1, 0));

  const handleSubmit = () => {
    const totalMV = formData.collateralRows.reduce((s, r) => s + (r.mv || 0), 0);
    const totalEV = formData.collateralRows.reduce((s, r) => s + (r.ev || 0), 0);
    const ltv = totalEV > 0 ? (formData.proposedLimit / totalEV) * 100 : 0;

    addCase({
      borrowerName: formData.borrowerName,
      borrowerCIF: formData.borrowerCIF,
      facilityAmount: formData.proposedLimit,
      ltv: Math.round(ltv),
      status: 'pending_supporter',
      currentStage: 'supporter',
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: user?.name || '',
      branch: user?.branch || '',
      remarks: formData.remarks,
      collateralRows: formData.collateralRows,
      totalMV,
      totalEV,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-xl font-display font-bold text-slate-800 mb-2">Appraisal Submitted!</h2>
        <p className="text-sm text-slate-500 mb-6">The case has been forwarded to the Supporter for review.</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => { setFormData(initialFormData); setCurrentStep(0); setSubmitted(false); }}>Create Another</Button>
          <Button onClick={() => router.push('/staff/dashboard')}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <BorrowerStep data={formData} onChange={updateField} />;
      case 1: return <FinancialStep data={formData} onChange={updateField} />;
      case 2: return <FacilityStep data={formData} onChange={updateField} />;
      case 3: return <CollateralStep data={formData} onChange={updateField} />;
      case 4: return <DocumentsStep data={formData} onChange={updateField} />;
      case 5: return <PreviewStep data={formData} onSubmit={handleSubmit} onChange={updateField} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-800">New Credit Appraisal</h2>
        <p className="text-sm text-slate-500">Loan Against Shares – Margin Lending Facility</p>
      </div>
      <StepIndicator steps={STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />
      <Card><CardContent>{renderStep()}</CardContent></Card>
      <div className="flex justify-between">
        <Button variant="secondary" onClick={handleBack} disabled={currentStep === 0}>Back</Button>
        {currentStep < STEPS.length - 1 && <Button onClick={handleNext}>Next</Button>}
      </div>
    </div>
  );
}
