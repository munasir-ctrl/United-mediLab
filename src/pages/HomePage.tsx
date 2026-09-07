import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Lock, FileSearch, CalendarPlus, ArrowRight, Phone,
  TestTube, Microscope, HeartPulse, Activity, FlaskConical, Gauge,
  Clock, Users, Award, Zap, Stethoscope, MapPin, ChevronDown, Star,
} from 'lucide-react';
import { SEO, organizationJsonLd, websiteJsonLd } from '@/components/SEO';
import { PackageCard } from '@/components/PackageCard';
import { SkeletonCard } from '@/components/Skeleton';
import { EmptyState } from '@/components/States';
import { cn, formatCurrency, getCategoryColor, getCategoryLabel } from '@/lib/utils';
import {
  getFeaturedPackages, getPromotionalPackages, getActiveServices,
  getActiveFaqs, getSiteSettings,
} from '@/services/data-service';
import type { Package, Service, FAQ, SiteSettings } from '@/types';

const trustIndicators = [
  { icon: TestTube, label: 'Accurate Laboratory Testing' },
  { icon: ShieldCheck, label: 'Secure Digital Reports' },
  { icon: HeartPulse, label: 'Patient-Centered Service' },
  { icon: Microscope, label: 'Modern Diagnostic Technology' },
];

const whyChooseUs = [
  { icon: Users, title: 'Experienced Medical Team', desc: 'Our skilled laboratory professionals bring expertise and dedication to every test.' },
  { icon: Award, title: 'Accurate Laboratory Results', desc: 'Reliable testing processes designed to deliver dependable results you can trust.' },
  { icon: Zap, title: 'Fast Reporting', desc: 'Quick turnaround times with secure digital access to your reports.' },
  { icon: HeartPulse, title: 'Affordable Healthcare Packages', desc: 'Comprehensive health check packages at accessible price points.' },
  { icon: FlaskConical, title: 'Modern Diagnostic Equipment', desc: 'Contemporary diagnostic technology for thorough and precise testing.' },
  { icon: Stethoscope, title: 'Patient-Centered Care', desc: 'A compassionate approach focused on your comfort and convenience.' },
];

const howItWorks = [
  { number: '01', title: 'Choose Your Test', desc: 'Browse our tests and health packages to find what suits your needs.' },
  { number: '02', title: 'Visit or Book Collection', desc: 'Visit our lab or book a home sample collection at your convenience.' },
  { number: '03', title: 'Sample Processing', desc: 'Our team processes your samples using modern diagnostic equipment.' },
  { number: '04', title: 'Receive Your Report', desc: 'Access your report securely online using your Patient ID and date of birth.' },
];

export function HomePage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [featured, setFeatured] = useState<Package[]>([]);
  const [promotional, setPromotional] = useState<Package[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    Promise.all([
      getSiteSettings(),
      getFeaturedPackages(),
      getPromotionalPackages(),
      getActiveServices(),
      getActiveFaqs(),
    ]).then(([s, f, p, sv, faq]) => {
      setSettings(s);
      setFeatured(f);
      setPromotional(p);
      setServices(sv);
      setFaqs(faq);
      setLoading(false);
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <SEO
        title={settings?.seo_title || undefined}
        description={settings?.seo_description || undefined}
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-cyan-400/30"
              style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        {/* Scan line effect */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          initial={{ top: '10%' }}
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container-page relative py-20 md:py-28 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-cyan-300 ring-1 ring-inset ring-white/15 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse-soft" />
              Perumbavoor, Kerala
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-balance text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl"
            >
              Accurate Diagnostics.
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Trusted Care.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-slate-300"
            >
              Reliable laboratory testing and diagnostic services in Perumbavoor, Kerala — with secure digital access to your reports.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link to="/patient-reports" className="btn-primary w-full sm:w-auto">
                <FileSearch className="h-5 w-5" />
                Get Your Report
              </Link>
              <Link to="/book-test" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur-sm transition-all hover:bg-white/15 sm:w-auto">
                <CalendarPlus className="h-5 w-5" />
                Book a Test
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="border-b border-slate-100 bg-white">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-4 py-8 lg:grid-cols-4 lg:py-10">
            {trustIndicators.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Portal */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-primary-900 to-navy-950 shadow-float">
            <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
              <div className="flex flex-col justify-center">
                <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-cyan-300 ring-1 ring-inset ring-white/15">
                  <Lock className="h-3.5 w-3.5" />
                  Secure Access
                </div>
                <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
                  Your Report. One Secure Place.
                </h2>
                <p className="mt-4 text-slate-300">
                  {settings?.report_portal_message || 'Access your laboratory report securely using your Patient ID and date of birth.'}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-teal-400" />
                  Your information is protected through secure access controls.
                </div>
                <Link to="/patient-reports" className="btn-primary mt-8 w-full sm:w-auto">
                  <FileSearch className="h-5 w-5" />
                  View My Report
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative flex h-48 w-48 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 md:h-56 md:w-56"
                >
                  <div className="absolute inset-4 rounded-full bg-white/5 ring-1 ring-white/10" />
                  <div className="absolute inset-8 rounded-full bg-white/5 ring-1 ring-white/10" />
                  <ShieldCheck className="h-20 w-20 text-cyan-300 md:h-24 md:w-24" strokeWidth={1.5} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-page">
          <SectionHeader
            title="Popular Health Packages"
            subtitle="Comprehensive health check packages designed for your well-being"
          />
          {loading ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard count={3} />
            </div>
          ) : error ? (
            <EmptyState title="Unable to load packages" description="Please try again later." />
          ) : featured.length > 0 ? (
            <>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.slice(0, 6).map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} featured />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link to="/packages" className="btn-secondary">
                  View All Packages
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <EmptyState title="No packages available" description="Check back soon for health check packages." />
          )}
        </div>
      </section>

      {/* Promotional Offers */}
      {!loading && promotional.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-page">
            <SectionHeader
              title="Special Health Check Offers"
              subtitle="Affordable test packages for your health monitoring needs"
            />
            <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">
              {promotional.map((pkg) => (
                <div key={pkg.id} className="min-w-[280px] snap-center sm:min-w-[320px] md:min-w-0">
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-page">
          <SectionHeader
            title="Our Diagnostic Services"
            subtitle="Comprehensive laboratory services across multiple medical disciplines"
          />
          {loading ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : services.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="card group hover:shadow-card transition-shadow"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    <ServiceIcon name={s.icon} />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900">{s.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">{s.description}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState title="No services available" />
          )}
          <div className="mt-10 text-center">
            <Link to="/services" className="btn-secondary">
              Explore All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <SectionHeader
            title="Why Choose United MediLab"
            subtitle="We are committed to providing reliable, accessible and patient-focused diagnostic care"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card group"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-navy-700 text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Collection */}
      {settings?.home_collection_available && (
        <section className="py-16 md:py-24">
          <div className="container-page">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-700 p-8 text-white shadow-float md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <h2 className="text-balance text-3xl font-bold md:text-4xl">
                    Laboratory Testing From the Comfort of Your Home
                  </h2>
                  <p className="mt-4 text-teal-50">
                    {settings.home_collection_message}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {settings.home_collection_phone && (
                      <a href={`tel:${settings.home_collection_phone}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50">
                        <Phone className="h-4 w-4" />
                        Book Home Collection
                      </a>
                    )}
                    <Link to="/book-test" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/20">
                      <CalendarPlus className="h-4 w-4" />
                      Book a Test
                    </Link>
                  </div>
                </div>
                <div className="hidden items-center justify-center md:flex">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex h-40 w-40 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/20"
                  >
                    <TestTube className="h-20 w-20 text-white" strokeWidth={1.5} />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-page">
          <SectionHeader
            title="How It Works"
            subtitle="Simple steps from booking to receiving your report"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {i < howItWorks.length - 1 && (
                  <div className="absolute left-[2.5rem] right-0 top-8 hidden h-px bg-gradient-to-r from-primary-200 to-transparent md:block" />
                )}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-xl font-extrabold text-white shadow-glow">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services"
          />
          <div className="mt-10 space-y-3">
            {faqs.length > 0 ? faqs.slice(0, 6).map((faq, i) => (
              <div key={faq.id} className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200/60">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-navy-900">{faq.question}</span>
                  <ChevronDown className={cn('h-5 w-5 shrink-0 text-slate-400 transition-transform', openFaq === i && 'rotate-180')} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-slate-600">{faq.answer}</div>
                )}
              </div>
            )) : (
              !loading && <EmptyState title="No FAQs available" />
            )}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <SectionHeader
                title="Visit United MediLab"
                subtitle="Located in Perumbavoor, Kerala"
              />
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                  <div>
                    <p className="text-sm font-semibold text-navy-900">Address</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {settings?.business_address || 'Pattal, Perumbavoor - Kuruppampady Road, Near Indian Oil Petrol Pump, Perumbavoor, Kerala 683542'}
                    </p>
                  </div>
                </div>
                {settings?.business_phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                    <div>
                      <p className="text-sm font-semibold text-navy-900">Phone</p>
                      <a href={`tel:${settings.business_phone}`} className="mt-1 block text-sm text-slate-500 hover:text-primary-700">
                        {settings.business_phone}
                      </a>
                    </div>
                  </div>
                )}
                {settings?.opening_hours && (
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                    <div>
                      <p className="text-sm font-semibold text-navy-900">Hours</p>
                      <p className="mt-1 text-sm text-slate-500">{settings.opening_hours}</p>
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-3 pt-4">
                  {settings?.google_maps_url ? (
                    <a href={settings.google_maps_url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                      <MapPin className="h-4 w-4" />
                      Get Directions
                    </a>
                  ) : null}
                  {settings?.business_phone && (
                    <a href={`tel:${settings.business_phone}`} className="btn-secondary text-sm">
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                  )}
                  <Link to="/book-test" className="btn-primary text-sm">
                    <CalendarPlus className="h-4 w-4" />
                    Book Test
                  </Link>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200/60">
              <div className="flex h-full min-h-[300px] items-center justify-center bg-gradient-to-br from-primary-50 to-cyan-50 p-8">
                <div className="text-center">
                  <MapPin className="mx-auto h-16 w-16 text-primary-300" strokeWidth={1.5} />
                  <p className="mt-4 text-lg font-bold text-navy-900">United MediLab</p>
                  <p className="mt-1 text-sm text-slate-500">Perumbavoor, Kerala 683542</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="rounded-3xl bg-navy-900 p-8 text-center shadow-float md:p-16">
            <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
              Ready to Book Your Test?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              Schedule a laboratory test or explore our health check packages. Our team is here to help.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/book-test" className="btn-primary w-full sm:w-auto">
                <CalendarPlus className="h-5 w-5" />
                Book a Test
              </Link>
              <Link to="/packages" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 transition-all hover:bg-white/15 sm:w-auto">
                View Packages
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-balance text-3xl font-bold text-navy-900 md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-500">{subtitle}</p>}
    </div>
  );
}

function ServiceIcon({ name }: { name?: string | null }) {
  const icons: Record<string, typeof Microscope> = {
    microscope: Microscope,
    droplet: TestTube,
    'flask-conical': FlaskConical,
    bug: Activity,
    shield: ShieldCheck,
    activity: Activity,
    gauge: Gauge,
    'heart-pulse': HeartPulse,
    pill: FlaskConical,
    'clipboard-check': Award,
  };
  const Icon = (name && icons[name]) || TestTube;
  return <Icon className="h-5 w-5" />;
}
