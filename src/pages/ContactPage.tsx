import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, MapPin, Phone, Clock, Send } from 'lucide-react';
import { SEO, organizationJsonLd } from '@/components/SEO';
import { getSiteSettings, createContactMessage } from '@/services/data-service';
import type { SiteSettings } from '@/types';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  subject: z.string().optional(),
  message: z.string().min(5, 'Please enter your message'),
});

type FormValues = z.infer<typeof schema>;

export function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => {});
  }, []);

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    try {
      await createContactMessage({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        subject: data.subject || null,
        message: data.message,
        status: 'new',
      });
      toast.success('Message sent! We will get back to you shortly.');
      reset();
    } catch {
      toast.error('Unable to send message. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Contact United MediLab in Perumbavoor, Kerala. Call us, visit our lab, or send us a message. We're here to help with your diagnostic testing needs."
        canonical="/contact"
        jsonLd={organizationJsonLd}
      />

      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-page text-center">
          <h1 className="text-balance text-4xl font-bold text-white md:text-5xl">Get in Touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Have questions? We're here to help. Reach out by phone, visit our lab, or send us a message.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-900">Address</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {settings?.business_address || 'Pattal, Perumbavoor - Kuruppampady Road, Near Indian Oil Petrol Pump, Perumbavoor, Kerala 683542'}
                    </p>
                  </div>
                </div>
              </div>

              {settings?.business_phone && (
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy-900">Phone</h3>
                      <a href={`tel:${settings.business_phone}`} className="mt-1 block text-sm text-slate-500 hover:text-primary-700">
                        {settings.business_phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {settings?.opening_hours && (
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy-900">Hours</h3>
                      <p className="mt-1 text-sm text-slate-500">{settings.opening_hours}</p>
                    </div>
                  </div>
                </div>
              )}

              {settings?.google_maps_url && (
                <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200/60">
                  <iframe
                    src={settings.google_maps_url}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="United MediLab location"
                  />
                </div>
              )}
            </div>

            {/* Contact form */}
            <div className="card">
              <h2 className="text-xl font-bold text-navy-900">Send a Message</h2>
              <p className="mt-1 text-sm text-slate-500">We'll get back to you as soon as possible.</p>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div>
                  <label className="label-base">Name <span className="text-error-500">*</span></label>
                  <input {...register('name')} className="input-base" placeholder="Your name" />
                  {errors.name && <p className="mt-1 text-xs text-error-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="label-base">Phone <span className="text-error-500">*</span></label>
                  <input {...register('phone')} className="input-base" placeholder="Your phone number" type="tel" />
                  {errors.phone && <p className="mt-1 text-xs text-error-500">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="label-base">Email (optional)</label>
                  <input {...register('email')} className="input-base" placeholder="Your email" type="email" />
                  {errors.email && <p className="mt-1 text-xs text-error-500">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="label-base">Subject (optional)</label>
                  <input {...register('subject')} className="input-base" placeholder="Subject" />
                </div>
                <div>
                  <label className="label-base">Message <span className="text-error-500">*</span></label>
                  <textarea {...register('message')} className="input-base min-h-[120px]" placeholder="Your message" />
                  {errors.message && <p className="mt-1 text-xs text-error-500">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full">
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-4 w-4" />}
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
