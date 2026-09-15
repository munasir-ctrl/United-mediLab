import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Logo({ className, variant = 'default' }: { className?: string; variant?: 'default' | 'light' }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5 focus:outline-none py-1', className)}>
      <img
        src="/logo.png"
        alt="United MediLab"
        className={cn(
          'h-20 w-auto max-w-[240px] object-contain transition-opacity', // Increased height to h-20 and max-width to 240px
          variant === 'light' ? 'brightness-0 invert' : ''
        )}
      />
    </Link>
  );
}