import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Microscope, TestTube, FlaskConical, Activity, ShieldCheck,
  HeartPulse, Gauge, Pill, ClipboardCheck, Bug,
  CalendarPlus, ArrowRight, FileText,
} from 'lucide-react';
import { SEO, websiteJsonLd } from '@/components/SEO';
import { SkeletonCard } from '@/components/Skeleton';
import { getActiveServices } from '@/services/data-service';
import type { Service } from '@/types';

const iconMap: Record<string, typeof Microscope> = {
  microscope: Microscope,
  droplet: TestTube,
  'flask-conical': FlaskConical,
  bug: Bug,
  shield: ShieldCheck,
  activity: Activity,
  gauge: Gauge,
  'heart-pulse': HeartPulse,
  pill: Pill,
  'clipboard-check': ClipboardCheck,
};

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getActiveServices()
      .then((data) => { setServices(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      <SEO
        title="Diagnostic Services"
        description="Comprehensive laboratory services at United MediLab in Perumbavoor — clinical pathology, hematology, biochemistry, microbiology, immunology, hormone testing and more."
        canonical="/services"
        jsonLd={websiteJsonLd}
      />

      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 text-white relative overflow-hidden border-b border-amber-500/25">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block rounded-md bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-400 uppercase tracking-widest border border-amber-500/20 mb-4">
            Specialized Care
          </span>
          <h1 className="text-balance text-4xl font-serif font-bold md:text-5xl lg:text-6xl tracking-tight">
            Our Diagnostic Services
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-slate-300 text-base md:text-lg leading-relaxed font-normal">
            Comprehensive laboratory services across multiple medical disciplines, delivered with accuracy and care.
          </p>
        </div>
      </section>

      {/* Intro Description Banner */}
      <section className="pt-16 pb-4 bg-[#FBFBFA]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-slate-900 md:text-3xl tracking-tight">
            Precision Diagnostics Built on Trust and Technology
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed font-normal">
            At United MediLab, we combine state-of-the-art laboratory automation with rigorous quality control to deliver diagnostic results you can trust. From routine hematology and biochemistry to specialized microbiology, immunology, and advanced hormone profiling, our wide range of diagnostic services is engineered to empower physicians with precise clinical insights and guide patients confidently on their journey toward optimal health.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 md:py-20 bg-[#FBFBFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard count={6} />
            </div>
          ) : error ? (
            <div className="text-center py-16 px-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm max-w-xl mx-auto">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 border border-amber-500/20">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Looking for your lab results?</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                We are currently updating our services list. You can instantly access and download your completed test results online.
              </p>
              <div className="mt-6">
                <Link
                  to="/reports"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-slate-800 transition-all"
                >
                  <FileText className="h-4 w-4 text-amber-400" />
                  Get Your Report
                </Link>
              </div>
            </div>
          ) : services.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => {
                const Icon = (s.icon && iconMap[s.icon]) || TestTube;
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 border border-amber-500/20 group-hover:bg-slate-900 group-hover:text-amber-400 transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{s.name}</h3>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{s.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 px-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm max-w-xl mx-auto">
              <h3 className="text-xl font-serif font-bold text-slate-900">No services available</h3>
              <p className="mt-2 text-sm text-slate-600">Please check back later or view your reports directly.</p>
              <div className="mt-6">
                <Link
                  to="/reports"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-slate-800 transition-all"
                >
                  <FileText className="h-4 w-4 text-amber-400" />
                  Get Your Report
                </Link>
              </div>
            </div>
          )}

          {/* Call to Action Box */}
          <div className="mt-16 rounded-3xl bg-white border border-slate-200/80 p-10 text-center shadow-lg shadow-slate-950/[0.02] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600" />
            <h2 className="text-2xl font-serif font-bold text-slate-900 md:text-3xl">Need a Specific Test?</h2>
            <p className="mt-3 text-slate-600 max-w-lg mx-auto text-sm md:text-base">Book a test directly or explore our comprehensive health check packages.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/book-test" className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-medium text-white shadow-md hover:bg-slate-800 transition-all">
                <CalendarPlus className="h-5 w-5 text-amber-400" />
                Book a Test
              </Link>
              <Link to="/packages" className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 transition-all">
                View Packages
                <ArrowRight className="h-4 w-4 text-amber-600" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}