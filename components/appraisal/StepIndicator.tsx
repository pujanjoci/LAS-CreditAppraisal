import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const StepIndicator = ({ steps, currentStep, onStepClick }: StepIndicatorProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        return (
          <div key={step} className="flex items-center">
            <button
              onClick={() => onStepClick?.(index)}
              className={clsx(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap',
                isCompleted && 'bg-emerald-50 text-emerald-700',
                isCurrent && 'bg-accent-50 text-accent-700 ring-2 ring-accent-200',
                !isCompleted && !isCurrent && 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              )}
            >
              <span
                className={clsx(
                  'flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold shrink-0',
                  isCompleted && 'bg-emerald-600 text-white',
                  isCurrent && 'bg-accent-600 text-white',
                  !isCompleted && !isCurrent && 'bg-slate-200 text-slate-500'
                )}
              >
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              {step}
            </button>
            {index < steps.length - 1 && (
              <div
                className={clsx(
                  'h-px w-6 mx-1',
                  index < currentStep ? 'bg-emerald-300' : 'bg-slate-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
