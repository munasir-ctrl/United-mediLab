import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Microscope, TestTube, FlaskConical, Activity, ShieldCheck,
  HeartPulse, Gauge, Pill, ClipboardCheck, Bug,
  CalendarPlus, ArrowRight,
} from 'lucide-react';
import { SEO, websiteJsonLd } from '@/components/SEO';
import { SkeletonCard } from '@/components/Skeleton';
import { EmptyState } from '@/components/States';
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
    <>
      <SEO
        title="Diagnostic Services"
        description="Comprehensive laboratory services at United MediLab in Perumbavoor — clinical pathology, hematology, biochemistry, microbiology, immunology, hormone testing and more."
        canonical="/services"
        jsonLd={websiteJsonLd}
      />

      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-page text-center">
          <h1 className="text-balance text-4xl font-bold text-white md:text-5xl">
            Our Diagnostic Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Comprehensive laboratory services across multiple medical disciplines, delivered with accuracy and care.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard count={6} />
            </div>
          ) : error ? (
            <EmptyState title="Unable to load services" description="Please try again later." />
          ) : services.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => {
                const Icon = (s.icon && iconMap[s.icon]) || TestTube;
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="card group hover:shadow-card transition-shadow"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-navy-700 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900">{s.name}</h3>
                    <p className="mt-2 text-sm text-slate-500">{s.description}</p>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <EmptyState title="No services available" />
          )}

          <div className="mt-12 rounded-2xl bg-primary-50 p-8 text-center ring-1 ring-primary-100">
            <h2 className="text-2xl font-bold text-navy-900">Need a Specific Test?</h2>
            <p className="mt-2 text-slate-600">Book a test or explore our health check packages.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
        </div>
      </section>
    </>
  );
}
