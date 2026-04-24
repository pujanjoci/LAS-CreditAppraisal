import React from 'react';
import { clsx } from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options = [], placeholder, children, ...props }, ref) => (
    <select
      ref={ref}
      className={clsx(
        'block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700',
        'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent',
        'disabled:bg-slate-100 disabled:text-slate-500',
        className
      )}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children
        ? children
        : options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
    </select>
  )
);
Select.displayName = 'Select';
