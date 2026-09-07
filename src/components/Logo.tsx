import { Link } from 'react-router-dom';
import { Microscope } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className, variant = 'default' }: { className?: string; variant?: 'default' | 'light' }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5 font-bold', className)}>
      <div className={cn(
        'flex h-9 w-9 items-center justify-center rounded-xl',
        variant === 'light' ? 'bg-white/10 ring-1 ring-white/20' : 'bg-gradient-to-br from-primary-600 to-navy-800'
      )}>
        <Microscope className="h-5 w-5 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col leading-none">
        <span className={cn(
          'text-base font-extrabold tracking-tight',
          variant === 'light' ? 'text-white' : 'text-navy-900'
        )}>
          United MediLab
        </span>
        <span className={cn(
          'text-[10px] font-medium uppercase tracking-wider',
          variant === 'light' ? 'text-white/60' : 'text-slate-500'
        )}>
          Diagnostic Laboratory
        </span>
      </div>
    </Link>
  );
}
