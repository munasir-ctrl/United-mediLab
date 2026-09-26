import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { 
  Loader2, 
  CalendarPlus, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  Home, 
  Building2, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SEO, websiteJsonLd } from '@/components/SEO';
import { getSiteSettings, createAppointment } from '@/services/data-service';
import type { SiteSettings } from '@/types';

const schema = z.object({
  patient_name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  test_or_package: z.string().min(2, 'Please specify a test or package'),
  collection_type: z.enum(['home', 'lab']).default('home'),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function BookTestPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      collection_type: 'home',
    },
  });

  const selectedCollectionType = watch('collection_type');

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
        test_or_package: `${data.test_or_package} (${data.collection_type === 'home' ? 'Home Collection' : 'Lab Visit'})`,
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

  const phoneNumber = settings?.business_phone || '+919876543210';
  const cleanPhone = phoneNumber.replace(/\D/g, '');

  if (success) {
    return (
      <>
        <SEO title="Book a Test" canonical="/book-test" noindex />
        <section className="py-20 md:py-32 bg-slate-50">
          <div className="container-narrow text-center">
            <div className="card max-w-xl mx-auto p-8 md:p-12 shadow-xl ring-1 ring-slate-200/80 bg-white">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" /> Request Successfully Registered
              </span>
              <h1 className="mt-4 text-3xl font-bold text-navy-900 tracking-tight">We Have Received Your Request!</h1>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Thank you for choosing United MediLab. Our diagnostic coordinator will contact you shortly to confirm your slot details and guidelines.
              </p>
              
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button onClick={() => setSuccess(false)} className="btn-primary w-full sm:w-auto">
                  Book Another Test
                </button>
                {settings?.business_phone && (
                  <a href={`tel:${settings.business_phone}`} className="btn-secondary w-full sm:w-auto">
                    <Phone className="h-4 w-4" />
                    Call Us Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Book a Diagnostic Test or Health Package"
        description="Book a laboratory test or master health checkup at United MediLab in Perumbavoor, Kerala. Choose home sample collection or direct lab appointment."
        canonical="/book-test"
        jsonLd={websiteJsonLd}
      />

      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 py-16 md:py-24 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="container-page relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-400 ring-1 ring-inset ring-primary-400/20 mb-6">
            <ShieldCheck className="h-4 w-4" /> Trusted Diagnostics & Zero-Pain Collection
          </div>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Schedule Your <span className="text-primary-400">Diagnostic Test</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300 text-base md:text-lg">
            Book online in less than 2 minutes. Select a convenient time slot for either safe home sample collection or priority lab walkthrough.
          </p>
        </div>
      </section>

      {/* Main Content Form Section */}
      <section className="py-14 md:py-20 bg-slate-50/50">
        <div className="container-narrow">
          
          {/* Quick Mode Toggle Bar (WhatsApp vs Form) */}
          <div className="mb-8 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80 md:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Prefer instant booking via chat?</h4>
                  <p className="text-xs text-slate-500">Send your prescription or test list directly to our WhatsApp desk.</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${cleanPhone}?text=Hello%20United%20MediLab,%20I%20would%20like%20to%20book%20a%20diagnostic%20test.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                Quick WhatsApp Booking
              </a>
            </div>
          </div>

          {/* Form Card */}
          <div className="card shadow-xl ring-1 ring-slate-200/80 bg-white p-6 sm:p-10">
            <div className="border-b border-slate-100 pb-6 mb-8">
              <h2 className="text-2xl font-bold text-navy-900">Appointment Request Form</h2>
              <p className="text-sm text-slate-500 mt-1">Please fill in your details and preferred testing preferences below.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
              
              {/* Collection Type Selector Toggles */}
              <div>
                <label className="label-base mb-2 block font-semibold text-navy-900">Select Service Mode</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setValue('collection_type', 'home')}
                    className={`flex items-center justify-center gap-3 rounded-xl border p-4 text-left transition-all ${
                      selectedCollectionType === 'home'
                        ? 'border-primary-600 bg-primary-50/50 text-navy-900 ring-2 ring-primary-600/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${selectedCollectionType === 'home' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Home className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Home Collection</div>
                      <div className="text-xs text-slate-500">We collect safely from your home</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValue('collection_type', 'lab')}
                    className={`flex items-center justify-center gap-3 rounded-xl border p-4 text-left transition-all ${
                      selectedCollectionType === 'lab'
                        ? 'border-primary-600 bg-primary-50/50 text-navy-900 ring-2 ring-primary-600/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${selectedCollectionType === 'lab' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Lab Visit</div>
                      <div className="text-xs text-slate-500">Walk-in directly to our lab</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Patient Details Grid */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-base">Full Name <span className="text-error-500">*</span></label>
                  <input {...register('patient_name')} className="input-base" placeholder="Enter your full name" />
                  {errors.patient_name && <p className="mt-1 text-xs text-error-500">{errors.patient_name.message}</p>}
                </div>
                <div>
                  <label className="label-base">Phone Number <span className="text-error-500">*</span></label>
                  <input {...register('phone')} className="input-base" placeholder="10-digit mobile number" type="tel" />
                  {errors.phone && <p className="mt-1 text-xs text-error-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="label-base">Email Address (Optional)</label>
                <input {...register('email')} className="input-base" placeholder="name@example.com" type="email" />
                {errors.email && <p className="mt-1 text-xs text-error-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="label-base">Test Name or Health Package <span className="text-error-500">*</span></label>
                <input {...register('test_or_package')} className="input-base" placeholder="e.g., Complete Blood Count, Master Health Checkup, Thyroid Profile" />
                {errors.test_or_package && <p className="mt-1 text-xs text-error-500">{errors.test_or_package.message}</p>}
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-base flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400" /> Preferred Date
                  </label>
                  <input {...register('preferred_date')} className="input-base" type="date" />
                </div>
                <div>
                  <label className="label-base">Preferred Time Window</label>
                  <select {...register('preferred_time')} className="input-base">
                    <option value="">Select time slot</option>
                    <option value="morning">Morning (7:00 AM - 11:00 AM - Recommended for fasting)</option>
                    <option value="afternoon">Afternoon (11:00 AM - 3:00 PM)</option>
                    <option value="evening">Evening (3:00 PM - 7:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label-base">Additional Instructions or Symptoms (Optional)</label>
                <textarea {...register('message')} className="input-base min-h-[110px]" placeholder="Mention any specific instructions, doctor recommendations, or notes..." />
              </div>

              <div className="pt-2">
                <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 text-base shadow-lg shadow-primary-600/20">
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <CalendarPlus className="h-5 w-5" />}
                  {submitting ? 'Submitting Request...' : 'Confirm & Submit Booking Request'}
                </button>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-center gap-3 text-xs text-slate-500">
                <HelpCircle className="h-5 w-5 text-primary-600 shrink-0" />
                <span>Need urgent lab assistance or support? Feel free to call us directly at <a href={`tel:${settings?.business_phone}`} className="font-bold text-navy-900 underline">{settings?.business_phone || '+91 98765 43210'}</a></span>
              </div>

            </form>
          </div>
        </div>
      </section>
    </>
  );
}