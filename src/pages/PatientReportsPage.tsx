import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';
import { SEO } from '@/components/SEO';

export function PatientReportsPage() {
  const [loading, setLoading] = useState(false);

  function handleOpenPortal() {
    setLoading(true);
    // Opens Crelio's secure hosted patient report lookup portal in a new tab
    window.open('https://patient-in.creliohealth.com/iframe/login', '_blank');
    setTimeout(() => setLoading(false), 1000);
  }

  return (
    <>
      <SEO
        title="Patient Reports"
        description="Access your laboratory report securely using your Patient ID and date of birth."
        canonical="/patient-reports"
        noindex
      />

      <section className="bg-navy-950 py-12 md:py-16">
        <div className="container-page text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <Lock className="h-7 w-7 text-cyan-300" />
          </div>
          <h1 className="text-balance text-3xl font-bold text-white md:text-4xl">Access Your Lab Report</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Access your laboratory test results securely through our diagnostic portal.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-narrow">
          <div className="mx-auto max-w-md">
            <div className="card text-center">
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-bold text-navy-900">Secure Report Portal</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Click below to open the secure laboratory report verification window.
                </p>
              </div>

              <button
                onClick={handleOpenPortal}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                {loading ? 'Opening Portal...' : 'Open Report Portal'}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Lock className="h-3.5 w-3.5" />
                Your information is encrypted and securely processed by CrelioHealth.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}