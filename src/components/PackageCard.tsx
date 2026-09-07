import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star } from 'lucide-react';
import type { Package } from '@/types';
import { formatCurrency, getCategoryColor, getCategoryLabel, getGenderLabel, cn } from '@/lib/utils';

interface PackageCardProps {
  pkg: Package;
  featured?: boolean;
}

export function PackageCard({ pkg, featured = false }: PackageCardProps) {
  const testCount = pkg.package_tests?.length ?? 0;
  const savings = pkg.original_price && pkg.offer_price ? pkg.original_price - pkg.offer_price : null;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 transition-shadow',
        featured ? 'ring-primary-200 shadow-card' : 'ring-slate-200/60 shadow-soft hover:shadow-card'
      )}
    >
      {pkg.is_featured && (
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-2 pt-6">
          <div>
            <span className={cn('badge ring-1 ring-inset', getCategoryColor(pkg.category))}>
              {getCategoryLabel(pkg.category)}
            </span>
          </div>
          {pkg.gender && pkg.gender !== 'any' && (
            <span className="badge bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-200">
              {getGenderLabel(pkg.gender)}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold leading-snug text-navy-900">{pkg.name}</h3>
        {pkg.short_description && (
          <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{pkg.short_description}</p>
        )}

        <div className="mt-4 flex items-end gap-2">
          {pkg.offer_price != null && (
            <span className="text-2xl font-extrabold text-primary-700">
              {formatCurrency(pkg.offer_price)}
            </span>
          )}
          {pkg.original_price != null && (
            <span className="text-sm font-medium text-slate-400 line-through">
              {formatCurrency(pkg.original_price)}
            </span>
          )}
        </div>

        {savings != null && savings > 0 && (
          <div className="mt-1.5">
            <span className="inline-flex items-center rounded-md bg-success-50 px-2 py-0.5 text-xs font-semibold text-success-700">
              SAVE {formatCurrency(savings)}
            </span>
          </div>
        )}

        <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-600">
          <Check className="h-4 w-4 text-teal-600" />
          <span>{testCount} Test{testCount !== 1 ? 's' : ''} Included</span>
        </div>

        <div className="mt-5 flex gap-2 pt-1">
          <Link
            to={`/packages/${pkg.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to={`/packages/${pkg.slug}?book=true`}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Book Package
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
