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
  X,
} from 'lucide-react';

interface SidebarProps {
  role: 'staff' | 'admin' | 'super_admin' | 'super_staff';
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavSection {
  label: string;
  items: { href: string; label: string; icon: any }[];
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

export const Sidebar = ({ role, isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const sections = role === 'super_admin' ? superadminSections : role === 'admin' ? adminSections : staffSections;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-[2px] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside 
        className={clsx(
          "fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 z-50 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-accent-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-display font-bold text-slate-800 leading-tight">
                CreditAppraise
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">Margin Lending</p>
            </div>
          </div>
          {/* Close button on mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
          {sections.map((section) => (
            <div key={section.label} className="mb-6 last:mb-0">
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400/80">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => onClose?.()}
                      className={clsx(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group',
                        isActive
                          ? 'bg-accent-50 text-accent-700 shadow-sm border border-accent-100/50'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                      )}
                    >
                      <Icon className={clsx(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive ? "text-accent-600" : "text-slate-400 group-hover:text-slate-600"
                      )} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
            NRB Unified Directive 2081
            <br />
            Core Banking Integration Active
          </p>
        </div>
      </aside>
    </>
  );
};
