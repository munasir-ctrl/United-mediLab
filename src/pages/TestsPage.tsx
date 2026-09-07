import { useState, useEffect, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { SEO, websiteJsonLd } from '@/components/SEO';
import { SkeletonCard } from '@/components/Skeleton';
import { EmptyState } from '@/components/States';
import { getActiveTests } from '@/services/data-service';
import type { Test } from '@/types';

export function TestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    getActiveTests()
      .then((data) => { setTests(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const categories = useMemo(() => {
    const set = new Set(tests.map((t) => t.category).filter(Boolean));
    return ['all', ...Array.from(set)] as string[];
  }, [tests]);

  const filtered = useMemo(() => {
    let result = tests;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q)
      );
    }
    if (category !== 'all') result = result.filter((t) => t.category === category);
    return result;
  }, [tests, search, category]);

  return (
    <>
      <SEO
        title="Tests & Diagnostics"
        description="Browse diagnostic tests available at United MediLab in Perumbavoor, Kerala. Search by category and find the tests you need."
        canonical="/tests"
        jsonLd={websiteJsonLd}
      />

      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-page text-center">
          <h1 className="text-balance text-4xl font-bold text-white md:text-5xl">
            Tests &amp; Diagnostics
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Search and browse our catalog of diagnostic tests. Contact us for preparation instructions and turnaround times.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-page">
          <div className="mb-8 space-y-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-slate-200/60">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search tests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-base pl-12"
              />
            </div>
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      category === c
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {c === 'all' ? 'All Categories' : c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard count={6} />
            </div>
          ) : error ? (
            <EmptyState title="Unable to load tests" description="Please try again later." />
          ) : filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t) => (
                <div key={t.id} className="card group hover:shadow-card transition-shadow">
                  {t.is_featured && (
                    <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                      Featured
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-navy-900">{t.name}</h3>
                  {t.category && (
                    <span className="mt-1 inline-block text-xs font-medium text-primary-600">{t.category}</span>
                  )}
                  {t.description && (
                    <p className="mt-2 text-sm text-slate-500">{t.description}</p>
                  )}
                  <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-sm">
                    {t.sample_type && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="text-xs font-semibold text-slate-400">Sample:</span>
                        {t.sample_type}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="text-xs font-semibold text-slate-400">Preparation:</span>
                      {t.preparation || 'Please contact United MediLab for preparation instructions.'}
                    </div>
                    {t.turnaround_time && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="text-xs font-semibold text-slate-400">Turnaround:</span>
                        {t.turnaround_time}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No tests found"
              description="Try adjusting your search or filters."
            />
          )}
        </div>
      </section>
    </>
  );
}
