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
  PhoneCall 
} from 'lucide-react';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const promotionalPackages = [
    { id: 1, name: 'Comprehensive Full Body Checkup', price: 'AED 299', originalPrice: 'AED 699', tests: 75, discount: '57% OFF' },
    { id: 2, name: 'Advanced Cardiac Health Panel', price: 'AED 399', originalPrice: 'AED 850', tests: 45, discount: '53% OFF' },
    { id: 3, name: 'Vitamin & Vital Screening', price: 'AED 199', originalPrice: 'AED 450', tests: 25, discount: '55% OFF' },
  ];

  const faqs = [
    { question: 'How do I book a home sample collection?', answer: 'You can easily book online through our portal or contact our customer support via phone or WhatsApp to schedule a preferred time slot.' },
    { question: 'When will I receive my diagnostic test reports?', answer: 'Most routine blood test reports are available within 12 to 24 hours. Specialized tests may take up to 48 hours.' },
    { question: 'Are your laboratories certified?', answer: 'Yes, our partner labs and diagnostic facilities adhere to the highest international quality standards and regulatory compliance.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* 1. TOP PROMOTIONAL BANNER */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        <span className="font-bold underline">Limited Time Offer:</span> Get up to 60% OFF on Full Body Health Checkups & Free Home Sample Collection!
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-cyan-400/30"
              style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 sm:text-sm">
                <Sparkles className="h-4 w-4" /> Trusted Healthcare & Diagnostics
              </div>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Advanced Care & <span className="text-cyan-600">Diagnostics</span> at Your Doorstep
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Experience precision diagnostics, expert medical consultations, and seamless healthcare packages tailored for you and your family.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  to="/packages" 
                  className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-cyan-600/30 transition-all hover:bg-cyan-700"
                >
                  Explore Packages <ChevronRight className="h-4 w-4" />
                </Link>
                <Link 
                  to="/patient-reports" 
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
                >
                  <FileText className="h-4 w-4 text-cyan-600" /> Download Reports
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative lg:h-[450px]"
            >
              <div className="relative h-full w-full rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent p-4 border border-cyan-100 flex flex-col justify-center items-center text-center">
                <HeartPulse className="h-24 w-24 text-cyan-600 animate-pulse mb-4" />
                <h3 className="text-xl font-bold text-slate-800">Your Health is Our Priority</h3>
                <p className="text-sm text-slate-600 max-w-sm mt-2">State-of-the-art laboratory testing backed by professional medical practitioners.</p>
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
                <h4 className="font-semibold text-sm">Certified Labs</h4>
                <p className="text-xs text-slate-400">Accredited testing facilities</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-cyan-400" />
              <div>
                <h4 className="font-semibold text-sm">Home Collection</h4>
                <p className="text-xs text-slate-400">Safe & hygienic phlebotomy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-cyan-400" />
              <div>
                <h4 className="font-semibold text-sm">Quick Reports</h4>
                <p className="text-xs text-slate-400">Digital results within 24 hrs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall className="h-8 w-8 text-cyan-400" />
              <div>
                <h4 className="font-semibold text-sm">Expert Consultation</h4>
                <p className="text-xs text-slate-400">Free doctor review on reports</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROMOTIONAL PACKAGES GRID */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Featured Health Packages</h2>
            <p className="mt-2 text-slate-600">Choose from our most popular preventive health screening bundles.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {promotionalPackages.map((pkg) => (
              <div key={pkg.id} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <span className="absolute top-4 right-4 rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700">
                  {pkg.discount}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                <p className="mt-2 text-xs text-slate-500">Includes {pkg.tests} essential parameters</p>
                
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-cyan-600">{pkg.price}</span>
                  <span className="text-sm text-slate-400 line-through">{pkg.originalPrice}</span>
                </div>

                <Link 
                  to="/packages"
                  className="mt-6 block w-full rounded-xl bg-slate-900 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-cyan-600"
                >
                  Book Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="mt-2 text-slate-600">Got questions? We have answers regarding bookings and reports.</p>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between font-semibold text-slate-900 text-left"
                >
                  <span>{faq.question}</span>
                  <span className="text-cyan-600">{openFaq === idx ? '-' : '+'}</span>
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