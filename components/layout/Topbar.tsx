'use client';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { LogOut, Bell, User, Menu } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface TopbarProps {
  onMenuClick?: () => void;
}

export const Topbar = ({ onMenuClick }: TopbarProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const roleBadgeVariant = user?.role === 'super_admin' ? 'warning' : user?.role === 'super_staff' ? 'success' : user?.role === 'admin' ? 'danger' : 'info';

  return (
    <header className="h-16 lg:h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="text-sm font-medium text-slate-600 hidden sm:block">
          Welcome back, <span className="text-slate-800 font-semibold">{user?.name}</span>
        </h2>
        <h2 className="text-sm font-semibold text-slate-800 sm:hidden">
          {user?.name?.split(' ')[0]}
        </h2>
      </div>
      <div className="flex items-center gap-2 lg:gap-4">
        <Badge variant={roleBadgeVariant} className="hidden xs:inline-flex">
          {user?.role?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Badge>
        <span className="text-xs text-slate-500 hidden md:block">{user?.branch}</span>
        <div className="flex items-center gap-1 border-l border-slate-200 ml-1 pl-1 lg:ml-2 lg:pl-2">
          <button
            className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-red-500 rounded-full border border-white" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
