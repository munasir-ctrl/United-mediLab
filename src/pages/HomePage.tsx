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
  ArrowRight,
  Flame,
  TestTube2
} from 'lucide-react';

export function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Verified package prices from official clinic promotional assets
  const promotionalPackages = [
    { id: 1, name: 'Complete Body Check-Up', price: '₹999', originalPrice: '₹4,999', tests: 75, discount: '80% OFF', tag: 'Most Popular' },
    { id: 2, name: 'Advanced Health Screening (Test 9)', price: '₹2,999', originalPrice: '₹5,999', tests: 45, discount: '50% OFF', tag: 'Best Value' },
    { id: 3, name: 'Comprehensive Panel (Test 8)', price: '₹2,499', originalPrice: '₹4,999', tests: 35, discount: '50% OFF', tag: 'Essential' },
  ];

  const diagnosticServices = [
    { title: 'Pathology & Blood Tests', desc: 'Precise biochemical, hormonal, and hematological testing using fully automated analyzers.', icon: TestTube2 },
    { title: 'Home Sample Collection', desc: 'Certified and hygienic phlebotomists collecting samples safely from your doorstep.', icon: Truck },
    { title: 'Rapid Diagnostic Panels', desc: 'Targeted screening profiles for diabetes, thyroid, cardiac markers, and vitamins.', icon: HeartPulse },
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
    <div className="min-h-screen bg-[#FBFBFA] text-slate-900 overflow-x-hidden font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. ANIMATED TOP FLASH OFFER BANNER */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 px-4 py-3 text-center text-xs font-medium text-slate-200 sm:text-sm flex items-center justify-center gap-2 shadow-inner border-b border-amber-500/20 relative overflow-hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-0.5 rounded-md text-amber-400 font-semibold border border-amber-500/30"
        >
          <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> SPECIAL OFFER
        </motion.div>
        <span>Complete Body Check-Up for only <strong className="underline decoration-amber-500 underline-offset-4 text-amber-400 font-bold">₹999</strong> + Free Home Collection!</span>
      </motion.div>

      {/* 2. HERO SECTION WITH DYNAMIC ANIMATIONS */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28 border-b border-slate-200/60">
        {/* Subtle Classic Background Grid & Elements */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ repeat: Infinity, duration: 2.5, repeatType: "reverse" }}
                className="inline-flex items-center gap-2 rounded-md bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-900 sm:text-sm border border-amber-200/80 shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-amber-600" /> United Mediclinic Diagnostics
              </motion.div>
              
              <h1 className="mt-6 text-4xl font-serif font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
                Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-600">Lab Testing</span> & Diagnostics at Your Doorstep
              </h1>
              
              <p className="mt-6 text-lg text-slate-600 font-normal leading-relaxed">
                Accurate pathology results, specialized biomarker panels, and free hygienic sample collection backed by advanced laboratory infrastructure.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/packages" 
                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-4 font-medium text-white shadow-xl shadow-slate-900/10 transition-all hover:bg-slate-800 border border-slate-800"
                  >
                    Explore Lab Packages <ChevronRight className="h-4 w-4 text-amber-400" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/reports" 
                    className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-400"
                  >
                    <FileText className="h-4 w-4 text-amber-600" /> Download Reports
                  </Link>
                </motion.div>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200/80 pt-6">
                <div>
                  <p className="text-3xl font-serif font-bold text-slate-900">100<span className="text-amber-600">%</span></p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5 uppercase tracking-wider">Quality Assured</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-slate-900">24<span className="text-amber-600">H</span></p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5 uppercase tracking-wider">Fast Digital Reports</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-slate-900">Free</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5 uppercase tracking-wider">Home Phlebotomy</p>
                </div>
              </div>
            </motion.div>

            {/* Animated Hero Card / Visual Element */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:h-[480px] flex items-center justify-center"
            >
              <div className="relative h-full w-full rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-10 border border-slate-800 flex flex-col justify-center items-center text-center shadow-2xl overflow-hidden">
                
                {/* Subtle internal aura */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Glowing Pulsing Icon */}
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="rounded-2xl bg-white/5 p-6 mb-6 text-amber-400 border border-white/10 shadow-inner"
                >
                  <HeartPulse className="h-16 w-16 animate-pulse" />
                </motion.div>

                <h3 className="text-2xl font-serif font-bold text-white tracking-wide">Advanced Pathology Lab</h3>
                <p className="text-sm text-slate-400 max-w-sm mt-3 leading-relaxed">Equipped with state-of-the-art diagnostic machinery for zero-error clinical testing.</p>

                {/* Floating Animated Discount Badge */}
                <motion.div 
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="absolute -top-3 -right-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-slate-950 font-bold text-xs shadow-xl flex items-center gap-1.5 border border-amber-400/40"
                >
                  <Flame className="h-4 w-4 fill-slate-950" /> Full Body Checkup @ ₹999
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TRUST INDICATORS */}
      <section className="bg-slate-900 py-10 text-white border-y border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm tracking-wide text-white">Certified Lab</h4>
                <p className="text-xs text-slate-400 mt-0.5">Accredited diagnostics</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-400">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm tracking-wide text-white">Home Collection</h4>
                <p className="text-xs text-slate-400 mt-0.5">Hygienic and safe</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-400">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm tracking-wide text-white">Quick Turnaround</h4>
                <p className="text-xs text-slate-400 mt-0.5">Results in 12-24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-400">
                <PhoneCall className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm tracking-wide text-white">Support 24/7</h4>
                <p className="text-xs text-slate-400 mt-0.5">Always available to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REPORT PORTAL QUICK ACCESS BANNER */}
      <section className="bg-amber-50/50 py-12 border-b border-amber-100/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 text-amber-800 shadow-sm">
              <FileText className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Looking for your lab test results?</h3>
              <p className="text-sm text-slate-600 mt-1">Access and download your digital diagnostic reports securely anytime.</p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="/reports"
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-slate-800"
            >
              Access Report Portal <ArrowRight className="h-4 w-4 text-amber-400" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5. ANIMATED FEATURED HEALTH PACKAGES GRID */}
      <section className="py-24 bg-gradient-to-b from-[#FBFBFA] to-slate-100/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block rounded-md bg-amber-100/80 px-3.5 py-1 text-xs font-semibold text-amber-900 uppercase tracking-widest border border-amber-200"
            >
              Special Discounts
            </motion.span>
            <h2 className="mt-4 text-3xl font-serif font-bold text-slate-900 sm:text-4xl">Featured Diagnostic Packages</h2>
            <p className="mt-3 text-slate-600">Book high-precision health screening profiles with official promotional pricing.</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {promotionalPackages.map((pkg, idx) => (
              <motion.div 
                key={pkg.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-950/[0.03] flex flex-col justify-between overflow-hidden group"
              >
                {/* Subtle top accent border on hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800 border border-slate-200">
                      {pkg.tag}
                    </span>
                    <motion.span 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                      className="rounded-md bg-amber-500 px-2.5 py-1 text-xs font-bold text-slate-950 shadow-sm"
                    >
                      {pkg.discount}
                    </motion.span>
                  </div>

                  <h3 className="mt-6 text-xl font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{pkg.name}</h3>
                  <p className="mt-2 text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    <TestTube2 className="h-4 w-4 text-amber-600" /> Includes comprehensive parameters
                  </p>
                </div>
                
                <div className="mt-10 pt-6 border-t border-slate-100">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-serif font-bold text-slate-900">{pkg.price}</span>
                    <span className="text-sm text-slate-400 line-through font-medium">{pkg.originalPrice}</span>
                  </div>

                  <Link 
                    to="/packages"
                    className="mt-6 block w-full rounded-xl bg-slate-900 py-3.5 text-center text-sm font-medium text-white transition-all hover:bg-slate-800 shadow-md group-hover:shadow-lg"
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
      <section className="bg-white py-24 border-t border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Comprehensive Laboratory Services</h2>
            <p className="mt-3 text-slate-600">Advanced diagnostic testing solutions tailored for precision and speed.</p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {diagnosticServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-slate-200/80 bg-[#FBFBFA] p-7 shadow-sm transition-all hover:shadow-md hover:border-slate-300 group"
                >
                  <div className="inline-block rounded-xl bg-white p-3.5 text-amber-700 shadow-sm border border-slate-200/60 group-hover:border-amber-500/30 transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-serif font-bold text-slate-900">{srv.title}</h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{srv.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-slate-900">How Home Sample Collection Works</h2>
            <p className="mt-3 text-slate-600">Simple, sterile, and hassle-free testing steps right from your home.</p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((st, i) => (
              <div key={i} className="relative rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
                <span className="text-3xl font-serif font-bold text-amber-600/50">{st.step}</span>
                <h3 className="mt-3 text-lg font-serif font-bold text-slate-900">{st.title}</h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 bg-white border-t border-slate-200/60">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Frequently Asked Questions</h2>
            <p className="mt-3 text-slate-600">Got questions? We have answers regarding bookings and lab reports.</p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200/80 bg-[#FBFBFA] overflow-hidden transition-all">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 font-semibold text-slate-900 text-left hover:bg-slate-100/50 transition-colors"
                >
                  <span className="font-serif text-base">{faq.question}</span>
                  <span className="text-amber-700 font-bold text-xl ml-4">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-4 bg-white">
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