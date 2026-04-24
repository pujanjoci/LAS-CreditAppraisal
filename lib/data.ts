// Mock data layer for cases, scripts master, and workflow helpers

export interface ScriptInfo {
  name: string;
  symbol: string;
  type: 'ordinary' | 'promoter' | 'mutual_fund';
  sector: string;
  latestPrice: number;
  avg120: number;
  haircut: number;
}

export interface CollateralRow {
  id: string;
  script: string;
  type: 'ordinary' | 'promoter' | 'mutual_fund';
  qty: number;
  valPrice: number;
  haircut: number;
  mv: number;
  ev: number;
}

export interface AppraisalCase {
  id: string;
  borrowerName: string;
  borrowerCIF: string;
  facilityAmount: number;
  ltv: number;
  status: 'draft' | 'pending_supporter' | 'pending_reviewer' | 'pending_approver' | 'approved' | 'returned' | 'rejected';
  currentStage: string;
  createdAt: string;
  createdBy: string;
  branch: string;
  remarks: string;
  collateralRows: CollateralRow[];
  totalMV: number;
  totalEV: number;
}

export interface AppraisalFormData {
  // Borrower
  borrowerName: string;
  borrowerCIF: string;
  borrowerAddress: string;
  borrowerPhone: string;
  borrowerEmail: string;
  borrowerPAN: string;
  borrowerDOB: string;
  borrowerOccupation: string;
  borrowerIncome: number;
  // Financial
  existingExposure: number;
  proposedLimit: number;
  tenure: number;
  interestRate: number;
  processingFee: number;
  // Facility
  facilityType: string;
  purposeOfLoan: string;
  repaymentSource: string;
  renewalDate: string;
  // Collateral
  collateralRows: CollateralRow[];
  // Documents
  documents: { name: string; uploaded: boolean }[];
  // Remarks
  remarks: string;
}

export const initialFormData: AppraisalFormData = {
  borrowerName: '',
  borrowerCIF: '',
  borrowerAddress: '',
  borrowerPhone: '',
  borrowerEmail: '',
  borrowerPAN: '',
  borrowerDOB: '',
  borrowerOccupation: '',
  borrowerIncome: 0,
  existingExposure: 0,
  proposedLimit: 0,
  tenure: 12,
  interestRate: 12,
  processingFee: 1,
  facilityType: 'Loan Against Shares',
  purposeOfLoan: '',
  repaymentSource: '',
  renewalDate: '',
  collateralRows: [],
  documents: [
    { name: 'Citizenship Copy', uploaded: false },
    { name: 'PAN Certificate', uploaded: false },
    { name: 'Income Proof / Tax Return', uploaded: false },
    { name: 'DEMAT Statement', uploaded: false },
    { name: 'Share Pledge Letter', uploaded: false },
    { name: 'Board Resolution (if company)', uploaded: false },
    { name: 'Loan Application Form', uploaded: false },
  ],
  remarks: '',
};

// Scripts Master – eligible NEPSE-listed securities
export const scriptsMaster: Record<string, ScriptInfo> = {
  NABIL: {
    name: 'Nabil Bank Limited',
    symbol: 'NABIL',
    type: 'ordinary',
    sector: 'Commercial Bank',
    latestPrice: 1050,
    avg120: 1020,
    haircut: 30,
  },
  NICA: {
    name: 'NIC Asia Bank Limited',
    symbol: 'NICA',
    type: 'ordinary',
    sector: 'Commercial Bank',
    latestPrice: 780,
    avg120: 795,
    haircut: 30,
  },
  SBL: {
    name: 'Siddhartha Bank Limited',
    symbol: 'SBL',
    type: 'ordinary',
    sector: 'Commercial Bank',
    latestPrice: 410,
    avg120: 425,
    haircut: 35,
  },
  NLIC: {
    name: 'Nepal Life Insurance',
    symbol: 'NLIC',
    type: 'ordinary',
    sector: 'Life Insurance',
    latestPrice: 1520,
    avg120: 1480,
    haircut: 40,
  },
  CHCL: {
    name: 'Chilime Hydropower',
    symbol: 'CHCL',
    type: 'ordinary',
    sector: 'Hydropower',
    latestPrice: 580,
    avg120: 595,
    haircut: 35,
  },
  NHPC: {
    name: 'National Hydropower',
    symbol: 'NHPC',
    type: 'ordinary',
    sector: 'Hydropower',
    latestPrice: 62,
    avg120: 58,
    haircut: 50,
  },
  UPPER: {
    name: 'Upper Tamakoshi',
    symbol: 'UPPER',
    type: 'ordinary',
    sector: 'Hydropower',
    latestPrice: 365,
    avg120: 350,
    haircut: 35,
  },
  SHIVM: {
    name: 'Shivam Cements',
    symbol: 'SHIVM',
    type: 'ordinary',
    sector: 'Manufacturing',
    latestPrice: 480,
    avg120: 490,
    haircut: 40,
  },
  PLIC: {
    name: 'Prime Life Insurance',
    symbol: 'PLIC',
    type: 'ordinary',
    sector: 'Life Insurance',
    latestPrice: 680,
    avg120: 700,
    haircut: 40,
  },
  NMFBS: {
    name: 'NMB Microfinance',
    symbol: 'NMFBS',
    type: 'ordinary',
    sector: 'Microfinance',
    latestPrice: 2200,
    avg120: 2100,
    haircut: 45,
  },
};

// In-memory case store
let casesStore: AppraisalCase[] = [
  {
    id: 'CASE-001',
    borrowerName: 'Hari Bahadur Shrestha',
    borrowerCIF: 'CIF-10234',
    facilityAmount: 2500000,
    ltv: 58,
    status: 'pending_supporter',
    currentStage: 'supporter',
    createdAt: '2025-04-20',
    createdBy: 'Rajesh Thapa',
    branch: 'Head Office',
    remarks: '',
    collateralRows: [],
    totalMV: 5000000,
    totalEV: 3500000,
  },
  {
    id: 'CASE-002',
    borrowerName: 'Sita Devi Koirala',
    borrowerCIF: 'CIF-10567',
    facilityAmount: 1800000,
    ltv: 62,
    status: 'pending_reviewer',
    currentStage: 'reviewer',
    createdAt: '2025-04-18',
    createdBy: 'Rajesh Thapa',
    branch: 'Kathmandu',
    remarks: '',
    collateralRows: [],
    totalMV: 3200000,
    totalEV: 2100000,
  },
  {
    id: 'CASE-003',
    borrowerName: 'Ram Kumar Gurung',
    borrowerCIF: 'CIF-10891',
    facilityAmount: 5000000,
    ltv: 55,
    status: 'pending_approver',
    currentStage: 'approver',
    createdAt: '2025-04-15',
    createdBy: 'Rajesh Thapa',
    branch: 'Head Office',
    remarks: '',
    collateralRows: [],
    totalMV: 10000000,
    totalEV: 7000000,
  },
  {
    id: 'CASE-004',
    borrowerName: 'Anita Basnet',
    borrowerCIF: 'CIF-11023',
    facilityAmount: 800000,
    ltv: 48,
    status: 'approved',
    currentStage: 'completed',
    createdAt: '2025-04-10',
    createdBy: 'Rajesh Thapa',
    branch: 'Head Office',
    remarks: 'All clear. Approved.',
    collateralRows: [],
    totalMV: 2000000,
    totalEV: 1600000,
  },
  {
    id: 'CASE-005',
    borrowerName: 'Bikash Tamang',
    borrowerCIF: 'CIF-11200',
    facilityAmount: 3200000,
    ltv: 71,
    status: 'returned',
    currentStage: 'initiator',
    createdAt: '2025-04-12',
    createdBy: 'Rajesh Thapa',
    branch: 'Kathmandu',
    remarks: 'LTV exceeds 65% threshold. Reduce facility or add more collateral.',
    collateralRows: [],
    totalMV: 5500000,
    totalEV: 3300000,
  },
];

const roleToStage: Record<string, string> = {
  initiator: 'initiator',
  supporter: 'supporter',
  reviewer: 'reviewer',
  approver: 'approver',
};

const nextStage: Record<string, string> = {
  initiator: 'pending_supporter',
  supporter: 'pending_reviewer',
  reviewer: 'pending_approver',
  approver: 'approved',
};

const previousStage: Record<string, string> = {
  supporter: 'pending_initiator',
  reviewer: 'pending_supporter',
  approver: 'pending_reviewer',
};

export function getAllCases(): AppraisalCase[] {
  return [...casesStore];
}

export function getCaseById(id: string): AppraisalCase | undefined {
  return casesStore.find((c) => c.id === id);
}

export function getPendingCasesForUser(role: string): AppraisalCase[] {
  const stage = roleToStage[role];
  if (!stage) return [];
  return casesStore.filter((c) => c.currentStage === stage && c.status !== 'approved' && c.status !== 'draft');
}

export function approveCase(caseId: string, role: string): void {
  const idx = casesStore.findIndex((c) => c.id === caseId);
  if (idx === -1) return;
  const next = nextStage[role];
  if (!next) return;
  casesStore[idx] = {
    ...casesStore[idx],
    status: next as AppraisalCase['status'],
    currentStage: next === 'approved' ? 'completed' : next.replace('pending_', ''),
  };
}

export function returnCase(caseId: string, role: string, remarks: string): void {
  const idx = casesStore.findIndex((c) => c.id === caseId);
  if (idx === -1) return;
  casesStore[idx] = {
    ...casesStore[idx],
    status: 'returned',
    currentStage: 'initiator',
    remarks,
  };
}

export function addCase(caseData: Omit<AppraisalCase, 'id'>): AppraisalCase {
  const newCase: AppraisalCase = {
    ...caseData,
    id: `CASE-${String(casesStore.length + 1).padStart(3, '0')}`,
  };
  casesStore = [...casesStore, newCase];
  return newCase;
}

export function getDashboardMetrics() {
  const total = casesStore.length;
  const pending = casesStore.filter((c) => c.status.startsWith('pending_')).length;
  const approved = casesStore.filter((c) => c.status === 'approved').length;
  const returned = casesStore.filter((c) => c.status === 'returned').length;
  const totalPortfolio = casesStore
    .filter((c) => c.status === 'approved')
    .reduce((sum, c) => sum + c.facilityAmount, 0);
  const avgLTV =
    casesStore.length > 0
      ? casesStore.reduce((sum, c) => sum + c.ltv, 0) / casesStore.length
      : 0;

  return { total, pending, approved, returned, totalPortfolio, avgLTV };
}

export function formatNPR(amount: number): string {
  if (amount >= 10000000) {
    return `NPR ${(amount / 10000000).toFixed(1)}Cr`;
  }
  if (amount >= 100000) {
    return `NPR ${(amount / 100000).toFixed(1)}L`;
  }
  return `NPR ${amount.toLocaleString()}`;
}
