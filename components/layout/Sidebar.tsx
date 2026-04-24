'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  PlusCircle,
  Clock,
  List,
  BarChart3,
  Users,
  GitBranch,
  FileCheck,
  Shield,
  MonitorDot,
  FileText,
  FilePenLine,
} from 'lucide-react';

interface SidebarProps {
  role: 'staff' | 'admin' | 'super_admin' | 'super_staff';
}

interface NavSection {
  label: string;
  items: { href: string; label: string; icon: typeof LayoutDashboard }[];
}

const staffSections: NavSection[] = [
  {
    label: 'Appraisal',
    items: [
      { href: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/staff/new-appraisal', label: 'New Appraisal', icon: PlusCircle },
      { href: '/staff/queue', label: 'My Queue', icon: Clock },
      { href: '/staff/all-cases', label: 'All Cases', icon: List },
    ],
  },
  {
    label: 'Credit Memo',
    items: [
      { href: '/staff/memo/create', label: 'Create Memo', icon: FilePenLine },
      { href: '/staff/memo/review', label: 'Memo Review', icon: FileText },
    ],
  },
  {
    label: 'Reports',
    items: [
      { href: '/reports', label: 'Analytics', icon: BarChart3 },
    ],
  },
];

const adminSections: NavSection[] = [
  {
    label: 'Administration',
    items: [
      { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/policy', label: 'Policy', icon: Shield },
      { href: '/admin/eligible-scripts', label: 'Eligible Scripts', icon: FileCheck },
      { href: '/admin/users', label: 'User Mgmt', icon: Users },
      { href: '/admin/approval-chain', label: 'Approval Chain', icon: GitBranch },
    ],
  },
  {
    label: 'Monitoring',
    items: [
      { href: '/staff/all-cases', label: 'All Cases', icon: List },
      { href: '/reports', label: 'Analytics', icon: BarChart3 },
    ],
  },
];

const superadminSections: NavSection[] = [
  {
    label: 'System',
    items: [
      { href: '/superadmin/dashboard', label: 'Super Dashboard', icon: LayoutDashboard },
      { href: '/superadmin/users', label: 'Super User Mgmt', icon: Users },
      { href: '/superadmin/system-settings', label: 'System Settings', icon: MonitorDot },
    ],
  },
  {
    label: 'Administration',
    items: [
      { href: '/admin/policy', label: 'Policy', icon: Shield },
      { href: '/admin/eligible-scripts', label: 'Eligible Scripts', icon: FileCheck },
      { href: '/admin/approval-chain', label: 'Approval Chain', icon: GitBranch },
    ],
  },
  {
    label: 'Reports',
    items: [
      { href: '/reports', label: 'Analytics', icon: BarChart3 },
    ],
  },
];

export const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();
  const sections = role === 'super_admin' ? superadminSections : role === 'admin' ? adminSections : staffSections;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
      <div className="px-5 py-4 border-b border-slate-200">
        <h1 className="text-lg font-display font-bold text-slate-800">
          CreditAppraise
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Margin Lending System</p>
      </div>
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-accent-50 text-accent-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="px-4 py-3 border-t border-slate-200">
        <p className="text-[10px] text-slate-400 leading-tight">
          NRB Unified Directive 2081
          <br />
          Margin Lending Guidelines
        </p>
      </div>
    </aside>
  );
};
