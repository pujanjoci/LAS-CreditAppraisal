'use client';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { LogOut, Bell, User } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const Topbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const roleBadgeVariant = user?.role === 'super_admin' ? 'warning' : user?.role === 'super_staff' ? 'success' : user?.role === 'admin' ? 'danger' : 'info';

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-medium text-slate-600">
          Welcome back, <span className="text-slate-800 font-semibold">{user?.name}</span>
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant={roleBadgeVariant}>
          {user?.role?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Badge>
        <span className="text-xs text-slate-500">{user?.branch}</span>
        <button
          className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>
        <button
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="Profile"
        >
          <User className="h-4 w-4" />
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>
    </header>
  );
};
