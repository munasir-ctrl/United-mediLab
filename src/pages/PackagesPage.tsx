import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { SEO, websiteJsonLd } from '@/components/SEO';
import { PackageCard } from '@/components/PackageCard';
import { SkeletonCard } from '@/components/Skeleton';
import { EmptyState } from '@/components/States';
import { cn, getCategoryLabel } from '@/lib/utils';
import { getActivePackages } from '@/services/data-service';
import type { Package, PackageCategory } from '@/types';

const categories: { value: string; label: string }[] = [
  { value: 'all', label: 'All Packages' },
  { value: 'basic', label: 'Basic' },
  { value: 'primary', label: 'Primary' },
  { value: 'master', label: 'Master' },
  { value: 'executive', label: 'Executive' },
  { value: 'pcod', label: 'PCOD' },
  { value: 'complete_body', label: 'Complete Body' },
  { value: 'promotional', label: 'Promotional Offers' },
];

const genders = [
  { value: 'all', label: 'All Genders' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [gender, setGender] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    getActivePackages()
      .then((data) => { setPackages(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    let result = [...packages];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.short_description?.toLowerCase().includes(q)
      );
    }
    if (category !== 'all') result = result.filter((p) => p.category === category);
    if (gender !== 'all') result = result.filter((p) => p.gender === gender || p.gender === 'any');
    if (sortBy === 'price-low') result.sort((a, b) => (a.offer_price ?? 0) - (b.offer_price ?? 0));
    else if (sortBy === 'price-high') result.sort((a, b) => (b.offer_price ?? 0) - (a.offer_price ?? 0));
    else if (sortBy === 'tests') result.sort((a, b) => (b.package_tests?.length ?? 0) - (a.package_tests?.length ?? 0));
    return result;
  }, [packages, search, category, gender, sortBy]);

  return (
    <>
      <SEO
        title="Health Packages"
        description="Explore health check packages at United MediLab in Perumbavoor, Kerala. Basic, primary, master, executive and promotional health check offers."
        canonical="/packages"
        jsonLd={websiteJsonLd}
      />

      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-page text-center">
          <h1 className="text-balance text-4xl font-bold text-white md:text-5xl">
            Health Packages Designed Around You
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Choose from our range of comprehensive health check packages, from basic screening to executive full-body check-ups.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-page">
          {/* Filters */}
          <div className="mb-8 space-y-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-slate-200/60">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search packages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-base pl-12"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-base w-auto cursor-pointer text-sm">
                {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="input-base w-auto cursor-pointer text-sm">
                {genders.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-base w-auto cursor-pointer text-sm">
                <option value="default">Sort: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="tests">Most Tests</option>
              </select>
              {(search || category !== 'all' || gender !== 'all') && (
                <button
                  onClick={() => { setSearch(''); setCategory('all'); setGender('all'); }}
                  className="btn-ghost text-sm"
                >
                  <Filter className="h-4 w-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard count={6} />
            </div>
          ) : error ? (
            <EmptyState title="Unable to load packages" description="Please try again later." />
          ) : filtered.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-slate-500">{filtered.length} package{filtered.length !== 1 ? 's' : ''} found</p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} featured={pkg.is_featured} />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              title="No packages found"
              description="Try adjusting your filters or search terms."
            />
          )}
        </div>
      </section>
    </>
  );
}
