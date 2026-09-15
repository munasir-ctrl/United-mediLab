import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  FileText, 
  Sparkles, 
  ChevronRight, 
  HeartPulse, 
  Truck, 
  PhoneCall, 
  Activity, 
  ArrowRight,
  Percent,
  Flame,
  CheckCircle2,
  TestTube2
} from 'lucide-react';

export function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const promotionalPackages = [
    { id: 1, name: 'Comprehensive Full Body Checkup', price: 'AED 299', originalPrice: 'AED 699', tests: 75, discount: '57% OFF', tag: 'Most Popular' },
    { id: 2, name: 'Advanced Cardiac Health Panel', price: 'AED 399', originalPrice: 'AED 850', tests: 45, discount: '53% OFF', tag: 'Best Value' },
    { id: 3, name: 'Vitamin & Vital Screening', price: 'AED 199', originalPrice: 'AED 450', tests: 25, discount: '55% OFF', tag: 'Essential' },
  ];

  const diagnosticServices = [
    { title: 'Pathology & Blood Tests', desc: 'Precise biochemical, hormonal, and hematological testing using fully automated analyzers.', icon: Activity },
    { title: 'Home Sample Collection', desc: 'Certified and hygienic phlebotomists collecting samples safely from your doorstep.', icon: Truck },
    { title: 'Rapid Diagnostic Panels', desc: 'Targeted screening profiles for diabetes, thyroid, cardiac markers, and vitamins.', icon: TestTube2 },
    { title: 'Secure Digital Reports', desc: 'Encrypted, easy-to-read PDF reports delivered directly to your portal within 24 hours.', icon: FileText },
  ];

  const steps = [
    { step: '01', title: 'Select Test Package', desc: 'Choose from our extensive list of specialized diagnostic lab profiles.' },
    { step: '02', title: 'Book Home Visit', desc: 'Schedule a free home sample collection at your preferred time slot.' },
    { step: '03', title: 'Sample Processing', desc: 'Your sample is tested under strict quality controls in our certified lab.' },
    { step: '04', title: 'Get Digital Results', desc: 'Access and download your verified reports instantly online.' },
  ];

  const faqs = [
    { question: 'How do I book a home sample collection?', answer: 'You can easily book online through our portal or contact our customer support via phone or WhatsApp to schedule a preferred time slot.' },
    { question: 'When will I receive my diagnostic test reports?', answer: 'Most routine blood test reports are available within 12 to 24 hours. Specialized tests may take up to 48 hours.' },
    { question: 'Are your laboratories certified?', answer: 'Yes, our partner labs and diagnostic facilities adhere to the highest international quality standards and regulatory compliance.' },
    { question: 'Do I need to fast before a blood test?', answer: 'Certain tests like lipid profiles or fasting blood glucose require 8-12 hours of fasting. Specific instructions are provided upon booking.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden">
      
      {/* 1. ANIMATED TOP FLASH OFFER BANNER */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 px-4 py-3 text-center text-xs font-semibold text-white sm:text-sm flex items-center justify-center gap-2 shadow-md relative overflow-hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-amber-300 font-bold"
        >
          <Flame className="h-4 w-4 fill-amber-300" /> FLASH SALE
        </motion.div>
        <span>Get up to <strong className="underline text-amber-300 font-extrabold">60% OFF</strong> on Advanced Lab Test Packages + Free Home Collection!</span>
      </motion.div>

      {/* 2. HERO SECTION WITH DYNAMIC ANIMATIONS */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        {/* Animated Background Particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-cyan-400/40"
              style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 4) * 20}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.3, 1] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3.5 py-1.5 text-xs font-bold text-cyan-700 sm:text-sm border border-cyan-200"
              >
                <Sparkles className="h-4 w-4 text-cyan-600 animate-spin" /> United Medilab Diagnostics
              </motion.div>
              
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Precision <span className="text-cyan-600">Lab Testing</span> & Diagnostics at Your Doorstep
              </h1>
              
              <p className="mt-4 text-lg text-slate-600">
                Accurate pathology results, specialized biomarker panels, and free hygienic sample collection backed by advanced laboratory infrastructure.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/packages" 
                    className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-cyan-600/30 transition-all hover:bg-cyan-700"
                  >
                    Explore Lab Packages <ChevronRight className="h-4 w-4" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/patient-reports" 
                    className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
                  >
                    <FileText className="h-4 w-4 text-cyan-600" /> Download Reports
                  </Link>
                </motion.div>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                <div>
                  <p className="text-2xl font-extrabold text-cyan-600">100%</p>
                  <p className="text-xs text-slate-500">Quality Assured</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-cyan-600">24 Hrs</p>
                  <p className="text-xs text-slate-500">Fast Digital Reports</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-cyan-600">Free</p>
                  <p className="text-xs text-slate-500">Home Phlebotomy</p>
                </div>
              </div>
            </motion.div>

            {/* Animated Hero Card / Visual Element */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:h-[450px] flex items-center justify-center"
            >
              <div className="relative h-full w-full rounded-3xl bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-indigo-500/5 p-8 border border-cyan-200 flex flex-col justify-center items-center text-center shadow-2xl backdrop-blur-sm">
                
                {/* Glowing Pulsing Icon */}
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="rounded-full bg-cyan-600/20 p-6 mb-6 text-cyan-600"
                >
                  <HeartPulse className="h-20 w-20 animate-pulse" />
                </motion.div>

                <h3 className="text-2xl font-extrabold text-slate-900">Advanced Pathology Lab</h3>
                <p className="text-sm text-slate-600 max-w-sm mt-2">Equipped with state-of-the-art diagnostic machinery for zero-error clinical testing.</p>

                {/* Floating Animated Discount Badge */}
                <motion.div 
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-white font-bold text-sm shadow-lg flex items-center gap-1.5"
                >
                  <Percent className="h-4 w-4" /> Save up to 60% Today
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TRUST INDICATORS */}
      <section className="bg-slate-900 py-8 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-cyan-400" />
              <div>
                <h4 className="font-semibold text-sm">Certified Lab</h4>
                <p className="text-xs text-slate-400">Accredited diagnostics</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-cyan-400" />
              <div>
                <h4 className="font-semibold text-sm">Home Collection</h4>
                <p className="text-xs text-slate-400">Hygienic and safe</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-cyan-400" />
              <div>
                <h4 className="font-semibold text-sm">Quick Turnaround</h4>
                <p className="text-xs text-slate-400">Results in 12-24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall className="h-8 w-8 text-cyan-400" />
              <div>
                <h4 className="font-semibold text-sm">Support 24/7</h4>
                <p className="text-xs text-slate-400">Always available to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REPORT PORTAL QUICK ACCESS BANNER */}
      <section className="bg-cyan-50 py-10 border-y border-cyan-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-cyan-600 p-4 text-white shadow-md">
              <FileText className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Looking for your lab test results?</h3>
              <p className="text-sm text-slate-600">Access and download your digital diagnostic reports securely anytime.</p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/patient-reports"
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-cyan-600"
            >
              Access Report Portal <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5. ANIMATED FEATURED HEALTH PACKAGES GRID */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-cyan-50/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block rounded-full bg-cyan-100 px-4 py-1.5 text-xs font-bold text-cyan-800 uppercase tracking-wider"
            >
              Special Discounts
            </motion.span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">Featured Diagnostic Packages</h2>
            <p className="mt-2 text-slate-600 max-w-xl mx-auto">Book high-precision health screening profiles with limited-time promotional pricing.</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {promotionalPackages.map((pkg, idx) => (
              <motion.div 
                key={pkg.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative rounded-3xl border border-cyan-100 bg-white p-7 shadow-xl shadow-cyan-950/5 flex flex-col justify-between overflow-hidden group"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-extrabold text-cyan-800">
                      {pkg.tag}
                    </span>
                    <motion.span 
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="rounded-full bg-amber-500 px-3 py-1 text-xs font-extrabold text-white shadow-sm"
                    >
                      {pkg.discount}
                    </motion.span>
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-slate-900 group-hover:text-cyan-600 transition-colors">{pkg.name}</h3>
                  <p className="mt-2 text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    <TestTube2 className="h-4 w-4 text-cyan-600" /> Includes {pkg.tests} essential health parameters
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-cyan-600">{pkg.price}</span>
                    <span className="text-sm text-slate-400 line-through">{pkg.originalPrice}</span>
                  </div>

                  <Link 
                    to="/packages"
                    className="mt-5 block w-full rounded-xl bg-slate-900 py-3.5 text-center text-sm font-bold text-white transition-all hover:bg-cyan-600 shadow-md group-hover:shadow-cyan-600/30"
                  >
                    Book Lab Package Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DIAGNOSTIC SERVICES */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Comprehensive Laboratory Services</h2>
            <p className="mt-2 text-slate-600">Advanced diagnostic testing solutions tailored for precision and speed.</p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {diagnosticServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="inline-block rounded-xl bg-cyan-100 p-3 text-cyan-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{srv.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{srv.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">How Home Sample Collection Works</h2>
            <p className="mt-2 text-slate-600">Simple, sterile, and hassle-free testing steps right from your home.</p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((st, i) => (
              <div key={i} className="relative rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <span className="text-3xl font-extrabold text-cyan-600/40">{st.step}</span>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{st.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="mt-2 text-slate-600">Got questions? We have answers regarding bookings and lab reports.</p>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between font-semibold text-slate-900 text-left"
                >
                  <span>{faq.question}</span>
                  <span className="text-cyan-600 font-bold text-lg">{openFaq === idx ? '-' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <p className="mt-3 text-sm text-slate-600 border-t border-slate-200 pt-3">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}