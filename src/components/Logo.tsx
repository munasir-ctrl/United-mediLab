import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Logo({ className, variant = 'default' }: { className?: string; variant?: 'default' | 'light' }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5 focus:outline-none', className)}>
      <img
        src="/logo.png"
        alt="United MediLab"
        className={cn(
          'h-10 w-auto object-contain transition-opacity',
          variant === 'light' ? 'brightness-0 invert' : ''
        )}
      />
    </Link>
  );
}