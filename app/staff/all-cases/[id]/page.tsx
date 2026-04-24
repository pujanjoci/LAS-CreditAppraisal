'use client';
import { useState, use } from 'react';
import { getCaseById, formatNPR, type AppraisalCase } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowLeft,
  Printer,
  FileText,
  ShieldCheck,
  History,
  FileUp,
  MessageSquare,
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  Send,
  RotateCcw,
  Ban,
  FileBarChart,
  FileCheck,
  Search,
  UserPlus,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dropdown, DropdownItem, DropdownDivider } from '@/components/ui/Dropdown';

export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const caseData = getCaseById(id);
  const [activeTab, setActiveTab] = useState('details');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(caseData?.status);

  const handleAction = async (newStatus: string) => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStatus(newStatus as any);
    setIsProcessing(false);
  };

  if (!caseData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
        <h2 className="text-xl font-display font-bold text-slate-800">Case Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The appraisal case you are looking for does not exist.</p>
        <Link href="/staff/all-cases" className="mt-6">
          <Button variant="outline">Back to All Cases</Button>
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'files', label: 'File Upload', icon: FileUp },
    { id: 'risk', label: 'Risk Observation', icon: ShieldCheck },
    { id: 'query', label: 'Query / Response', icon: MessageSquare },
    { id: 'audit', label: 'Audit Trail', icon: History },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/staff/dashboard" className="hover:text-accent-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/staff/all-cases" className="hover:text-accent-600 transition-colors">Applications</Link>
          <span>/</span>
          <span className="font-mono text-accent-600">{caseData.id}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-display font-bold text-slate-800">Credit Application</h2>
                <Badge variant={currentStatus === 'approved' ? 'success' : currentStatus === 'rejected' ? 'danger' : 'warning'}>
                  {(currentStatus || '').replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-slate-500 mt-1 font-mono uppercase tracking-tight">
                {caseData.id} | Created on {caseData.createdAt}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-3.5 w-3.5 mr-2" />
              Print
            </Button>
            
            <Dropdown 
              trigger={
                <Button variant="primary" size="sm" disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Actions'}
                  <ChevronDown className="h-3.5 w-3.5 ml-2" />
                </Button>
              }
            >
              <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Workflow</div>
              
              {currentStatus === 'pending_supporter' || currentStatus === 'returned' ? (
                <DropdownItem icon={Send} onClick={() => handleAction('pending_reviewer')}>Submit to Reviewer</DropdownItem>
              ) : null}
              
              {currentStatus === 'pending_reviewer' ? (
                <DropdownItem icon={Send} onClick={() => handleAction('pending_approver')}>Submit to Approver</DropdownItem>
              ) : null}

              {currentStatus === 'pending_approver' ? (
                <DropdownItem icon={CheckCircle2} onClick={() => handleAction('approved')}>Approve Application</DropdownItem>
              ) : null}

              <DropdownItem icon={RotateCcw} onClick={() => handleAction('returned')}>Return to Initiator</DropdownItem>
              <DropdownItem icon={Ban} variant="danger" onClick={() => handleAction('rejected')}>Reject Application</DropdownItem>
              
              <DropdownDivider />
              <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reports</div>
              <DropdownItem icon={FileBarChart}>Generate Appraisal Memo</DropdownItem>
              <DropdownItem icon={FileCheck}>Generate Offer Letter</DropdownItem>
              <DropdownItem icon={Search}>View CIB Report</DropdownItem>
              
              <DropdownDivider />
              <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin</div>
              <DropdownItem icon={UserPlus}>Re-assign Case</DropdownItem>
            </Dropdown>

            <Button variant="outline" size="sm">
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/50 rounded-xl border border-slate-200/60">
        <Button variant="ghost" size="sm" className="text-xs">Existing Appraisal</Button>
        <Button variant="ghost" size="sm" className="text-xs">Credit Details</Button>
        <Button variant="ghost" size="sm" className="text-xs">Manual Doc</Button>
        <Button variant="ghost" size="sm" className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50">Lock Proposal</Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all relative ${
                isActive ? 'text-accent-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                  <CardTitle className="text-slate-700">Applicant Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-accent-600 text-white flex items-center justify-center text-2xl font-bold">
                      {caseData.borrowerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-slate-800 uppercase leading-tight">
                        {caseData.borrowerName}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        CIF No: <span className="font-mono text-accent-700 font-semibold">{caseData.borrowerCIF}</span> · Kathmandu, Nepal
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-slate-100 pt-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Group Associate</p>
                      <p className="text-sm text-slate-700 font-medium">Sister&apos;s Associate</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Sector</p>
                      <p className="text-sm text-slate-700 font-medium">Auto Parts & Mobil Suppliers</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Contact Number</p>
                      <p className="text-sm text-slate-700 font-medium">+977 9819430009</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Branch Name</p>
                      <p className="text-sm text-slate-700 font-medium">{caseData.branch} · 68 Days TAT</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                  <CardTitle className="text-slate-700">Credit Appraisal Detail</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50/30 text-slate-500 text-left border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-3 font-medium">Facility</th>
                        <th className="px-6 py-3 font-medium text-right">Amount (NPR)</th>
                        <th className="px-6 py-3 font-medium text-center">Proposal</th>
                        <th className="px-6 py-3 font-medium">Review Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">Cash Credit (SME)</p>
                          <p className="text-xs text-slate-400 mt-0.5">Unified Directive 2081 compliant</p>
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-slate-800">
                          {formatNPR(caseData.facilityAmount)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase">
                            Enhancement
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">—</td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-slate-50/50">
                      <tr>
                        <td className="px-6 py-3 font-bold text-slate-800">Total Approved Amount</td>
                        <td className="px-6 py-3 text-right font-mono font-black text-accent-700 text-base">
                          {formatNPR(caseData.facilityAmount)}
                        </td>
                        <td colSpan={2}></td>
                      </tr>
                    </tfoot>
                  </table>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                  <CardTitle className="text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Approval Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center py-2">
                    <div className="w-20 h-20 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin-slow flex items-center justify-center mb-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl font-bold">
                        {caseData.status === 'approved' ? '✓' : '...'}
                      </div>
                    </div>
                    <h4 className="text-lg font-display font-bold text-slate-800">
                      {currentStatus === 'approved' ? 'Fully Approved' : currentStatus === 'rejected' ? 'Rejected' : 'In Progress'}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Final sign-off by Head Office</p>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 uppercase tracking-wider font-bold">Branch Officer</span>
                      <span className="text-slate-700 font-medium">Bal Ch. Gurung</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 uppercase tracking-wider font-bold">Credit Analyst</span>
                      <span className="text-slate-700 font-medium">Deepak Sharma</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 uppercase tracking-wider font-bold">Approver</span>
                      <span className="text-slate-700 font-medium">Committee Level</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 uppercase tracking-wider font-bold">CIB Status</span>
                      <span className="text-emerald-600 font-bold">✓ VERIFIED</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                  <CardTitle className="text-slate-700">Risk Profile</CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Credit Score</span>
                    <span className="text-sm font-bold text-accent-700">72 / 100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-500 rounded-full" style={{ width: '72%' }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Current LTV</span>
                    <span className={`text-sm font-bold ${caseData.ltv > 65 ? 'text-red-600' : 'text-emerald-600'}`}>
                      {caseData.ltv}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${caseData.ltv > 65 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${caseData.ltv}%` }} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <Card className="animate-in slide-in-from-bottom-4 duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Documents Repository</CardTitle>
              <Button size="sm">
                <FileUp className="h-3.5 w-3.5 mr-2" /> Upload New
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {[
                  { name: 'Citizenship Copy.pdf', size: '1.2 MB', date: '2025-04-20', type: 'KYC' },
                  { name: 'PAN Certificate.pdf', size: '0.8 MB', date: '2025-04-20', type: 'KYC' },
                  { name: 'DEMAT Statement.pdf', size: '2.4 MB', date: '2025-04-21', type: 'Collateral' },
                  { name: 'Share Pledge Letter.pdf', size: '1.5 MB', date: '2025-04-21', type: 'Legal' },
                ].map((file, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{file.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{file.size} · {file.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400 font-mono">{file.date}</span>
                      <Button variant="ghost" size="sm" className="text-accent-600">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'audit' && (
          <Card className="animate-in fade-in duration-300">
            <CardHeader>
              <CardTitle>System Audit Trail</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative pl-8 space-y-8 border-l-2 border-slate-100 ml-2">
                {[
                  { action: 'Final Approval', user: 'Head Office Admin', time: 'Yesterday, 14:32', icon: CheckCircle2, color: 'bg-emerald-500' },
                  { action: 'Technical Review Completed', user: 'S. Gurung (Reviewer)', time: '2 days ago, 11:20', icon: History, color: 'bg-accent-500' },
                  { action: 'Documents Verified', user: 'R. Thapa (Initiator)', time: '3 days ago, 09:45', icon: ShieldCheck, color: 'bg-slate-400' },
                  { action: 'Case Initiated', user: 'R. Thapa (Initiator)', time: '4 days ago, 10:15', icon: FileText, color: 'bg-slate-400' },
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[41px] top-0 w-6 h-6 rounded-full ${item.color} border-4 border-white shadow-sm flex items-center justify-center`}>
                      <item.icon className="h-2.5 w-2.5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{item.action}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">by {item.user}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {(activeTab === 'risk' || activeTab === 'query') && (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-800">Coming Soon</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-[280px] text-center">This section is being finalized for the production release.</p>
          </div>
        )}
      </div>
    </div>
  );
}
