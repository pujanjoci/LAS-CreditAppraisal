import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-accent-50 text-accent-700 border-accent-200',
};

export const Badge = ({ variant = 'default', children, className }: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
      variantStyles[variant],
      className
    )}
  >
    {children}
  </span>
);
