// Credit Memo data layer

export interface CreditMemo {
  id: string;
  referenceNo: string;
  applicantName: string;
  applicantCIF: string;
  branch: string;
  facilityType: string;
  proposedAmount: number;
  existingExposure: number;
  purpose: string;
  status: 'draft' | 'pending_review' | 'under_review' | 'approved' | 'rejected';
  createdBy: string;
  createdAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewRemarks?: string;
  riskScore?: number;
  riskGrade?: string;
  collateralCoverage?: number;
  narrative: string;
  conditions: string[];
  tatDays: number;
}

let memosStore: CreditMemo[] = [
  {
    id: 'MEMO-001',
    referenceNo: 'LAS-MEM-082/83-001',
    applicantName: 'Hari Bahadur Shrestha',
    applicantCIF: 'CIF-10234',
    branch: 'Head Office',
    facilityType: 'Loan Against Shares',
    proposedAmount: 2500000,
    existingExposure: 1200000,
    purpose: 'Enhancement of existing share-backed facility for portfolio expansion',
    status: 'pending_review',
    createdBy: 'Rajesh Thapa',
    createdAt: '2026-04-20',
    riskScore: 72,
    riskGrade: 'B+',
    collateralCoverage: 142,
    narrative: 'Client has maintained satisfactory account conduct over 3 years. Current LTV is within policy limits. Share portfolio is diversified across banking and hydropower sectors. DSCR adequate at 2.3x. CIB status verified — no defaults recorded. Enhancement request is within branch sanctioning authority.',
    conditions: [
      'Maintain LTV below 65% at all times',
      'Submit quarterly DEMAT statement',
      'Pledge additional shares if LTV exceeds threshold',
      'Annual review and renewal mandatory',
    ],
    tatDays: 4,
  },
  {
    id: 'MEMO-002',
    referenceNo: 'LAS-MEM-082/83-002',
    applicantName: 'Sita Devi Koirala',
    applicantCIF: 'CIF-10567',
    branch: 'Kathmandu',
    facilityType: 'Margin Lending',
    proposedAmount: 1800000,
    existingExposure: 0,
    purpose: 'New margin lending facility for equity investment',
    status: 'approved',
    createdBy: 'Anita Basnet',
    createdAt: '2026-04-15',
    reviewedBy: 'Senior Credit Committee',
    reviewedAt: '2026-04-18',
    reviewRemarks: 'Approved with standard conditions. Collateral adequacy verified.',
    riskScore: 78,
    riskGrade: 'B+',
    collateralCoverage: 165,
    narrative: 'First-time borrower with strong income documentation. Employment verified — senior government officer. Proposed collateral comprises A-class banking stocks with low volatility. Risk assessment satisfactory.',
    conditions: [
      'Maximum 50% of portfolio in single sector',
      'Quarterly portfolio review',
      'Margin call trigger at 70% LTV',
    ],
    tatDays: 3,
  },
  {
    id: 'MEMO-003',
    referenceNo: 'LAS-MEM-082/83-003',
    applicantName: 'Ram Kumar Gurung',
    applicantCIF: 'CIF-10891',
    branch: 'Head Office',
    facilityType: 'Loan Against Shares',
    proposedAmount: 5000000,
    existingExposure: 3000000,
    purpose: 'Enhancement and renewal of existing facility',
    status: 'under_review',
    createdBy: 'Rajesh Thapa',
    createdAt: '2026-04-22',
    riskScore: 65,
    riskGrade: 'B',
    collateralCoverage: 140,
    narrative: 'Existing client seeking enhancement. Account conduct satisfactory. Previous facility utilized at 85%. Current market conditions favorable for share-backed lending. Requires committee-level approval due to aggregate exposure exceeding branch limit.',
    conditions: [
      'Committee-level approval required',
      'Enhanced monitoring for first 90 days',
      'Weekly LTV tracking',
    ],
    tatDays: 2,
  },
  {
    id: 'MEMO-004',
    referenceNo: 'LAS-MEM-082/83-004',
    applicantName: 'Bikash Tamang',
    applicantCIF: 'CIF-11200',
    branch: 'Kathmandu',
    facilityType: 'Margin Lending',
    proposedAmount: 3200000,
    existingExposure: 0,
    purpose: 'New margin lending against diversified NEPSE portfolio',
    status: 'rejected',
    createdBy: 'Anita Basnet',
    createdAt: '2026-04-12',
    reviewedBy: 'Risk Committee',
    reviewedAt: '2026-04-14',
    reviewRemarks: 'LTV exceeds 65% threshold. Proposed collateral includes high-volatility micro-cap stocks exceeding 30% of portfolio. Resubmit with revised collateral composition.',
    riskScore: 48,
    riskGrade: 'C',
    collateralCoverage: 92,
    narrative: 'New client application. Income documentation adequate. However, proposed collateral portfolio has excessive concentration in microfinance and small-cap hydropower stocks. Risk-adjusted coverage below minimum threshold.',
    conditions: [],
    tatDays: 2,
  },
];

export function getAllMemos(): CreditMemo[] {
  return [...memosStore];
}

export function getMemoById(id: string): CreditMemo | undefined {
  return memosStore.find((m) => m.id === id);
}

export function getPendingMemos(): CreditMemo[] {
  return memosStore.filter((m) => m.status === 'pending_review' || m.status === 'under_review');
}

export function addMemo(memo: Omit<CreditMemo, 'id'>): CreditMemo {
  const newMemo: CreditMemo = {
    ...memo,
    id: `MEMO-${String(memosStore.length + 1).padStart(3, '0')}`,
  };
  memosStore = [...memosStore, newMemo];
  return newMemo;
}

export function updateMemoStatus(
  memoId: string,
  status: CreditMemo['status'],
  reviewedBy?: string,
  reviewRemarks?: string
): void {
  const idx = memosStore.findIndex((m) => m.id === memoId);
  if (idx === -1) return;
  memosStore[idx] = {
    ...memosStore[idx],
    status,
    reviewedBy: reviewedBy ?? memosStore[idx].reviewedBy,
    reviewedAt: new Date().toISOString().split('T')[0],
    reviewRemarks: reviewRemarks ?? memosStore[idx].reviewRemarks,
  };
}

export function getMemoMetrics() {
  const total = memosStore.length;
  const pending = memosStore.filter((m) => m.status === 'pending_review').length;
  const underReview = memosStore.filter((m) => m.status === 'under_review').length;
  const approved = memosStore.filter((m) => m.status === 'approved').length;
  const rejected = memosStore.filter((m) => m.status === 'rejected').length;
  const totalExposure = memosStore
    .filter((m) => m.status === 'approved')
    .reduce((sum, m) => sum + m.proposedAmount, 0);

  return { total, pending, underReview, approved, rejected, totalExposure };
}
