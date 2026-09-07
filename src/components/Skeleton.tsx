import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton h-4 w-full', className)} />;
}

export function SkeletonCard({ className, count = 1 }: { className?: string; count?: number }) {
  if (count > 1) {
    return <>{Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}</>;
  }
  return (
    <div className={cn('card space-y-3', className)}>
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 6 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
