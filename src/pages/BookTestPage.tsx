import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, CalendarPlus, CheckCircle2, Phone } from 'lucide-react';
import { SEO, websiteJsonLd } from '@/components/SEO';
import { getSiteSettings, createAppointment } from '@/services/data-service';
import type { SiteSettings } from '@/types';

const schema = z.object({
  patient_name: z.string().min(2, 'Please enter your name'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  test_or_package: z.string().min(2, 'Please specify a test or package'),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function BookTestPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => {});
  }, []);

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    try {
      await createAppointment({
        patient_name: data.patient_name,
        phone: data.phone,
        email: data.email || null,
        test_or_package: data.test_or_package,
        preferred_date: data.preferred_date || null,
        preferred_time: data.preferred_time || null,
        message: data.message || null,
        status: 'new',
      });
      setSuccess(true);
      reset();
      toast.success('Booking request submitted! Our team will contact you shortly.');
    } catch {
      toast.error('Unable to submit request. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <>
        <SEO title="Book a Test" canonical="/book-test" noindex />
        <section className="py-20 md:py-32">
          <div className="container-narrow text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-50 text-success-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold text-navy-900">Request Submitted!</h1>
            <p className="mt-4 text-slate-600">
              Thank you. Our team will contact you shortly to confirm your appointment.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button onClick={() => setSuccess(false)} className="btn-primary">
                Book Another Test
              </button>
              {settings?.business_phone && (
                <a href={`tel:${settings.business_phone}`} className="btn-secondary">
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Book a Test"
        description="Book a laboratory test at United MediLab in Perumbavoor, Kerala. Schedule your test online and our team will confirm your appointment."
        canonical="/book-test"
        jsonLd={websiteJsonLd}
      />

      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-page text-center">
          <h1 className="text-balance text-4xl font-bold text-white md:text-5xl">Book a Test</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Schedule a laboratory test or appointment. Our team will contact you to confirm.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-narrow">
          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-base">Name <span className="text-error-500">*</span></label>
                  <input {...register('patient_name')} className="input-base" placeholder="Your name" />
                  {errors.patient_name && <p className="mt-1 text-xs text-error-500">{errors.patient_name.message}</p>}
                </div>
                <div>
                  <label className="label-base">Phone <span className="text-error-500">*</span></label>
                  <input {...register('phone')} className="input-base" placeholder="Your phone number" type="tel" />
                  {errors.phone && <p className="mt-1 text-xs text-error-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="label-base">Email (optional)</label>
                <input {...register('email')} className="input-base" placeholder="Your email" type="email" />
                {errors.email && <p className="mt-1 text-xs text-error-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="label-base">Test or Package <span className="text-error-500">*</span></label>
                <input {...register('test_or_package')} className="input-base" placeholder="e.g., Blood Sugar Test, Master Health Package" />
                {errors.test_or_package && <p className="mt-1 text-xs text-error-500">{errors.test_or_package.message}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-base">Preferred Date</label>
                  <input {...register('preferred_date')} className="input-base" type="date" />
                </div>
                <div>
                  <label className="label-base">Preferred Time</label>
                  <select {...register('preferred_time')} className="input-base">
                    <option value="">Select time</option>
                    <option value="morning">Morning (8 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label-base">Message (optional)</label>
                <textarea {...register('message')} className="input-base min-h-[100px]" placeholder="Any additional information" />
              </div>

              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <CalendarPlus className="h-5 w-5" />}
                {submitting ? 'Submitting...' : 'Submit Booking Request'}
              </button>
              <p className="text-center text-xs text-slate-400">
                Our team will contact you shortly to confirm your appointment.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
