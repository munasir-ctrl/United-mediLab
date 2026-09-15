import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Logo({ className, variant = 'default' }: { className?: string; variant?: 'default' | 'light' }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5 focus:outline-none', className)}>
      <img
        src="/logo.png"
        alt="United MediLab"
        className={cn(
          'h-14 w-auto max-w-[160px] object-contain transition-opacity', // Increased height to h-14 and set max-width
          variant === 'light' ? 'brightness-0 invert' : ''
        )}
      />
    </Link>
  );
}