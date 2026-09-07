import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  ChevronRight, Check, Clock, MapPin, CalendarPlus, X, Loader2,
  ShieldCheck, TestTube,
} from 'lucide-react';
import { SEO, breadcrumbJsonLd, packageOfferJsonLd } from '@/components/SEO';
import { SkeletonCard } from '@/components/Skeleton';
import { EmptyState } from '@/components/States';
import { Dialog, ConfirmDialog } from '@/components/Dialog';
import { formatCurrency, getCategoryColor, getCategoryLabel, getGenderLabel, cn } from '@/lib/utils';
import { getPackageBySlug, createPackageBooking, getSiteSettings } from '@/services/data-service';
import type { Package, SiteSettings } from '@/types';

const bookingSchema = z.object({
  patient_name: z.string().min(2, 'Please enter your name'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  message: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

export function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (!slug) return;
    Promise.all([getPackageBySlug(slug), getSiteSettings()])
      .then(([p, s]) => { setPkg(p); setSettings(s); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [slug]);

  useEffect(() => {
    if (searchParams.get('book') === 'true' && pkg) {
      setBookingOpen(true);
    }
  }, [searchParams, pkg]);

  const tests = pkg?.package_tests ?? [];
  const groupedTests = tests.reduce<Record<string, typeof tests>>((acc, t) => {
    const group = t.test_group || 'Tests Included';
    if (!acc[group]) acc[group] = [];
    acc[group].push(t);
    return acc;
  }, {});

  const savings = pkg?.original_price && pkg?.offer_price ? pkg.original_price - pkg.offer_price : null;

  async function onSubmit(data: BookingForm) {
    if (!pkg) return;
    setSubmitting(true);
    try {
      await createPackageBooking({
        package_id: pkg.id,
        package_name: pkg.name,
        patient_name: data.patient_name,
        phone: data.phone,
        email: data.email || null,
        preferred_date: data.preferred_date || null,
        preferred_time: data.preferred_time || null,
        message: data.message || null,
        status: 'new',
      });
      setSuccess(true);
      setBookingOpen(false);
      reset();
      setSearchParams({});
      toast.success('Booking request submitted! Our team will contact you shortly.');
    } catch {
      toast.error('Unable to submit booking. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="container-page py-10">
        <SkeletonCard />
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="container-page py-20">
        <EmptyState
          title="Package not found"
          description="The package you're looking for may have been removed or is no longer available."
          action={<Link to="/packages" className="btn-primary">View All Packages</Link>}
        />
      </div>
    );
  }

  return (
    <>
      <SEO
        title={pkg.name}
        description={pkg.short_description || pkg.description || undefined}
        canonical={`/packages/${pkg.slug}`}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Packages', url: '/packages' },
            { name: pkg.name, url: `/packages/${pkg.slug}` },
          ]),
          packageOfferJsonLd(pkg),
        ]}
      />

      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="container-page flex items-center gap-1.5 py-3 text-sm">
          <Link to="/" className="text-slate-500 hover:text-primary-700">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <Link to="/packages" className="text-slate-500 hover:text-primary-700">Packages</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-medium text-slate-700">{pkg.name}</span>
        </div>
      </div>

      <div className="container-page py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn('badge ring-1 ring-inset', getCategoryColor(pkg.category))}>
                {getCategoryLabel(pkg.category)}
              </span>
              {pkg.gender && pkg.gender !== 'any' && (
                <span className="badge bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-200">
                  {getGenderLabel(pkg.gender)}
                </span>
              )}
              {pkg.is_featured && (
                <span className="badge bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-200">
                  Featured
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-bold text-navy-900 md:text-4xl">{pkg.name}</h1>

            {pkg.description && (
              <p className="mt-4 text-slate-600">{pkg.description}</p>
            )}

            {/* Pricing */}
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary-50 to-cyan-50 p-6 ring-1 ring-primary-100">
              <div className="flex items-end gap-3">
                {pkg.offer_price != null && (
                  <span className="text-4xl font-extrabold text-primary-700">
                    {formatCurrency(pkg.offer_price)}
                  </span>
                )}
                {pkg.original_price != null && (
                  <span className="text-lg font-medium text-slate-400 line-through">
                    {formatCurrency(pkg.original_price)}
                  </span>
                )}
              </div>
              {savings != null && savings > 0 && (
                <p className="mt-2 text-sm font-semibold text-success-600">
                  You save {formatCurrency(savings)}
                </p>
              )}
              <p className="mt-1 text-sm text-slate-500">
                {tests.length} test{tests.length !== 1 ? 's' : ''} included
              </p>
            </div>

            {/* Tests */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-navy-900">Tests Included</h2>
              <div className="mt-4 space-y-4">
                {Object.entries(groupedTests).map(([group, groupTests]) => (
                  <div key={group} className="rounded-xl bg-white p-5 ring-1 ring-slate-200/60">
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary-700">{group}</h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {groupTests.map((t) => (
                        <div key={t.id} className="flex items-center gap-2 text-sm text-slate-700">
                          <Check className="h-4 w-4 shrink-0 text-teal-600" />
                          {t.test_name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation */}
            {pkg.preparation_instructions && (
              <div className="mt-8 rounded-xl bg-amber-50 p-5 ring-1 ring-amber-100">
                <h3 className="flex items-center gap-2 text-sm font-bold text-amber-800">
                  <TestTube className="h-4 w-4" />
                  Preparation Instructions
                </h3>
                <p className="mt-2 text-sm text-amber-700">{pkg.preparation_instructions}</p>
              </div>
            )}

            {/* Turnaround */}
            {pkg.turnaround_time && (
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <Clock className="h-4 w-4 text-primary-600" />
                {pkg.turnaround_time}
              </div>
            )}

            {/* Disclaimer */}
            <p className="mt-8 rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
              Tests and packages should be selected according to individual healthcare needs. Please consult your healthcare professional where appropriate.
            </p>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="card">
                <div className="text-center">
                  <p className="text-sm text-slate-500">Package Price</p>
                  {pkg.offer_price != null && (
                    <p className="mt-1 text-3xl font-extrabold text-primary-700">
                      {formatCurrency(pkg.offer_price)}
                    </p>
                  )}
                  {pkg.original_price != null && (
                    <p className="text-sm text-slate-400 line-through">
                      {formatCurrency(pkg.original_price)}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="btn-primary mt-4 w-full"
                >
                  <CalendarPlus className="h-5 w-5" />
                  Book This Package
                </button>
                {settings?.business_phone && (
                  <a href={`tel:${settings.business_phone}`} className="btn-ghost mt-2 w-full">
                    Call to Book
                  </a>
                )}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                  Secure and confidential
                </div>
              </div>

              <div className="card">
                <h3 className="text-sm font-bold text-navy-900">Location</h3>
                <div className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                  {settings?.business_address || 'Perumbavoor, Kerala 683542'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white p-3 shadow-float lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            {pkg.offer_price != null && (
              <p className="text-lg font-extrabold text-primary-700">{formatCurrency(pkg.offer_price)}</p>
            )}
            <p className="text-xs text-slate-500">{tests.length} tests included</p>
          </div>
          <button onClick={() => setBookingOpen(true)} className="btn-primary flex-1">
            <CalendarPlus className="h-5 w-5" />
            Book Package
          </button>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onClose={() => { setBookingOpen(false); setSearchParams({}); }} title={`Book: ${pkg.name}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label-base">Full Name <span className="text-error-500">*</span></label>
            <input {...register('patient_name')} className="input-base" placeholder="Enter your name" />
            {errors.patient_name && <p className="mt-1 text-xs text-error-500">{errors.patient_name.message}</p>}
          </div>
          <div>
            <label className="label-base">Phone Number <span className="text-error-500">*</span></label>
            <input {...register('phone')} className="input-base" placeholder="Enter your phone number" type="tel" />
            {errors.phone && <p className="mt-1 text-xs text-error-500">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="label-base">Email (optional)</label>
            <input {...register('email')} className="input-base" placeholder="Enter your email" type="email" />
            {errors.email && <p className="mt-1 text-xs text-error-500">{errors.email.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-base">Preferred Date</label>
              <input {...register('preferred_date')} className="input-base" type="date" />
            </div>
            <div>
              <label className="label-base">Preferred Time</label>
              <select {...register('preferred_time')} className="input-base">
                <option value="">Select time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label-base">Message (optional)</label>
            <textarea {...register('message')} className="input-base min-h-[80px]" placeholder="Any additional information" />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <CalendarPlus className="h-5 w-5" />}
            {submitting ? 'Submitting...' : 'Submit Booking Request'}
          </button>
          <p className="text-center text-xs text-slate-400">
            Our team will contact you shortly to confirm your booking.
          </p>
        </form>
      </Dialog>

      {/* Success Dialog */}
      <ConfirmDialog
        open={success}
        onClose={() => setSuccess(false)}
        onConfirm={() => setSuccess(false)}
        title="Booking Request Submitted!"
        message="Thank you. Our team will contact you shortly to confirm your booking."
        confirmLabel="Done"
        danger={false}
      />
    </>
  );
}
