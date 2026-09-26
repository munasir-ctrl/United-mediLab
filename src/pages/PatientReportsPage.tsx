import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ExternalLink, FileText } from 'lucide-react';
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
    <div className="min-h-screen bg-[#FBFBFA] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      <SEO
        title="Patient Reports"
        description="Access your laboratory report securely using your Patient ID and date of birth."
        canonical="/reports"
        noindex
      />

      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 text-white relative overflow-hidden border-b border-amber-500/25">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block rounded-md bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-400 uppercase tracking-widest border border-amber-500/20 mb-4">
            Secure Portal
          </span>
          <h1 className="text-balance text-4xl font-serif font-bold md:text-5xl lg:text-6xl tracking-tight">
            Access Your Lab Report
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-slate-300 text-base md:text-lg leading-relaxed font-normal">
            Access your laboratory test results securely through our encrypted diagnostic portal.
          </p>
        </div>
      </section>

      {/* Report Portal Card Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-slate-200/80 bg-white p-8 md:p-10 shadow-sm text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600" />
            
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 border border-amber-500/20">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900">Secure Report Portal</h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Click below to open the secure laboratory report verification and download window.
              </p>
            </div>

            <button
              onClick={handleOpenPortal}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-4 text-sm font-medium text-white shadow-md hover:bg-slate-800 transition-all disabled:opacity-70"
            >
              <ExternalLink className="h-5 w-5 text-amber-400" />
              {loading ? 'Opening Portal...' : 'Open Report Portal'}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Lock className="h-3.5 w-3.5 text-amber-600" />
              Your information is encrypted and securely processed by CrelioHealth.
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}