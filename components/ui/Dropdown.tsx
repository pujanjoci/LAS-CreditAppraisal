'use client';
import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown = ({ trigger, children, align = 'right', className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={clsx('relative inline-block text-left', className)} ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={clsx(
            'absolute z-50 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-slate-200 focus:outline-none py-1.5 animate-in fade-in zoom-in-95 duration-100',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

interface DropdownItemProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'danger';
  icon?: React.ElementType;
}

export const DropdownItem = ({ onClick, children, variant = 'default', icon: Icon }: DropdownItemProps) => (
  <button
    onClick={() => {
      onClick?.();
    }}
    className={clsx(
      'flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors',
      variant === 'danger' 
        ? 'text-red-600 hover:bg-red-50' 
        : 'text-slate-700 hover:bg-slate-50'
    )}
  >
    {Icon && <Icon className="h-4 w-4 shrink-0 opacity-70" />}
    {children}
  </button>
);

export const DropdownDivider = () => <div className="my-1 border-t border-slate-100" />;
