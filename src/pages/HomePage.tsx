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
  Stethoscope, 
  ShoppingBag, 
  MapPin, 
  CheckCircle2, 
  HelpCircle,
  Pill,
  ArrowRight
} from 'lucide-react';

export function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const promotionalPackages = [
    { id: 1, name: 'Comprehensive Full Body Checkup', price: 'AED 299', originalPrice: 'AED 699', tests: 75, discount: '57% OFF' },
    { id: 2, name: 'Advanced Cardiac Health Panel', price: 'AED 399', originalPrice: 'AED 850', tests: 45, discount: '53% OFF' },
    { id: 3, name: 'Vitamin & Vital Screening', price: 'AED 199', originalPrice: 'AED 450', tests: 25, discount: '55% OFF' },
  ];

  const services = [
    { title: 'Laboratory Diagnostics', desc: 'Advanced blood tests, pathology, and molecular diagnostics with high precision.', icon: Activity },
    { title: 'Home Sample Collection', desc: 'Hygienic, professional phlebotomists collecting samples right from your doorstep.', icon: Truck },
    { title: 'Doctor Consultations', desc: 'Expert medical reviews and specialist consultations tailored to your health results.', icon: Stethoscope },
    { title: 'Medimart & Pharmacy', desc: 'Genuine medicines, health supplements, and wellness equipment delivered fast.', icon: Pill },
  ];

  const medimartProducts = [
    { id: 1, name: 'Daily Multivitamins 60s', price: 'AED 75', category: 'Supplements' },
    { id: 2, name: 'Digital Blood Pressure Monitor', price: 'AED 149', category: 'Medical Devices' },
    { id: 3, name: 'N95 Medical Face Masks (Box)', price: 'AED 35', category: 'Protection' },
    { id: 4, name: 'Whey Protein Isolate 1kg', price: 'AED 220', category: 'Fitness & Nutrition' },
  ];

  const steps = [
    { step: '01', title: 'Book Online or Call', desc: 'Select your test package or request a home visit easily.' },
    { step: '02', title: 'Sample Collection', desc: 'Our certified medical professional arrives at your preferred time.' },
    { step: '03', title: 'Lab Analysis', desc: 'Testing is performed using advanced automated machinery.' },
    { step: '04', title: 'Digital Reports', desc: 'Access secure PDF reports online within 12-24 hours.' },
  ];

  const faqs = [
    { question: 'How do I book a home sample collection?', answer: 'You can easily book online through our portal or contact our customer support via phone or WhatsApp to schedule a preferred time slot.' },
    { question: 'When will I receive my diagnostic test reports?', answer: 'Most routine blood test reports are available within 12 to 24 hours. Specialized tests may take up to 48 hours.' },
    { question: 'Are your laboratories certified?', answer: 'Yes, our partner labs and diagnostic facilities adhere to the highest international quality standards and regulatory compliance.' },
    { question: 'How can I order medicines through Medimart?', answer: 'You can upload your prescription directly on our portal or browse our wellness supermarket catalog for fast delivery.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* 1. TOP PROMOTIONAL BLAST BAR */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        <span className="font-bold underline">Limited Time Flash Offer:</span> Get up to 60% OFF on Full Body Health Checkups & Free Home Sample Collection!
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
                <Sparkles className="h-4 w-4" /> United Medilab & Diagnostics
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

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                <div>
                  <p className="text-2xl font-bold text-slate-900">100%</p>
                  <p className="text-xs text-slate-500">Accurate Results</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">24/7</p>
                  <p className="text-xs text-slate-500">Support Available</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">Free</p>
                  <p className="text-xs text-slate-500">Home Sample Pickup</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative lg:h-[450px]"
            >
              <div className="relative h-full w-full rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent p-6 border border-cyan-100 flex flex-col justify-center items-center text-center shadow-inner">
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

      {/* 4. REPORT PORTAL QUICK ACCESS BANNER */}
      <section className="bg-cyan-50 py-12 border-y border-cyan-100">
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
          <Link 
            to="/patient-reports"
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-cyan-600"
          >
            Access Report Portal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 5. FEATURED HEALTH PACKAGES GRID */}
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

      {/* 6. CORE MEDICAL SERVICES */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Comprehensive Medical Services</h2>
            <p className="mt-2 text-slate-600">State-of-the-art diagnostic and wellness solutions tailored for your care.</p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="inline-block rounded-xl bg-cyan-100 p-3 text-cyan-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{srv.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. MEDIMART / MEDICAL SUPERMARKET SECTION */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-cyan-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800">
                <ShoppingBag className="h-3.5 w-3.5" /> Medimart Supermarket
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Health Essentials & Supplements</h2>
              <p className="text-slate-600">Browse everyday medical products, supplements, and wellness equipment.</p>
            </div>
            <Link 
              to="/medimart"
              className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-all hover:bg-cyan-700"
            >
              Visit Medimart Store <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {medimartProducts.map((prod) => (
              <div key={prod.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-cyan-600">{prod.category}</span>
                  <h4 className="mt-1 font-bold text-slate-900">{prod.name}</h4>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-slate-900">{prod.price}</span>
                  <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-cyan-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. HOW IT WORKS */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">How Home Collection Works</h2>
            <p className="mt-2 text-slate-600">Simple, hassle-free testing steps from the comfort of your home.</p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((st, i) => (
              <div key={i} className="relative rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
                <span className="text-3xl font-extrabold text-cyan-600/40">{st.step}</span>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{st.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="mt-2 text-slate-600">Got questions? We have answers regarding bookings, reports, and services.</p>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between font-semibold text-slate-900 text-left"
                >
                  <span>{faq.question}</span>
                  <span className="text-cyan-600 font-bold text-lg">{openFaq === idx ? '-' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <p className="mt-3 text-sm text-slate-600 border-t border-slate-100 pt-3">
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