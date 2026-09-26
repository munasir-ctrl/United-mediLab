import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Star, ArrowRight, ShieldCheck, Clock, Award, Activity, PhoneCall } from 'lucide-react';

export function HomePage() {
  const primaryNumber = "9539900049";
  const whatsappMessage = encodeURIComponent("Hello United Medilabs, I would like to book a lab test or home sample collection.");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      {/* ==========================================
          1. HERO SECTION (100% LABORATORY TAILORED)
          ================================---------- */}
      <section className="relative overflow-hidden bg-white pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-slate-100">
        
        {/* Subtle Background Glows matching the Blue & Teal Logo */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-teal-50/50 via-blue-50/20 to-transparent pointer-events-none rounded-bl-[120px]" />

        <div className="container-page relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Lab-Specific Typography & Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Logo / Brand Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-[#0077b6] border border-slate-200">
                <span>UNITED MEDILABS &amp; DIAGNOSTICS</span>
              </div>

              {/* Main Title with Serif Typography */}
              <h1 className="text-4xl sm:text-6xl font-serif font-normal tracking-wide leading-[1.15] text-slate-900">
                ADVANCED LAB TESTING <br />
                <span className="font-serif italic font-light text-[#00a884]">
                  &amp; Diagnostics
                </span>
              </h1>

              {/* Subtitle Message */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-light leading-relaxed">
                Precision pathology testing, specialized biomarker panels, and certified sample analysis designed for accurate diagnosis and absolute peace of mind.
              </p>

              {/* Pricing Highlight */}
              <div className="pt-2">
                <p className="text-sm font-medium text-slate-700">
                  Complete Health Check-Up starts from <span className="text-2xl font-bold text-[#0077b6]">₹999</span>
                </p>
              </div>

              {/* Google Reviews Badge */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Google Reviews</span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400" />
                </div>
                <span className="text-xs font-bold text-slate-800">5.0</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link 
                  to="/packages" 
                  className="inline-flex items-center gap-2 rounded-full bg-[#0077b6] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#0077b6]/20 hover:bg-[#005f93] transition-all transform hover:-translate-y-0.5"
                >
                  Book Lab Test
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a 
                  href={`https://wa.me/91${primaryNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-6 py-4 text-sm font-semibold text-slate-800 border border-slate-200 hover:bg-slate-200 transition-all"
                >
                  <MessageCircle className="h-4 w-4 text-[#00a884]" />
                  WhatsApp Us
                </a>

                <a 
                  href={`tel:+91${primaryNumber}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-slate-700 border border-slate-200 hover:text-slate-900 transition-all shadow-sm"
                >
                  <PhoneCall className="h-4 w-4 text-[#0077b6]" />
                  Call Lab
                </a>
              </div>

            </motion.div>

            {/* Right Column: Circular Lab Equipment Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center lg:justify-end"
            >
              <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[430px] lg:h-[430px] rounded-full overflow-hidden shadow-2xl bg-slate-100 border-4 border-[#00a884]/30">
                <img 
                  src="https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=900&q=80" 
                  alt="Laboratory Testing and Pathology Equipment" 
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          2. QUALITY & LAB ASSURANCE METRICS BAR 
          ================================---------- */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <Award className="h-8 w-8 text-[#0077b6] mx-auto mb-3" />
              <h3 className="font-bold text-lg text-slate-900 mb-2">100% Quality Assured</h3>
              <p className="text-sm text-slate-600">Advanced diagnostic machinery engineered for zero-error clinical testing.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <Clock className="h-8 w-8 text-[#00a884] mx-auto mb-3" />
              <h3 className="font-bold text-lg text-slate-900 mb-2">24H Fast Reports</h3>
              <p className="text-sm text-slate-600">Receive accurate pathology results directly on your digital devices quickly.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <ShieldCheck className="h-8 w-8 text-[#0077b6] mx-auto mb-3" />
              <h3 className="font-bold text-lg text-slate-900 mb-2">Free Home Phlebotomy</h3>
              <p className="text-sm text-slate-600">Hygienic, professional sample collection right at the comfort of your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. FEATURED LAB & HEALTH PACKAGES 
          ================================---------- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#00a884] text-xs font-bold tracking-widest uppercase mb-2 block">Comprehensive Diagnostics</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Featured Health Packages</h2>
            <p className="text-slate-600 text-sm sm:text-base">Designed to screen vital organ health, early risk indicators, and overall wellness.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Package Card 1 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0077b6]/10 px-3 py-1 text-xs font-semibold text-[#0077b6] border border-[#0077b6]/20">
                    <Activity className="h-3.5 w-3.5" /> Most Popular
                  </span>
                  <span className="text-xs text-slate-500">Full Body</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Complete Body Check-Up</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Extensive blood and organ profiling covering lipid levels, liver function, renal metrics, and vitamin profiles.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Special Price</p>
                  <p className="text-2xl font-extrabold text-[#0077b6]">₹999</p>
                </div>
                <Link to="/packages" className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077b6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#005f93] transition-all">
                  Book Package <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Package Card 2 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00a884]/10 px-3 py-1 text-xs font-semibold text-[#00a884] border border-[#00a884]/20">
                    <Activity className="h-3.5 w-3.5" /> Vital Screening
                  </span>
                  <span className="text-xs text-slate-500">Advanced</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Advanced Cardiac &amp; Diabetes</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Targeted analysis focusing on heart health indicators, HbA1c, lipid breakdown, and vascular risk assessment.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Special Price</p>
                  <p className="text-2xl font-extrabold text-[#00a884]">₹1,499</p>
                </div>
                <Link to="/packages" className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all">
                  Book Package <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Package Card 3 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0077b6]/10 px-3 py-1 text-xs font-semibold text-[#0077b6] border border-[#0077b6]/20">
                    <Activity className="h-3.5 w-3.5" /> Essential
                  </span>
                  <span className="text-xs text-slate-500">Routine</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Master Health Screening</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Thorough preventative care panel including complete blood count, thyroid function tests, and urinalysis.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Special Price</p>
                  <p className="text-2xl font-extrabold text-[#0077b6]">₹799</p>
                </div>
                <Link to="/packages" className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all">
                  Book Package <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}