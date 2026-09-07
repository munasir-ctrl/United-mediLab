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
    <>
      <SEO
        title="About Us"
        description="Learn about United MediLab, a diagnostic laboratory in Perumbavoor, Kerala providing reliable testing services with secure digital report access."
        canonical="/about"
        jsonLd={organizationJsonLd}
      />

      <section className="bg-navy-950 py-16 md:py-24">
        <div className="container-page text-center">
          <h1 className="text-balance text-4xl font-bold text-white md:text-5xl">
            About United MediLab
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            A modern diagnostic laboratory in Perumbavoor, Kerala, committed to providing accurate, accessible and patient-focused diagnostic care.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-navy-900">Our Story</h2>
              <div className="mt-4 space-y-4 text-slate-600">
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
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/book-test" className="btn-primary">
                  <CalendarPlus className="h-5 w-5" />
                  Book a Test
                </Link>
                <Link to="/packages" className="btn-secondary">
                  View Packages
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-64 w-64 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-navy-800 shadow-float md:h-80 md:w-80"
              >
                <Microscope className="h-32 w-32 text-white/90 md:h-40 md:w-40" strokeWidth={1.2} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900">Our Mission</h3>
              <p className="mt-2 text-slate-600">
                To provide accurate, accessible and affordable diagnostic services to our community, with a commitment to quality, privacy and patient convenience.
              </p>
            </div>
            <div className="card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900">Our Vision</h3>
              <p className="mt-2 text-slate-600">
                To be a trusted diagnostic partner for individuals and healthcare providers in Perumbavoor and the wider Ernakulam district, leveraging modern technology for better health outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-navy-900">Our Core Values</h2>
            <p className="mt-3 text-slate-500">The principles that guide everything we do.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-navy-700 text-white">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-navy-900">What Sets Us Apart</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-navy-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="rounded-3xl bg-navy-900 p-8 text-center shadow-float md:p-16">
            <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
              Located in Perumbavoor, Kerala
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              {settings?.business_address || 'Pattal, Perumbavoor - Kuruppampady Road, Near Indian Oil Petrol Pump, Perumbavoor, Kerala 683542'}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/book-test" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 transition-all hover:bg-white/15 sm:w-auto">
                <CalendarPlus className="h-5 w-5" />
                Book a Test
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
