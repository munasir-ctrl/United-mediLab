import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Logo({ className, variant = 'default' }: { className?: string; variant?: 'default' | 'light' }) {
  return (
    <Link to="/" className={cn('flex items-center gap-3 focus:outline-none py-1', className)}>
      <img
        src="/logo.png"
        alt="United MediLab"
        style={{ height: '52px', width: 'auto' }}
        className={cn(
          'object-contain transition-opacity',
          variant === 'light' ? 'brightness-0 invert' : ''
        )}
      />
    </Link>
  );
}