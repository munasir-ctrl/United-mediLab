import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, HeartPulse, Microscope, Users, Award, Zap,
  FlaskConical, Stethoscope, Target, Eye, ArrowRight, CalendarPlus,
} from 'lucide-react';
import { SEO, organizationJsonLd } from '@/components/SEO';
import { getSiteSettings } from '@/services/data-service';
import { useEffect, useState } from 'react';
import type { SiteSettings } from '@/types';

const values = [
  { icon: ShieldCheck, title: 'Trust', desc: 'Reliable processes and transparent communication at every step.' },
  { icon: Target, title: 'Accuracy', desc: 'Committed to precise and dependable diagnostic results.' },
  { icon: HeartPulse, title: 'Compassion', desc: 'Patient-centered care with empathy and respect.' },
  { icon: Zap, title: 'Speed', desc: 'Fast turnaround with secure digital report access.' },
];

const features = [
  { icon: Users, title: 'Experienced Medical Team', desc: 'Skilled laboratory professionals dedicated to quality testing.' },
  { icon: Award, title: 'Accurate Laboratory Results', desc: 'Dependable testing processes you can trust.' },
  { icon: FlaskConical, title: 'Modern Diagnostic Equipment', desc: 'Contemporary technology for thorough analysis.' },
  { icon: Stethoscope, title: 'Patient-Centered Care', desc: 'A compassionate approach focused on your well-being.' },
];

export function AboutPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      <SEO
        title="About Us"
        description="Learn about United MediLab, a diagnostic laboratory in Perumbavoor, Kerala providing reliable testing services with secure digital report access."
        canonical="/about"
        jsonLd={organizationJsonLd}
      />

      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 text-white relative overflow-hidden border-b border-amber-500/20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block rounded-md bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-400 uppercase tracking-widest border border-amber-500/20 mb-4">
            Established Excellence
          </span>
          <h1 className="text-balance text-4xl font-serif font-bold md:text-5xl lg:text-6xl tracking-tight">
            About United MediLab
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-slate-300 text-base md:text-lg leading-relaxed font-normal">
            A modern diagnostic laboratory in Perumbavoor, Kerala, committed to providing accurate, accessible and patient-focused diagnostic care.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900 sm:text-4xl">Our Story</h2>
              <div className="mt-6 space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  United MediLab is a medical diagnostic laboratory located in Perumbavoor, Kerala. We provide a comprehensive range of laboratory testing and diagnostic services to support the health and well-being of our community.
                </p>
                <p>
                  Our facility is equipped with modern diagnostic technology, and our team of experienced laboratory professionals is dedicated to delivering accurate and reliable results. We believe that diagnostic testing should be accessible, affordable and convenient.
                </p>
                <p>
                  With our secure online patient report portal, you can access your laboratory reports from anywhere, at any time, using your Patient ID and date of birth. This is part of our commitment to making healthcare more convenient for you.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/book-test" className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 font-medium text-white shadow-md transition-all hover:bg-slate-800">
                  <CalendarPlus className="h-5 w-5 text-amber-400" />
                  Book a Test
                </Link>
                <Link to="/packages" className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-400">
                  View Packages
                  <ArrowRight className="h-4 w-4 text-amber-600" />
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-72 w-72 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 shadow-2xl md:h-96 md:w-96 border border-slate-800 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-amber-500/5 blur-2xl pointer-events-none" />
                <Microscope className="h-32 w-32 text-amber-400/90 md:h-40 md:w-40 relative z-10" strokeWidth={1.2} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#FBFBFA] py-20 md:py-28 border-y border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">Our Mission</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                To provide accurate, accessible and affordable diagnostic services to our community, with a commitment to quality, privacy and patient convenience.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">Our Vision</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                To be a trusted diagnostic partner for individuals and healthcare providers in Perumbavoor and the wider Ernakulam district, leveraging modern technology for better health outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Our Core Values</h2>
            <p className="mt-3 text-slate-600">The foundational principles that guide everything we do.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200/80 bg-[#FBFBFA] p-8 text-center shadow-sm hover:border-slate-300 transition-all"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-amber-400 shadow-md">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900">{v.title}</h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#FBFBFA] py-20 md:py-28 border-t border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold text-slate-900">What Sets Us Apart</h2>
            <p className="mt-3 text-slate-600">Discover why patients and doctors prefer our laboratory services.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm hover:border-slate-300 transition-all"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 border border-amber-500/20">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Banner */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-900 p-10 text-center shadow-2xl md:p-16 border border-slate-800 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-balance text-3xl font-serif font-bold text-white md:text-4xl">
              Located in Perumbavoor, Kerala
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300 text-sm md:text-base leading-relaxed">
              {settings?.business_address || 'Pattal, Perumbavoor - Kuruppampady Road, Near Indian Oil Petrol Pump, Perumbavoor, Kerala 683542'}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/contact" className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-md hover:bg-amber-400 transition-all">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/book-test" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 transition-all hover:bg-white/15 sm:w-auto">
                <CalendarPlus className="h-5 w-5 text-amber-400" />
                Book a Test
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}