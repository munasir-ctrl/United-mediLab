import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 py-20 lg:py-32 text-white">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md ring-1 ring-white/20 mb-6 shadow-lg shadow-black/20"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-200">Perumbavoor, Kerala</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-white text-balance"
          >
            Accurate Diagnostics. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-primary-400 bg-clip-text text-transparent">
              Trusted Care.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Reliable laboratory testing and advanced diagnostic services in Perumbavoor, Kerala — equipped with secure digital report access.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/patient-reports"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary-600/30 hover:shadow-primary-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <FileText className="h-5 w-5" />
              Get Your Report
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/tests"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
            >
              <Calendar className="h-5 w-5 text-cyan-400" />
              Book a Test
            </Link>
          </motion.div>

        </div>

        {/* Feature Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {[
            { title: "Accurate Testing", desc: "State-of-the-art lab tech" },
            { title: "Digital Reports", desc: "Instant CrelioHealth portal" },
            { title: "Expert Pathologists", desc: "Qualified medical team" },
            { title: "Home Collection", desc: "Safe sample pickup" },
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-white/[0.03] p-5 backdrop-blur-sm border border-white/10 hover:border-primary-500/50 transition-colors group">
              <CheckCircle2 className="h-6 w-6 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-white text-sm sm:text-base">{item.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}