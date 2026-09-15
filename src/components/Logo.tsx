import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Logo({ className, variant = 'default' }: { className?: string; variant?: 'default' | 'light' }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5 focus:outline-none py-3', className)}>
      <img
        src="/logo.png"
        alt="United MediLab"
        className={cn(
          'h-28 w-auto max-w-[320px] object-contain transition-opacity', // Maximum sizing configuration
          variant === 'light' ? 'brightness-0 invert' : ''
        )}
      />
    </Link>
  );
}